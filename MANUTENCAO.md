# Manutenção (PT)

Todo o texto fica em **`src/content.mjs`**, sempre em pares `t('português', 'english')`:

| O quê | Onde |
|---|---|
| Números do quadro de quantidades | `quantities` |
| Projetos em destaque (com figura) | `featured` |
| Lista de projetos (linhas expansíveis) | `index` |
| Perfil longitudinal e experiências | `profile`, `roles` |
| Stack (estado: `prod`, `proj`, `study`) | `layers` |
| Formação, cursos, prêmios | `education` |
| Textos da interface, hero, contato, SEO | `ui.pt` / `ui.en` |
| URL final do site (canonical, OG, sitemap) | `site.url` |

As figuras dos destaques são SVG desenhados em `src/figures.mjs`
(`fig: 'hub' | 'agent' | 'civil3d' | 'road' | 'pdf2dwg' | 'dbaas' | 'mcp' | 'nature' | 'exebot' | 'aerial' | 'docs'`).

```powershell
npm run preview      # gera dist/ e serve em http://localhost:4321
npm run deploy       # gera e envia para o servidor (destino em deploy.config.json, fora do git)
node og/og.mjs       # regenera as imagens de compartilhamento (com o preview rodando)
node github-profile/banner.mjs   # regenera o banner do perfil do GitHub
```

Regras do conteúdo: conhecimento de curso aparece só como "estudo", pesos de modelo de terceiros
não são reivindicados e nomes de clientes da empresa ficam fora da página pública.
