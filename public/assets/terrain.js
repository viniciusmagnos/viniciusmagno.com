// Model-space hero: procedural terrain drawn as contour lines (marching squares),
// a road centerline with stations, spot heights, and an AutoCAD-style crosshair
// that reads out UTM coordinates and elevation under the cursor.

const TAU = Math.PI * 2;

// ---------------------------------------------------------------- noise
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(seed) {
  const rand = mulberry32(seed);
  const perm = new Uint8Array(512);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = (h, x, y) => {
    switch (h & 7) {
      case 0: return x + y; case 1: return -x + y;
      case 2: return x - y; case 3: return -x - y;
      case 4: return x; case 5: return -x;
      case 6: return y; default: return -y;
    }
  };
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  function perlin(x, y) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = fade(x), v = fade(y);
    const a = perm[X] + Y, b = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u),
      lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u),
      v
    );
  }
  return function fbm(x, y) {
    let amp = 1, freq = 1, sum = 0, norm = 0;
    for (let o = 0; o < 4; o++) {
      sum += amp * perlin(x * freq, y * freq);
      norm += amp; amp *= 0.5; freq *= 2.03;
    }
    return sum / norm; // ~[-0.7, 0.7]
  };
}

// ---------------------------------------------------------------- setup
export function initTerrain(root) {
  const base = root.querySelector('[data-terrain="base"]');
  const over = root.querySelector('[data-terrain="overlay"]');
  if (!base || !over) return;
  const bctx = base.getContext('2d');
  const octx = over.getContext('2d');
  const readout = {
    e: root.querySelector('[data-readout="e"]'),
    n: root.querySelector('[data-readout="n"]'),
    z: root.querySelector('[data-readout="z"]'),
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const noise = makeNoise(20260125);
  const css = getComputedStyle(root);
  const color = (name, fallback) => (css.getPropertyValue(name).trim() || fallback);
  const C = {
    minor: color('--terrain-minor', '#3b4a59'),
    index: color('--terrain-index', '#36d6e7'),
    label: color('--terrain-label', '#8fa3b5'),
    road: color('--terrain-road', '#ff5a4e'),
    bg: color('--model', '#212830'),
    cross: color('--terrain-cross', 'rgba(232,237,241,.55)'),
    spot: color('--terrain-spot', '#e8edf1'),
  };

  // World mapping: 1 css px = 0.5 m. Origin near Rio Paranaíba (MG), SIRGAS 2000 / UTM 23S.
  const E0 = 368420, N0 = 7877860, M_PER_PX = 0.5;
  const Z_MIN = 1080, Z_MAX = 1160, STEP = 2; // contour interval 2 m, index every 10 m
  const SCALE = 1 / 340; // noise frequency per css px

  let W = 0, H = 0, dpr = 1;
  let levels = []; // [{z, path, index, labels:[{x,y,a}]}]
  let road = null;  // {path, ticks:[{x,y,a,label}]}
  let spots = [];
  let progress = reduced ? 1 : 0;
  let mouse = null;
  let raf = 0;

  const heightAt = (x, y) => {
    // gentle regional slope so the terrain reads as a hillside, not noise
    const n = noise(x * SCALE + 3.1, y * SCALE + 7.7);
    const slope = (x / Math.max(W, 1)) * 0.25 - (y / Math.max(H, 1)) * 0.12;
    const t = Math.min(1, Math.max(0, (n + slope + 0.55) / 1.25));
    return Z_MIN + t * (Z_MAX - Z_MIN);
  };

  function build() {
    const cell = W < 700 ? 10 : 8;
    const cols = Math.ceil(W / cell) + 1;
    const rows = Math.ceil(H / cell) + 1;
    const field = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) field[j * cols + i] = heightAt(i * cell, j * cell);

    levels = [];
    for (let z = Z_MIN + STEP; z < Z_MAX; z += STEP) {
      const path = new Path2D();
      const segs = [];
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i], b = field[j * cols + i + 1];
          const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
          let idx = 0;
          if (a > z) idx |= 8; if (b > z) idx |= 4; if (c > z) idx |= 2; if (d > z) idx |= 1;
          if (idx === 0 || idx === 15) continue;
          const x = i * cell, y = j * cell;
          const top = [x + cell * ((z - a) / (b - a)), y];
          const right = [x + cell, y + cell * ((z - b) / (c - b))];
          const bottom = [x + cell * ((z - d) / (c - d)), y + cell];
          const left = [x, y + cell * ((z - a) / (d - a))];
          const L = (p, q) => { path.moveTo(p[0], p[1]); path.lineTo(q[0], q[1]); segs.push([p, q]); };
          switch (idx) {
            case 1: case 14: L(left, bottom); break;
            case 2: case 13: L(bottom, right); break;
            case 3: case 12: L(left, right); break;
            case 4: case 11: L(top, right); break;
            case 5: L(left, top); L(bottom, right); break;
            case 6: case 9: L(top, bottom); break;
            case 7: case 8: L(left, top); break;
            case 10: L(left, bottom); L(top, right); break;
          }
        }
      }
      const index = Math.round(z) % 10 === 0;
      const labels = [];
      if (index && segs.length > 40) {
        // pick a couple of well-separated, fairly horizontal segments in the right half
        const picks = [0.62, 0.86];
        for (const fx of picks) {
          let best = null, bestScore = Infinity;
          for (const [p, q] of segs) {
            const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
            if (my < 70 || my > H - 90) continue;
            const ang = Math.atan2(q[1] - p[1], q[0] - p[0]);
            const flat = Math.abs(Math.sin(ang));
            const score = Math.abs(mx - W * fx) + flat * 200;
            if (score < bestScore) { bestScore = score; best = { x: mx, y: my, a: ang }; }
          }
          if (best && bestScore < 160) {
            if (best.a > Math.PI / 2) best.a -= Math.PI;
            if (best.a < -Math.PI / 2) best.a += Math.PI;
            labels.push(best);
          }
        }
      }
      levels.push({ z, path, index, labels });
    }

    // Road centerline: Catmull-Rom through control points, stations every 20 m (40 px).
    const ctrl = W < 700
      ? [[-0.05, 0.92], [0.3, 0.8], [0.62, 0.86], [0.85, 0.7], [1.05, 0.58]]
      : [[0.42, 1.04], [0.55, 0.78], [0.66, 0.62], [0.8, 0.52], [0.9, 0.3], [1.05, 0.16]];
    const pts = ctrl.map(([fx, fy]) => [fx * W, fy * H]);
    const curve = [];
    for (let k = 0; k < pts.length - 1; k++) {
      const p0 = pts[Math.max(0, k - 1)], p1 = pts[k], p2 = pts[k + 1], p3 = pts[Math.min(pts.length - 1, k + 2)];
      for (let t = 0; t < 1; t += 0.02) {
        const t2 = t * t, t3 = t2 * t;
        curve.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
        ]);
      }
    }
    curve.push(pts[pts.length - 1]);
    const rpath = new Path2D();
    rpath.moveTo(curve[0][0], curve[0][1]);
    for (const p of curve) rpath.lineTo(p[0], p[1]);
    const ticks = [];
    let acc = 0, next = 0, station = 0;
    for (let k = 1; k < curve.length; k++) {
      const [x0, y0] = curve[k - 1], [x1, y1] = curve[k];
      const len = Math.hypot(x1 - x0, y1 - y0);
      while (acc + len >= next) {
        const t = (next - acc) / len;
        const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
        if (x > 0 && x < W && y > 0 && y < H) {
          const m = station * 20;
          ticks.push({ x, y, a: Math.atan2(y1 - y0, x1 - x0), major: station % 5 === 0,
            label: `${Math.floor(m / 1000)}+${String(m % 1000).padStart(3, '0')}` });
        }
        station++; next += 40;
      }
      acc += len;
    }
    road = { path: rpath, ticks };

    // Spot heights
    const rand = mulberry32(7);
    spots = [];
    for (let k = 0; k < (W < 700 ? 4 : 9); k++) {
      const x = W * ((W < 700 ? 0.55 : 0.62) + rand() * 0.34), y = H * (0.12 + rand() * 0.72);
      spots.push({ x, y, z: heightAt(x, y) });
    }
  }

  const fmt = (v, d) => v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

  function drawBase() {
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bctx.fillStyle = C.bg;
    bctx.fillRect(0, 0, W, H);

    // levels appear in elevation order, like a plotter pass
    const n = levels.length;
    levels.forEach((lv, k) => {
      const start = (k / n) * 0.7;
      const a = Math.min(1, Math.max(0, (progress - start) / 0.3));
      if (a <= 0) return;
      bctx.globalAlpha = a * (lv.index ? 0.85 : 0.75);
      bctx.strokeStyle = lv.index ? C.index : C.minor;
      bctx.lineWidth = lv.index ? 1.25 : 0.8;
      bctx.stroke(lv.path);
      if (lv.index && a > 0.6) {
        bctx.globalAlpha = a;
        bctx.font = '500 10.5px "Overpass Mono", ui-monospace, monospace';
        bctx.textAlign = 'center'; bctx.textBaseline = 'middle';
        for (const l of lv.labels) {
          bctx.save();
          bctx.translate(l.x, l.y); bctx.rotate(l.a);
          const txt = fmt(lv.z, 0);
          const w = bctx.measureText(txt).width + 8;
          bctx.fillStyle = C.bg; bctx.fillRect(-w / 2, -7, w, 14);
          bctx.fillStyle = C.index; bctx.fillText(txt, 0, 1);
          bctx.restore();
        }
      }
    });
    bctx.globalAlpha = 1;

    const late = Math.min(1, Math.max(0, (progress - 0.75) / 0.25));
    if (late > 0 && road) {
      bctx.globalAlpha = late;
      bctx.strokeStyle = C.road; bctx.lineWidth = 1.4;
      bctx.setLineDash([22, 5, 3, 5]);
      bctx.stroke(road.path);
      bctx.setLineDash([]);
      bctx.font = '500 10px "Overpass Mono", ui-monospace, monospace';
      bctx.fillStyle = C.road; bctx.textBaseline = 'middle';
      for (const t of road.ticks) {
        bctx.save();
        bctx.translate(t.x, t.y); bctx.rotate(t.a + Math.PI / 2);
        bctx.beginPath();
        const len = t.major ? 9 : 4.5;
        bctx.moveTo(-len, 0); bctx.lineTo(len, 0);
        bctx.lineWidth = 1; bctx.stroke();
        if (t.major) { bctx.textAlign = 'left'; bctx.fillText(t.label, len + 4, 1); }
        bctx.restore();
      }
      bctx.fillStyle = C.spot; bctx.strokeStyle = C.spot;
      bctx.font = '400 10px "Overpass Mono", ui-monospace, monospace';
      bctx.textAlign = 'left';
      for (const s of spots) {
        bctx.globalAlpha = late * 0.7;
        bctx.beginPath();
        bctx.moveTo(s.x - 3, s.y - 3); bctx.lineTo(s.x + 3, s.y + 3);
        bctx.moveTo(s.x + 3, s.y - 3); bctx.lineTo(s.x - 3, s.y + 3);
        bctx.lineWidth = 1; bctx.stroke();
        bctx.fillText(fmt(s.z, 1), s.x + 6, s.y + 1);
      }
      bctx.globalAlpha = 1;
    }
  }

  function drawOverlay() {
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    octx.clearRect(0, 0, W, H);
    if (!mouse) return;
    const { x, y } = mouse;
    octx.strokeStyle = C.cross; octx.lineWidth = 1;
    octx.beginPath();
    octx.moveTo(0, y + 0.5); octx.lineTo(x - 7, y + 0.5);
    octx.moveTo(x + 7, y + 0.5); octx.lineTo(W, y + 0.5);
    octx.moveTo(x + 0.5, 0); octx.lineTo(x + 0.5, y - 7);
    octx.moveTo(x + 0.5, y + 7); octx.lineTo(x + 0.5, H);
    octx.stroke();
    octx.strokeRect(x - 4.5, y - 4.5, 10, 10);
    const z = heightAt(x, y);
    octx.font = '500 11px "Overpass Mono", ui-monospace, monospace';
    octx.fillStyle = C.index; octx.textAlign = 'left'; octx.textBaseline = 'alphabetic';
    const label = `Z ${fmt(z, 2)} m`;
    const lx = x + 14 + 90 > W ? x - 14 - octx.measureText(label).width : x + 14;
    octx.fillText(label, lx, y - 12);
  }

  function updateReadout(x, y) {
    if (!readout.e) return;
    readout.e.textContent = fmt(E0 + x * M_PER_PX, 2);
    readout.n.textContent = fmt(N0 - y * M_PER_PX, 2);
    readout.z.textContent = fmt(heightAt(x, y), 2);
  }

  function resize() {
    const r = root.getBoundingClientRect();
    W = Math.max(320, Math.round(r.width));
    H = Math.max(420, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const c of [base, over]) {
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      c.style.width = W + 'px'; c.style.height = H + 'px';
    }
    build();
    drawBase();
    drawOverlay();
    updateReadout(W * 0.68, H * 0.42);
  }

  function animateIn() {
    const t0 = performance.now(), dur = 2200;
    const step = (now) => {
      progress = Math.min(1, (now - t0) / dur);
      drawBase();
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  let ro;
  const start = () => {
    resize();
    if (!reduced) animateIn();
    ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      progress = 1;
      resize();
    });
    ro.observe(root);
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);

  if (finePointer) {
    root.addEventListener('pointermove', (ev) => {
      const r = root.getBoundingClientRect();
      const x = ev.clientX - r.left, y = ev.clientY - r.top;
      const overUI = ev.target.closest('a, button, input, [data-no-cross]');
      mouse = overUI ? null : { x, y };
      root.classList.toggle('is-crosshair', !overUI);
      updateReadout(x, y);
      drawOverlay();
    });
    root.addEventListener('pointerleave', () => { mouse = null; drawOverlay(); });
  }
}
