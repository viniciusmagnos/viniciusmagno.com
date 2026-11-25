// All site content, PT + EN. Edit here and run `npm run build`.
// Honesty rules from my master resume are respected:
// study-level items are marked as such, third-party model weights are not claimed,
// client names are kept off the public page.

const t = (pt, en) => ({ pt, en });

export const site = {
  name: 'Vinícius Magno',
  email: 'viniciusmagnosp@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vinicius-magno/',
  github: 'https://github.com/viniciusmagnos',
  source: 'https://github.com/viniciusmagnos/viniciusmagno.com',
  // Final public URL (used for canonical/OG/sitemap).
  url: 'https://viniciusmagno.com',
};

// ---------------------------------------------------------------- bill of quantities
export const quantities = [
  { desc: t('Ferramentas de engenharia na plataforma Manta Hub', 'Engineering tools on the Manta Hub platform'), unit: t('un', 'ea'), qty: t('15', '15'), src: t('serviços em produção', 'services in production') },
  { desc: t('Microsserviços FastAPI rodando em produção', 'FastAPI microservices running in production'), unit: t('un', 'ea'), qty: t('17', '17'), src: t('VPS Linux + systemd', 'Linux VPS + systemd') },
  { desc: t('Testes automatizados no Manta Hub', 'Automated tests on Manta Hub'), unit: t('un', 'ea'), qty: t('1.230', '1,230'), src: t('pytest + Vitest', 'pytest + Vitest') },
  { desc: t('Linhas de Python e TypeScript no Manta Hub', 'Lines of Python and TypeScript on Manta Hub'), unit: t('mil', 'k'), qty: t('≈ 192', '≈ 192'), src: t('≈ 103 mil Py + 89 mil TS', '≈ 103k Py + 89k TS') },
  { desc: t('Servidores MCP em produção', 'MCP servers in production'), unit: t('un', 'ea'), qty: t('5', '5'), src: t('SharePoint, Postgres, Hub, Civil 3D, Nature', 'SharePoint, Postgres, Hub, Civil 3D, Nature') },
  { desc: t('Registros de outorga cruzados no motor de disponibilidade hídrica', 'Water-permit records cross-checked by the water-availability engine'), unit: t('un', 'ea'), qty: t('292.386', '292,386'), src: t('6 fontes públicas', '6 public sources') },
  { desc: t('Frames de vídeo rodoviário processados por visão computacional', 'Road video frames processed by computer vision'), unit: t('un', 'ea'), qty: t('27.697', '27,697'), src: t('9 campanhas de campo', '9 field campaigns') },
  { desc: t('Defeitos de pavimento detectados e georreferenciados', 'Pavement defects detected and geolocated'), unit: t('un', 'ea'), qty: t('16.618', '16,618'), src: t('YOLOv10x em GPU', 'YOLOv10x on GPU') },
  { desc: t('Pares de pranchas PDF ↔ DWG no benchmark de conversão', 'PDF ↔ DWG sheet pairs in the conversion benchmark'), unit: t('un', 'ea'), qty: t('607', '607'), src: t('projetos reais', 'real projects') },
  { desc: t('Requisitos de release automatizados no ERP Delphi', 'Release requests automated on the Delphi ERP'), unit: t('un', 'ea'), qty: t('383', '383'), src: t('em 7 semanas', 'in 7 weeks') },
  { desc: t('Medalhas na Olimpíada Brasileira de Matemática (OBMEP)', 'Medals at the Brazilian Math Olympiad (OBMEP)'), unit: t('un', 'ea'), qty: t('4', '4'), src: t('3 bronzes, 1 prata', '3 bronze, 1 silver') },
];

// ---------------------------------------------------------------- featured projects
export const featured = [
  {
    id: 'manta-hub', fig: 'hub', layer: 'platform', live: true,
    where: t('Manta Associados, 2026', 'Manta Associados, 2026'),
    status: t('Em produção', 'In production'),
    figCaption: t('arquitetura', 'architecture'),
    title: t('Manta Hub: uma plataforma com 15 ferramentas de engenharia', 'Manta Hub: one platform, 15 engineering tools'),
    summary: t(
      'Plataforma web que lê os arquivos que a engenharia de infraestrutura realmente usa (DWG/DXF, LandXML do Civil 3D, IFC, PDF e planilhas) e devolve quantitativos, análises e planilhas de auditoria. Concebi a arquitetura e desenvolvi de ponta a ponta: backend, frontend, testes e deploy.',
      'A web platform that reads the files infrastructure engineering actually uses (DWG/DXF, Civil 3D LandXML, IFC, PDF and spreadsheets) and returns quantity takeoffs, analyses and audit-ready workbooks. I designed the architecture and built it end to end: backend, frontend, tests and deploy.'),
    facts: t([
      '17 microsserviços FastAPI independentes, um por domínio, com biblioteca compartilhada e SPA em React 19 + TypeScript.',
      'Ferramentas de terraplenagem (Brückner DER-SP), pavimentação, iluminação, sinalização, sondagem SPT, pontes (OAE), BIM/IFC, orçamento e análise estrutural por elementos finitos.',
      'Parser LandXML em streaming SAX que lê arquivos de 500 MB+ sem carregá-los em memória; superfícies TIN por Delaunay e volumes de corte e aterro.',
      'Motor CAD 2D próprio em Canvas (pan, zoom, snap, seleção window/crossing, índice espacial) e visualizador 3D de corredores em Three.js.',
      '1.230 testes automatizados, incluindo golden tests que garantem o mesmo resultado nos motores de cálculo em TypeScript e Python.',
    ], [
      '17 independent FastAPI microservices, one per domain, with a shared library and a React 19 + TypeScript SPA.',
      'Tools for earthworks (DER-SP mass haul), paving, lighting, signage, SPT boreholes, bridges, BIM/IFC, budgeting and finite-element structural analysis.',
      'Streaming SAX LandXML parser that reads 500 MB+ files without loading them into memory; Delaunay TIN surfaces and cut/fill volumes.',
      'In-house 2D CAD engine on Canvas (pan, zoom, snapping, window/crossing selection, spatial index) and a Three.js 3D corridor viewer.',
      '1,230 automated tests, including golden tests that keep the TypeScript and Python calculation engines in agreement.',
    ]),
    stack: ['Python', 'FastAPI', 'Pydantic v2', 'React 19', 'TypeScript', 'Three.js', 'ezdxf', 'ifcopenshell', 'SciPy', 'nginx', 'systemd', 'Vercel'],
  },
  {
    id: 'askcad', fig: 'agent', layer: 'ai', live: true,
    where: t('Manta Associados, 2026', 'Manta Associados, 2026'),
    status: t('Em produção', 'In production'),
    figCaption: t('loop agêntico', 'agent loop'),
    title: t('AskCAD: perguntas em linguagem natural sobre projetos CAD', 'AskCAD: plain-language questions about CAD projects'),
    summary: t(
      'Agente de IA que responde perguntas sobre desenhos DWG/DXF, PDFs e planilhas usando ferramentas de verdade: lê camadas, mede, busca textos, calcula volumes e exporta planilhas. O engenheiro pergunta como perguntaria a um colega; o agente mostra o raciocínio e propõe ações que só são aplicadas com confirmação.',
      'An AI agent that answers questions about DWG/DXF drawings, PDFs and spreadsheets by using real tools: it reads layers, measures, searches text, computes volumes and exports workbooks. Engineers ask the way they would ask a colleague; the agent shows its work and proposes actions that only apply after confirmation.'),
    facts: t([
      'Loop de tool use sobre a API da Anthropic com mais de 15 ferramentas, thinking intercalado e streaming por SSE.',
      'LoopGuard: limite de turnos, deduplicação de chamadas, detecção de não-progresso e teto de custo em US$ por conversa.',
      'RAG local sem API externa (embeddings multilingual-e5 + FTS5 do SQLite), prompt caching e memória reflexiva extraída com Claude Haiku.',
      'Personas configuráveis por usuário, colaboração em tempo real na mesma conversa e painel de consumo de IA com custo atribuído por usuário.',
    ], [
      'Tool-use loop on the Anthropic API with 15+ tools, interleaved thinking and SSE streaming.',
      'LoopGuard: max turns, call deduplication, no-progress detection and a USD budget cap per conversation.',
      'Local RAG with no external API (multilingual-e5 embeddings + SQLite FTS5), prompt caching and reflexive memory extracted with Claude Haiku.',
      'Per-user personas, real-time collaboration in the same conversation and an AI usage dashboard with per-user cost attribution.',
    ]),
    stack: ['Anthropic API', 'Tool use', 'SSE', 'sentence-transformers', 'SQLite FTS5', 'FastAPI', 'React'],
  },
  {
    id: 'topovia', fig: 'civil3d', layer: 'ai', live: true,
    where: t('Topovia, 2026', 'Topovia, 2026'),
    status: t('Produto em distribuição', 'Shipping product'),
    figCaption: t('IA dentro do Civil 3D', 'AI inside Civil 3D'),
    title: t('Topovia Civil: o Claude trabalhando dentro do Civil 3D', 'Topovia Civil: Claude working inside Civil 3D'),
    summary: t(
      'Assistente de IA para o Autodesk Civil 3D 2026. O Claude lê o que o projetista está fazendo e o que há no desenho (superfícies, alinhamentos, corredores, seções) e aplica ações de uma lista fechada, sempre depois de aprovadas e sempre reversíveis com um U. Por trás, um motor geométrico próprio validado métrica a métrica contra o próprio Civil 3D.',
      'An AI assistant for Autodesk Civil 3D 2026. Claude reads what the designer is doing and what is in the drawing (surfaces, alignments, corridors, sections) and applies actions from a closed list, always after approval and always undoable with a U. Underneath sits an in-house geometry engine validated metric by metric against Civil 3D itself.'),
    facts: t([
      'Plugin .NET conversando por named pipe com um servidor MCP em C#: 26 ferramentas e 47 tipos de ação tipados.',
      'Motor clean-room de TIN, alinhamentos, perfis, corredores, volumes e Brückner, com teste diferencial usando o Civil 3D como oráculo: 228 métricas de superfície, 220 seções e 6.772 pontos de corredor.',
      'Lê um LandXML de 559 MB com 5,2 milhões de triângulos em cerca de 75 s; testado com MDT de drone de 930 mil pontos e eixo de 6,6 km.',
      'Empacotado como produto: instalador próprio, extensão .mcpb e servidor de licenças com assinatura ECDSA P-256.',
    ], [
      '.NET plugin talking over a named pipe to a C# MCP server: 26 tools and 47 typed action kinds.',
      'Clean-room engine for TINs, alignments, profiles, corridors, volumes and mass haul, differentially tested with Civil 3D as the oracle: 228 surface metrics, 220 sections and 6,772 corridor points.',
      'Reads a 559 MB LandXML with 5.2 million triangles in about 75 s; tested on a 930k-point drone DTM and a 6.6 km alignment.',
      'Packaged as a product: own installer, .mcpb extension and a license server with ECDSA P-256 signatures.',
    ]),
    stack: ['C#', '.NET 8', 'MCP', 'Civil 3D API', 'Python', 'NumPy', 'SciPy', 'Shapely', 'FastAPI', 'Three.js'],
  },
  {
    id: 'road', fig: 'road', layer: 'cv', live: true,
    where: t('Manta Associados, 2026', 'Manta Associados, 2026'),
    status: t('Em produção', 'In production'),
    figCaption: t('detecção e ranqueamento', 'detection and ranking'),
    title: t('Inspeção de pavimento por visão computacional', 'Pavement inspection with computer vision'),
    summary: t(
      'O técnico percorre a rodovia com o celular; o navegador transmite vídeo e GPS por WebSocket, o servidor roda a detecção em GPU e georreferencia cada defeito. O resultado não é uma lista de caixas: é um relatório de trechos críticos de 100 m, ranqueados para priorizar a manutenção.',
      'A technician drives the road with a phone; the browser streams video and GPS over WebSocket, the server runs detection on a GPU and geolocates every defect. The output is not a list of boxes: it is a report of critical 100 m segments, ranked to prioritize maintenance.'),
    facts: t([
      '27.697 frames processados e 16.618 detecções georreferenciadas em 9 campanhas de campo, com cerca de 40 endpoints REST + WebSocket.',
      'Benchmark de três arquiteturas (YOLOv10x, RTMDet-X e Co-DETR Swin-L) sobre os mesmos frames, cada uma em ambiente Python isolado.',
      'Streaming com backpressure por ACK, que estabilizou o FPS em rede móvel e no Safari do iOS.',
      'Pipeline de fine-tuning do YOLO11m sobre 38.385 imagens do RDD, com AMP, early stopping e retomada de checkpoint.',
    ], [
      '27,697 frames processed and 16,618 geolocated detections across 9 field campaigns, with about 40 REST + WebSocket endpoints.',
      'Benchmark of three architectures (YOLOv10x, RTMDet-X and Co-DETR Swin-L) on identical frames, each in its own isolated Python environment.',
      'ACK-based backpressure streaming that stabilized frame rate over mobile networks and on iOS Safari.',
      'YOLO11m fine-tuning pipeline on 38,385 RDD images, with AMP, early stopping and checkpoint resume.',
    ]),
    stack: ['PyTorch', 'CUDA', 'YOLOv10x', 'MMDetection', 'FastAPI', 'WebSocket', 'OpenCV', 'Leaflet'],
    note: t('Os pesos de produção são YOLOv10x pré-treinados publicamente (FRDC/ORDDC 2024); meu trabalho é a integração, a avaliação comparativa e a industrialização do sistema.',
      'Production weights are publicly released pre-trained YOLOv10x (FRDC/ORDDC 2024); my work is the integration, comparative evaluation and productionization of the system.'),
  },
  {
    id: 'pdf2dwg', fig: 'pdf2dwg', layer: 'eng', live: false,
    where: t('Manta Associados, 2026', 'Manta Associados, 2026'),
    status: t('Indo para produção', 'Rolling into production'),
    figCaption: t('PDF vetorial → DXF georreferenciado', 'vector PDF → georeferenced DXF'),
    title: t('PDF → DWG: recuperar o desenho que o cliente só mandou em PDF', 'PDF → DWG: recovering drawings that only arrive as PDF'),
    summary: t(
      'Projetos chegam muitas vezes só em PDF. O conversor reconstrói o desenho com camadas, hachuras, tipos de linha, textos e coordenadas UTM reais, onde o PDFIMPORT do AutoCAD entrega um bloco único, fora de escala e com camadas misturadas.',
      'Projects often arrive as PDF only. The converter rebuilds the drawing with layers, hatches, linetypes, text and real UTM coordinates, where AutoCAD’s PDFIMPORT returns a single block at the wrong scale with mixed-up layers.'),
    facts: t([
      'Avaliado contra o DWG original em 607 pares de pranchas reais: recall mediano de 0,86 a 0,95 nas disciplinas 2D.',
      'Numa prancha de ponte: recall 0,946, precisão 0,934, erro médio de 0,06 m e georreferenciamento com resíduo zero na grade UTM.',
      'Supera o PDFIMPORT do AutoCAD 2026 nas duas pranchas comparadas lado a lado.',
      'Classificador de camadas (random forest) com 84,6% de acurácia em validação deixando uma prancha de fora; conversão ao vivo por SSE dentro do Hub e como ferramentas MCP.',
    ], [
      'Evaluated against the original DWG on 607 real sheet pairs: median recall of 0.86 to 0.95 on 2D disciplines.',
      'On a bridge sheet: recall 0.946, precision 0.934, mean error 0.06 m and zero residual on the UTM grid.',
      'Outperforms AutoCAD 2026 PDFIMPORT on both sheets compared head to head.',
      'Layer classifier (random forest) at 84.6% leave-one-sheet-out accuracy; live SSE conversion inside the Hub and exposed as MCP tools.',
    ]),
    stack: ['Python', 'PyMuPDF', 'ezdxf', 'Shapely', 'scikit-learn', 'SciPy', 'ODA File Converter', 'SSE'],
  },
  {
    id: 'mantabase', fig: 'dbaas', layer: 'platform', live: true,
    where: t('Manta Associados, 2026', 'Manta Associados, 2026'),
    status: t('Em produção', 'In production'),
    figCaption: t('control plane e isolamento', 'control plane and isolation'),
    title: t('MantaBase: bancos PostgreSQL sob demanda para a empresa', 'MantaBase: on-demand PostgreSQL for the company'),
    summary: t(
      'Um "mini-Supabase" interno: qualquer aplicativo da empresa ganha um banco PostgreSQL isolado, com chaves de API por escopo, painel web e acesso para assistentes de IA. Substituiu a dependência de BaaS de terceiros.',
      'An in-house “mini-Supabase”: any company app gets an isolated PostgreSQL database with scoped API keys, a web console and access for AI assistants. It replaced reliance on third-party BaaS.'),
    facts: t([
      'Authorization Server OAuth 2.1 escrito do zero: Dynamic Client Registration (RFC 7591), discovery (RFC 8414), PKCE S256 e rotação de refresh token com detecção de reuso por família.',
      'Isolamento garantido no próprio PostgreSQL: um banco e um role dono por projeto, REVOKE CONNECT FROM PUBLIC e senhas cifradas com Fernet.',
      'Gerenciador visual de schema no estilo DBeaver: 16 tipos de alteração com preview do SQL e aplicação numa única transação.',
      '36 endpoints assíncronos, 13 ferramentas MCP, 5 containers em produção; do MVP à produção com OAuth em cerca de duas semanas.',
    ], [
      'OAuth 2.1 Authorization Server written from scratch: Dynamic Client Registration (RFC 7591), discovery (RFC 8414), PKCE S256 and refresh-token rotation with family-based reuse detection.',
      'Isolation enforced by PostgreSQL itself: one database and owner role per project, REVOKE CONNECT FROM PUBLIC and Fernet-encrypted secrets.',
      'DBeaver-style visual schema manager: 16 change types with SQL preview, applied in a single transaction.',
      '36 async endpoints, 13 MCP tools, 5 production containers; MVP to production with OAuth in about two weeks.',
    ]),
    stack: ['FastAPI', 'asyncpg', 'PostgreSQL 16', 'OAuth 2.1', 'React 19', 'Docker Compose', 'Caddy', 'FastMCP'],
  },
  {
    id: 'mcp', fig: 'mcp', layer: 'ai', live: true,
    where: t('Manta Associados, 2026', 'Manta Associados, 2026'),
    status: t('Em produção', 'In production'),
    figCaption: t('servidores MCP', 'MCP servers'),
    title: t('Servidores MCP: assistentes de IA dentro dos sistemas de verdade', 'MCP servers: AI assistants inside real systems'),
    summary: t(
      'Cinco servidores Model Context Protocol em produção dão ao Claude acesso ao SharePoint, a bancos PostgreSQL, à plataforma de engenharia, ao Civil 3D e ao sistema de gestão de um cliente, sempre com a identidade e as permissões de quem está usando. A IA não ganha nenhum poder que o usuário não tenha.',
      'Five production Model Context Protocol servers give Claude access to SharePoint, PostgreSQL databases, the engineering platform, Civil 3D and a client’s management system, always under the identity and permissions of whoever is using it. The AI never gets a power the user does not have.'),
    facts: t([
      'SharePoint MCP: 18 ferramentas sobre a Microsoft Graph, Entra ID com fluxo On-Behalf-Of, upload em partes, paginação OData completa e exclusão para a lixeira por padrão.',
      'Camada HTTP assíncrona resiliente: retry com backoff respeitando Retry-After, tratamento de 429/503 e fan-out paralelo.',
      'Manta Hub MCP: validação do JWT na fronteira e repasse do mesmo Bearer aos serviços, sem guardar credencial nem sessão.',
      'Também: um MCP de deploy (TypeScript, 16 ferramentas) distribuído ao time com instalador, e a extensão de um MCP open source de AutoCAD de 48 para 74 ferramentas, com sandbox de código por AST.',
    ], [
      'SharePoint MCP: 18 tools over Microsoft Graph, Entra ID with the On-Behalf-Of flow, chunked upload, full OData pagination and soft delete to the recycle bin by default.',
      'Resilient async HTTP layer: backoff retry honoring Retry-After, 429/503 handling and parallel fan-out.',
      'Manta Hub MCP: JWT verified at the edge and the same Bearer forwarded to services, with no stored credentials or sessions.',
      'Also: a deploy MCP (TypeScript, 16 tools) shipped to the team with an installer, and an open-source AutoCAD MCP extended from 48 to 74 tools with an AST code sandbox.',
    ]),
    stack: ['FastMCP', 'MCP SDK', 'Microsoft Graph', 'Entra ID', 'httpx', 'OAuth 2.1', 'Docker', 'TypeScript'],
  },
  {
    id: 'nature', fig: 'nature', layer: 'eng', live: true,
    where: t('Cliente Nature Agroambiental, 2026', 'Client: Nature Agroambiental, 2026'),
    status: t('Em produção', 'In production'),
    figCaption: t('análise a montante', 'upstream analysis'),
    title: t('Outorga e Gestão Nature: dois sistemas para um escritório agroambiental', 'Outorga and Gestão Nature: two systems for an agri-environmental office'),
    summary: t(
      'Para um escritório de topografia, georreferenciamento e licenciamento ambiental, construí e opero dois sistemas. O Outorga responde em segundos se ainda há água disponível num ponto de qualquer rio de Minas Gerais. A Gestão Nature substituiu a planilha que organizava todos os processos do escritório.',
      'For a surveying, georeferencing and environmental-licensing office, I built and run two systems. Outorga answers in seconds whether water is still available at a point on any river in Minas Gerais. Gestão Nature replaced the spreadsheet that ran every process in the office.'),
    facts: t([
      'Outorga: identifica a bacia pelas coordenadas, lê a vazão de referência (Q7,10) do trecho e percorre a rede de drenagem para montante somando as outorgas, sobre 292.386 registros de 6 fontes públicas, com deduplicação e mascaramento de dados pessoais.',
      'Outorga também gera planilha, mapa e laudo, e dimensiona captações, poços e irrigação; o caso do Rio São Francisco em Pirapora (136.760 trechos, 21.526 outorgas) responde em cerca de 3 s.',
      'Gestão Nature: React + Supabase auto-hospedado, segurança no próprio banco (RLS por perfil, testada por scripts SQL), PWA offline, WhatsApp automático, Google Drive e Agenda.',
      'Servidor MCP com OAuth 2.1 próprio e 30 ferramentas, para o Claude operar o sistema com as mesmas permissões de cada usuário; da especificação à produção em cerca de um dia.',
    ], [
      'Outorga: finds the catchment from coordinates, reads the reach’s reference low flow (Q7,10) and walks the drainage network upstream adding up permits, over 292,386 records from 6 public sources, with deduplication and personal-data masking.',
      'Outorga also produces a workbook, map and report, and sizes intakes, wells and irrigation; the São Francisco River at Pirapora (136,760 reaches, 21,526 permits) answers in about 3 s.',
      'Gestão Nature: React + self-hosted Supabase, security enforced in the database (per-role RLS, tested with SQL scripts), offline PWA, automatic WhatsApp, Google Drive and Calendar.',
      'An MCP server with its own OAuth 2.1 and 30 tools, so Claude can run the system under each user’s permissions; spec to production in about a day.',
    ]),
    stack: ['Python', 'Streamlit', 'GeoPandas', 'Shapely', 'SQLite', 'React', 'Supabase', 'PostgreSQL RLS', 'MCP', 'Caddy', 'systemd'],
  },
  {
    id: 'exebot', fig: 'exebot', layer: 'auto', live: false,
    where: t('Realtec, 2025', 'Realtec, 2025'),
    status: t('Usado em produção', 'Used in production'),
    figCaption: t('esteira de release', 'release pipeline'),
    title: t('EXE-bot: CI/CD sob medida para um ERP Delphi sem automação', 'EXE-bot: custom CI/CD for a Delphi ERP with no automation'),
    summary: t(
      'Cada cliente do ERP recebia executáveis personalizados, montados à mão em uns dez passos por requisito. Escrevi um robô que lê o card no Jira, descobre os commits, faz o backport por cherry-pick, versiona, compila com MSBuild, publica, avisa no Teams e fecha o card.',
      'Every ERP customer received custom executables, assembled by hand in about ten steps per request. I wrote a bot that reads the Jira ticket, finds the commits, backports them by cherry-pick, bumps the version, compiles with MSBuild, publishes, posts to Teams and closes the ticket.'),
    facts: t([
      '383 requisitos processados em 7 semanas e 180 executáveis entregues sem intervenção, com cerca de 74% de automação de ponta a ponta.',
      'Confiável por desenho: idempotência pelo changelog do Jira, validação do artefato, rollback transacional do repositório e escalonamento para humano no caso desconhecido.',
      'Fila em SQLite alimentada por API Flask, com máquina de 5 estados, e integração com a Dev Status API do Jira, que não é documentada publicamente.',
    ], [
      '383 requests processed in 7 weeks and 180 executables delivered untouched, with about 74% end-to-end automation.',
      'Reliable by design: idempotency via the Jira changelog, artifact validation, transactional repository rollback and escalation to a human on unknown cases.',
      'SQLite queue fed by a Flask API with a 5-state machine, integrated with Jira’s publicly undocumented Dev Status API.',
    ]),
    stack: ['Python', 'Flask', 'SQLite', 'Git', 'MSBuild', 'Jira REST', 'Azure Logic Apps', 'Teams'],
  },
];

// ---------------------------------------------------------------- drawing index (more projects)
export const index = [
  {
    layers: ['cv', 'eng'], year: '2026',
    title: t('Vetorização de lotes urbanos a partir de ortomosaico de drone', 'Urban lot vectorization from drone orthomosaics'),
    sub: t('O cadastro CAD vira rótulo; o modelo devolve polígonos georreferenciados', 'The CAD cadastre becomes the labels; the model returns georeferenced polygons'),
    body: t(
      'Junta meus dois mundos anteriores: o cadastro imobiliário e os voos de drone da prefeitura. A ideia central é usar o cadastro CAD que já existe como fonte de rótulos, em vez de anotar à mão, e treinar um modelo que devolve polígonos de lotes georreferenciados.',
      'It joins my two previous worlds: municipal property records and drone surveys. The core idea is to use the existing CAD cadastre as the label source instead of hand annotation, and train a model that returns georeferenced lot polygons.'),
    facts: t([
      'Rotulagem 100% automática: 7.466 feições CAD → 7.080 polígonos válidos (94,8%) → 2.657 anotações em 562 tiles, com saneamento topológico das polilinhas.',
      'YOLOv8m-seg ajustado: mAP@50 de 96,5% e mAP@50-95 de 91,6% em máscara, a 35,8 FPS, num conjunto de validação de 47 tiles.',
      'Avaliação própria além da do framework: matching por IoU em Shapely, análise de TP/FP/FN e ranking dos piores tiles.',
    ], [
      '100% automatic labeling: 7,466 CAD features → 7,080 valid polygons (94.8%) → 2,657 labels across 562 tiles, with topological repair of the polylines.',
      'Fine-tuned YOLOv8m-seg: 96.5% mask mAP@50 and 91.6% mAP@50-95 at 35.8 FPS, on a 47-tile validation set.',
      'Own evaluation beyond the framework: IoU matching in Shapely, TP/FP/FN analysis and worst-tile ranking.',
    ]),
    stack: ['PyTorch', 'Ultralytics', 'rasterio', 'GeoPandas', 'Shapely', 'GDAL', 'QGIS'],
  },
  {
    layers: ['ai', 'eng'], year: '2026',
    title: t('Extrator agêntico de PER e MEF', 'Agentic PER & MEF extractor'),
    sub: t('Claude lendo contratos de concessão e modelos financeiros', 'Claude reading concession contracts and financial models'),
    body: t('Lê os programas de exploração de rodovias (PDF) e os modelos econômico-financeiros (Excel) de concessões, mapeia o papel de cada aba com evidência de célula e consolida os números até o item de custo SICRO.',
      'Reads road concession programs (PDF) and economic-financial models (Excel), maps each sheet’s role with cell-level evidence and consolidates the figures down to SICRO cost items.'),
    facts: t([
      'Orquestrador Claude com sub-loops, Python em sandbox e leitura de fórmulas via Excel COM.',
      '23 validadores determinísticos de identidades contábeis e cruzamentos PER × MEF; avaliação contra 17 planilhas golden.',
      'Teto de custo de US$ 10 por planilha e replay das execuções por SSE.',
    ], [
      'Claude orchestrator with sub-loops, sandboxed Python and formula reading via Excel COM.',
      '23 deterministic validators for accounting identities and PER × MEF cross-checks; evaluated against 17 golden workbooks.',
      'USD 10 cost cap per workbook and SSE run replay.',
    ]),
    stack: ['Anthropic API', 'Python', 'Flask', 'openpyxl', 'pdfplumber', 'SQLite FTS5', 'React'],
  },
  {
    layers: ['eng', 'platform'], year: '2026',
    title: t('Corredor 3D de rodovias', '3D highway corridor'),
    sub: t('Plantas e perfis do Civil 3D viram um corredor 3D no navegador', 'Civil 3D plan-and-profile sheets become a 3D corridor in the browser'),
    body: t('Converte pranchas de planta e perfil, LandXML de 0,3 a 2 GB e ortofotos em um corredor rodoviário 3D navegável, com greide, disciplinas, sondagens, faixa de domínio e comparação entre revisões de projeto.',
      'Turns plan-and-profile sheets, 0.3 to 2 GB LandXML files and orthophotos into a navigable 3D highway corridor with design grade, disciplines, boreholes, right of way and design-revision comparison.'),
    facts: t([
      'Greide conferido contra o motor do Manta Hub com diferença máxima de 1,5 mm.',
      '33 ortofotos de 10 cm (≈ 3,7 GB) convertidas em texturas para a web; leitura de LandXML por mmap em streaming.',
    ], [
      'Design grade checked against the Manta Hub engine to within 1.5 mm.',
      '33 orthophotos at 10 cm (≈ 3.7 GB) turned into web textures; streaming mmap LandXML reading.',
    ]),
    stack: ['Python', 'ezdxf', 'NumPy', 'GDAL', 'Three.js', 'Netlify'],
  },
  {
    layers: ['eng', 'platform'], year: '2026',
    title: t('Dashboard de terraplenagem', 'Earthworks dashboard'),
    sub: t('Diagrama de Brückner, seções, cenários e custo por km', 'Mass-haul diagram, sections, scenarios and cost per km'),
    body: t('Painel independente que carrega estudos do Manta Hub sob demanda: Brückner, seções transversais, geotecnia, matriz de distância média de transporte, cenários, custo por km, cronograma e relatório, com assistente de IA embutido e login único pelo Hub.',
      'Standalone dashboard that loads Manta Hub studies on demand: mass-haul diagram, cross sections, geotechnics, average haul-distance matrix, scenarios, cost per km, schedule and report, with an embedded AI assistant and Hub single sign-on.'),
    facts: t([
      '29 abas de análise; 122 testes Vitest, incluindo paridade de cálculo TypeScript ↔ Python.',
    ], [
      '29 analysis tabs; 122 Vitest tests, including TypeScript ↔ Python calculation parity.',
    ]),
    stack: ['React 19', 'TypeScript', 'Three.js', 'Leaflet', 'Recharts', 'Vitest'],
  },
  {
    layers: ['ai', 'platform'], year: '2026',
    title: t('Orçamento por similaridade semântica', 'Semantic budget matching'),
    sub: t('Itens de orçamento casados com SICRO, SINAPI e TPU', 'Budget items matched to SICRO, SINAPI and TPU'),
    body: t('Encontra o item de referência certo para cada linha de uma planilha de quantitativos, combinando TF-IDF, embeddings da OpenAI e sentence-transformers com uma pontuação de compatibilidade de unidades (80+ apelidos em 12 grupos).',
      'Finds the right reference item for each line of a quantity sheet, combining TF-IDF, OpenAI embeddings and sentence-transformers with a unit-compatibility score (80+ aliases in 12 groups).'),
    stack: ['Python', 'OpenAI embeddings', 'sentence-transformers', 'TF-IDF', 'BM25', 'FastAPI'],
  },
  {
    layers: ['cv', 'platform'], year: '2026',
    title: t('Document Extractor', 'Document Extractor'),
    sub: t('OCR e validação de CNH, RG, certidões e comprovantes', 'OCR and validation for Brazilian IDs and certificates'),
    body: t('Recebe foto ou PDF de documento e devolve dados estruturados e validados. Alinha o documento por ORB + homografia RANSAC usando só o layout invariante (as features do retrato e dos dados pessoais são mascaradas), faz OCR zonal e valida com as regras oficiais.',
      'Takes a photo or PDF of a document and returns structured, validated data. It aligns the document with ORB + RANSAC homography using only the invariant layout (portrait and personal-data features are masked out), runs zonal OCR and validates against official rules.'),
    facts: t([
      'Quando o tipo de documento é reconhecido, 93% a 100% de acerto nos campos críticos, em benchmark reprodutível sobre o dataset público BID com 6 rodadas versionadas. A classificação de fotos ruidosas de campo ainda é o gargalo.',
      'Dígito verificador de CPF, módulo 11 da CNH e correção fuzzy contra os 5.571 municípios do IBGE; 24 endpoints e 54 testes.',
    ], [
      'When the document type is recognized, 93% to 100% accuracy on critical fields, in a reproducible benchmark on the public BID dataset across 6 versioned rounds. Classifying noisy field photos is still the bottleneck.',
      'CPF check digit, CNH modulo 11 and fuzzy correction against Brazil’s 5,571 IBGE municipalities; 24 endpoints and 54 tests.',
    ]),
    stack: ['FastAPI', 'OpenCV', 'Tesseract 5', 'PyMuPDF', 'SQLAlchemy 2', 'rapidfuzz', 'Canvas'],
  },
  {
    layers: ['ai', 'platform'], year: '2026',
    title: t('MantaSync', 'MantaSync'),
    sub: t('Base de conhecimento e código multi-tenant para IAs', 'Multi-tenant knowledge and code base for AI assistants'),
    body: t('Plataforma que dá a assistentes de IA acesso a documentos e repositórios da empresa: RAG com embeddings E5 offline e busca híbrida pgvector + full-text em português, serviço de repositórios git, espelho do SharePoint e servidor MCP. Foi o laboratório da arquitetura que virou o MantaBase e o Hub.',
      'A platform giving AI assistants access to company documents and repositories: RAG with offline E5 embeddings and hybrid pgvector + Portuguese full-text search, a git repository service, a SharePoint mirror and an MCP server. It was the testbed for the architecture that became MantaBase and the Hub.'),
    facts: t(['159 testes; 42 ferramentas MCP; autenticação dupla (JWT para pessoas, chaves de API para IAs).'],
      ['159 tests; 42 MCP tools; dual auth (JWT for people, API keys for AI clients).']),
    stack: ['FastAPI', 'PostgreSQL', 'pgvector', 'MinIO', 'pygit2', 'FastMCP', 'React 19'],
  },
  {
    layers: ['ai', 'auto'], year: '2026',
    title: t('Manta Lead', 'Manta Lead'),
    sub: t('Coleta e triagem de editais de inovação com IA', 'AI-assisted collection and triage of innovation calls'),
    body: t('Pipeline que coleta chamadas de inovação aberta e fomento, remove duplicatas por hash e similaridade, pontua cada oportunidade com Claude contra o perfil de cliente ideal e envia um resumo por e-mail via Microsoft Graph, com painel e administração.',
      'A pipeline that collects open-innovation and funding calls, removes duplicates by hash and similarity, scores each opportunity with Claude against the ideal customer profile and emails a digest via Microsoft Graph, with a dashboard and admin.'),
    stack: ['FastAPI', 'asyncpg', 'APScheduler', 'Claude Haiku', 'rapidfuzz', 'Microsoft Graph', 'Docker'],
  },
  {
    layers: ['ai', 'platform'], year: '2026',
    title: t('Manta Engine', 'Manta Engine'),
    sub: t('Compilador de interfaces guiado por IA (em desenvolvimento)', 'AI-driven UI compiler (in development)'),
    body: t('Transforma documentos corporativos em aplicações web. A IA nunca escreve HTML livre: só emite uma DSL em JSON validada por Pydantic contra um catálogo fechado de blocos, com auto-reparo em até 3 tentativas e revisão humana antes de publicar.',
      'Turns corporate documents into web apps. The AI never writes free-form HTML: it only emits a JSON DSL validated by Pydantic against a closed block catalog, with up to 3 self-repair attempts and human review before publishing.'),
    stack: ['FastAPI', 'Pydantic v2', 'Anthropic API', 'React 19', 'Tailwind 4'],
  },
  {
    layers: ['auto', 'platform'], year: '2026',
    title: t('Gerador de currículos por vaga', 'Per-job resume generator'),
    sub: t('Uma base única da verdade, recortada para cada vaga', 'One source of truth, cut to fit each job'),
    body: t('Banco de dados de carreira em YAML com cada experiência marcada por peso, tags e natureza (produção, projeto ou estudo). Um gerador em Python casa as tags com a descrição da vaga e monta o currículo em PT ou EN, recusando promover conhecimento de curso a experiência profissional.',
      'A YAML career database where each item carries weight, tags and nature (production, project or study). A Python generator matches tags to the job description and builds the resume in PT or EN, refusing to promote course knowledge to professional experience.'),
    stack: ['Python', 'YAML', 'python-docx'],
  },
  {
    layers: ['auto', 'eng'], year: '2023–24',
    title: t('Automação do cadastro imobiliário municipal', 'Municipal property-records automation'),
    sub: t('AutoCAD → Excel, formulários automáticos e app de campo', 'AutoCAD → Excel, automatic forms and a field app'),
    body: t('Conjunto de automações que tirou etapas manuais do cadastro da Prefeitura de Rio Paranaíba: exportação de valores do AutoCAD para Excel, preenchimento e impressão de fichas com dados dos contribuintes (VBA) e um aplicativo AppSheet de coleta em campo com sincronização automática.',
      'A set of automations that removed manual steps from Rio Paranaíba’s property records: AutoCAD-to-Excel export, automatic filling and printing of taxpayer forms (VBA) and an AppSheet field-collection app with automatic sync.'),
    stack: ['Python', 'VBA', 'AppSheet', 'AutoCAD', 'QGIS', 'Agisoft Metashape'],
  },
  {
    layers: ['ai', 'platform'], year: '2025',
    title: t('Text-to-SQL para um ERP legado (POC)', 'Text-to-SQL for a legacy ERP (POC)'),
    sub: t('Perguntas em português viram SQL num banco de 1.673 tabelas', 'Plain-language questions become SQL over a 1,673-table database'),
    body: t('Prova de conceito para um ERP agro em Firebird. As chaves estrangeiras viram um grafo de 1.673 tabelas e 4.008 relações, e o caminho mínimo entre duas tabelas gera os JOINs. Um agente ReAct navega o esquema, busca consultas parecidas por embeddings e valida o SQL no banco real antes de responder.',
      'A proof of concept for a Firebird agribusiness ERP. Foreign keys become a graph of 1,673 tables and 4,008 relations, and the shortest path between two tables generates the JOINs. A ReAct agent explores the schema, retrieves similar queries by embeddings and validates the SQL on the real database before answering.'),
    stack: ['Python', 'LangGraph', 'Gemini', 'Vertex AI embeddings', 'ChromaDB', 'networkx', 'Firebird', 'Streamlit'],
  },
  {
    layers: ['cv', 'eng'], year: '2026',
    title: t('Fotogrametria de drone em Rust (P&D)', 'Drone photogrammetry in Rust (R&D)'),
    sub: t('Das fotos ao MDT e ao ortomosaico, medido contra o padrão da indústria', 'From photos to DTM and orthomosaic, measured against the industry standard'),
    body: t('Pipeline clean-room de fotogrametria para terraplenagem (nuvem densa, MDS/MDT, curvas de nível e ortomosaico), orquestrando COLMAP e OpenMVS em GPU a partir de um núcleo em Rust, com o Agisoft Metashape usado só como referência de validação.',
      'A clean-room photogrammetry pipeline for earthworks (dense cloud, DSM/DTM, contours and orthomosaic), orchestrating COLMAP and OpenMVS on GPU from a Rust core, with Agisoft Metashape used only as the validation reference.'),
    facts: t([
      'Num voo real de 491 fotos, a reconstrução conectou 490; com pontos de controle, o erro vertical no controle (0,21–0,23 m) empatou com o Metashape.',
      'Resultado negativo documentado: nos produtos densos o erro ainda não atinge precisão de levantamento, e o relatório mostra por que o ajuste esparso enganava.',
    ], [
      'On a real 491-photo flight, reconstruction connected 490; with ground control, vertical error at the control points (0.21–0.23 m) matched Metashape.',
      'Documented negative result: dense products do not yet reach survey accuracy, and the report shows why the sparse fit was misleading.',
    ]),
    stack: ['Rust', 'axum', 'rayon', 'COLMAP', 'OpenMVS', 'PDAL', 'GDAL', 'CUDA'],
  },
  {
    layers: ['platform'], year: '2025',
    title: t('Sequenciamento de ordens de manutenção', 'Maintenance order scheduling'),
    sub: t('Seis metaheurísticas comparadas em 72 instâncias', 'Six metaheuristics compared on 72 instances'),
    body: t('Implementação da heurística gulosa parcial de um artigo e comparação com Simulated Annealing, algoritmo genético, VNS, GRASP e ILS para sequenciar tarefas × máquinas × equipes com janelas de tempo, sobre 72 instâncias geradas.',
      'Implementation of a paper’s partial-greedy heuristic, compared with Simulated Annealing, a genetic algorithm, VNS, GRASP and ILS for scheduling tasks × machines × crews with time windows, on 72 generated instances.'),
    stack: ['Python', 'NumPy', 'Matplotlib'],
  },
  {
    layers: ['cv'], year: '2025',
    title: t('Segmentação de plantas daninhas', 'Weed segmentation'),
    sub: t('Dataset COCO anotado e aumentado', 'Annotated and augmented COCO dataset'),
    body: t('Anotação de cerca de 2.000 imagens de treino e 400 de validação (512 × 512) em formato COCO, com polígonos e caixas, e data augmentation por zoom, flips e troca de fundo para ganhar diversidade e generalização. Treinos de Mask R-CNN em torchvision.',
      'Annotation of about 2,000 training and 400 validation images (512 × 512) in COCO format, with polygons and boxes, plus augmentation by zoom, flips and background swapping for diversity and generalization. Mask R-CNN training in torchvision.'),
    stack: ['PyTorch', 'torchvision', 'COCO', 'pycocotools'],
  },
];

// ---------------------------------------------------------------- career
export const profile = [
  { t: 2018.1, level: 0.08, label: t('UFV', 'UFV'), sub: t('Eng. Civil', 'Civil Eng.') },
  { t: 2022.0, level: 0.22, label: t('Web + monitoria', 'Web + TA'), sub: t('HTML · CSS · JS', 'HTML · CSS · JS') },
  { t: 2023.05, level: 0.36, label: t('Prefeitura', 'Municipality'), sub: t('cadastro · drones · Python', 'cadastre · drones · Python') },
  { t: 2024.38, level: 0.55, label: t('Realtec', 'Realtec'), sub: t('Delphi · SQL · automação', 'Delphi · SQL · automation') },
  { t: 2026.02, level: 0.9, label: t('Manta', 'Manta'), sub: t('IA · plataforma · CV', 'AI · platform · CV') },
];

export const roles = [
  {
    layer: 'ai', org: 'Manta Associados',
    when: t('jan 2026 — hoje', 'Jan 2026 — now'), where: t('Remoto', 'Remote'),
    title: t('Engenheiro de Software e IA', 'AI / Software Engineer'),
    facts: t([
      'Concebi e desenvolvi o Manta Hub (15 ferramentas, 17 microsserviços) e o MantaBase (PostgreSQL multi-tenant com OAuth 2.1 próprio).',
      'Construí agentes com tool use sobre Claude e OpenAI, pipelines de RAG com busca híbrida e três servidores MCP em produção.',
      'Levei visão computacional para a inspeção rodoviária e automatizei quantitativos de pontes, BIM/IFC, sondagens, sinalização, iluminação e pavimento.',
      'Opero a infraestrutura: Docker Compose, nginx/Caddy com TLS, systemd em VPS Linux, Vercel e Netlify com domínios próprios.',
    ], [
      'Designed and built Manta Hub (15 tools, 17 microservices) and MantaBase (multi-tenant PostgreSQL with an in-house OAuth 2.1 server).',
      'Built tool-use agents on Claude and OpenAI, hybrid-search RAG pipelines and three production MCP servers.',
      'Brought computer vision to road inspection and automated quantity takeoff for bridges, BIM/IFC, boreholes, signage, lighting and paving.',
      'Run the infrastructure: Docker Compose, nginx/Caddy with TLS, systemd on a Linux VPS, Vercel and Netlify with custom domains.',
    ]),
  },
  {
    layer: 'eng', org: t('projetos próprios e clientes', 'own products and clients'),
    when: t('2026 — hoje', '2026 — now'), where: t('Remoto', 'Remote'),
    title: t('Desenvolvedor independente', 'Independent developer'),
    facts: t([
      'Topovia Civil: assistente de IA para o Civil 3D, com servidor MCP em C#, motor geométrico validado contra o Civil 3D e licenciamento próprio.',
      'Nature Agroambiental: Outorga (disponibilidade hídrica em Minas Gerais) e Gestão Nature (gestão do escritório com servidor MCP), ambos em produção numa VPS que eu administro.',
    ], [
      'Topovia Civil: an AI assistant for Civil 3D with a C# MCP server, a geometry engine validated against Civil 3D and its own licensing.',
      'Nature Agroambiental: Outorga (water availability in Minas Gerais) and Gestão Nature (office management with an MCP server), both in production on a VPS I run.',
    ]),
  },
  {
    layer: 'auto', org: 'Realtec Solução em Gestão',
    when: t('mai 2024 — dez 2025', 'May 2024 — Dec 2025'), where: t('Presencial', 'On-site'),
    title: t('Desenvolvedor Delphi Pleno', 'Mid-level Delphi Developer'),
    facts: t([
      'Mantive e evoluí um ERP em produção em Delphi/Object Pascal: correção de bugs, regras de negócio, cálculos financeiros e integração entre módulos.',
      'SQL avançado e otimização sobre Firebird (CTEs, stored procedures, triggers, índices), além de backup, restauração e diagnóstico em produção.',
      'APIs REST em Node.js/Express para distribuição personalizada de anúncios.',
      'Criei o EXE-bot, que automatizou a geração e entrega de executáveis por cliente (383 requisitos em 7 semanas).',
    ], [
      'Maintained and evolved a production Delphi/Object Pascal ERP: bug fixing, business rules, financial calculations and cross-module integration.',
      'Advanced SQL and tuning on Firebird (CTEs, stored procedures, triggers, indexes), plus production backup, restore and troubleshooting.',
      'REST APIs in Node.js/Express for personalized ad distribution.',
      'Built EXE-bot, which automated per-customer executable builds and delivery (383 requests in 7 weeks).',
    ]),
  },
  {
    layer: 'eng', org: t('Prefeitura de Rio Paranaíba', 'Municipality of Rio Paranaíba').pt,
    when: t('jan 2023 — mai 2024', 'Jan 2023 — May 2024'), where: t('Rio Paranaíba, MG', 'Rio Paranaíba, Brazil'),
    title: t('Coordenador do Cadastro Imobiliário', 'Property Records Coordinator'),
    facts: t([
      'Liderei a equipe do cadastro imobiliário municipal, coordenando campo, processos cadastrais e dados geoespaciais.',
      'Levantamentos por drone e processamento fotogramétrico no Agisoft Metashape: ortomosaicos, nuvem de pontos e classificação de terreno.',
      'Vetorização e georreferenciamento de lotes em QGIS, AutoCAD e Civil 3D.',
      'Primeiras automações em Python e VBA, e um app AppSheet de coleta em campo.',
    ], [
      'Led the municipal property-records team, coordinating fieldwork, cadastral processes and geospatial data.',
      'Drone surveys and photogrammetry in Agisoft Metashape: orthomosaics, point clouds and ground classification.',
      'Lot vectorization and georeferencing in QGIS, AutoCAD and Civil 3D.',
      'First automations in Python and VBA, and an AppSheet field-collection app.',
    ]),
  },
  {
    layer: 'platform', org: 'Universidade Federal de Viçosa',
    when: t('2022 — 2023', '2022 — 2023'), where: t('Viçosa, MG', 'Viçosa, Brazil'),
    title: t('Estágio em desenvolvimento web e monitoria de Física 3', 'Web development intern and Physics 3 teaching assistant'),
    facts: t([
      'Desenvolvimento de aplicações web com HTML, CSS e JavaScript.',
      'Monitor de Física 3: explicar conceitos difíceis de forma simples, habilidade que uso até hoje com engenheiros e com IA.',
    ], [
      'Built web applications with HTML, CSS and JavaScript.',
      'Physics 3 teaching assistant: explaining hard concepts simply, a skill I still use with engineers and with AI.',
    ]),
  },
];
// fix org for EN where it is a {pt,en} pair
roles[3].org = t('Prefeitura de Rio Paranaíba', 'Municipality of Rio Paranaíba');

// ---------------------------------------------------------------- layers (skills)
// state: prod = used in production · proj = used in own working project · study = course/study only
export const layers = [
  { layer: 'ai', name: t('IA & LLM', 'AI & LLM'), items: [
    ['Anthropic Claude API', 'prod'], ['OpenAI API', 'prod'], [t('Agentes com tool use', 'Tool-use agents'), 'prod'], ['MCP / FastMCP', 'prod'],
    ['RAG', 'prod'], [t('Embeddings e busca híbrida (BM25 + pgvector)', 'Embeddings & hybrid search (BM25 + pgvector)'), 'prod'], ['sentence-transformers', 'prod'],
    [t('Guardrails e controle de custo', 'Guardrails & cost control'), 'prod'], ['Prompt caching', 'prod'], [t('Extração multimodal por visão', 'Multimodal vision extraction'), 'prod'],
    ['LangGraph / ChromaDB / Gemini', 'proj'], ['LlamaIndex / TruLens', 'study'], ['LangChain', 'study'],
  ] },
  { layer: 'cv', name: t('Visão computacional & ML', 'Computer vision & ML'), items: [
    ['PyTorch', 'prod'], ['YOLO (v8 / v10 / 11)', 'prod'], ['MMDetection', 'prod'], ['CUDA / GPU', 'prod'], ['OpenCV', 'prod'],
    [t('Segmentação de instâncias', 'Instance segmentation'), 'proj'], [t('OCR (Tesseract, zonal)', 'OCR (Tesseract, zonal)'), 'proj'], ['torchvision', 'proj'],
    ['scikit-learn', 'prod'], ['TensorFlow / Keras', 'study'],
  ] },
  { layer: 'platform', name: t('Backend & dados', 'Backend & data'), items: [
    ['Python', 'prod'], ['FastAPI', 'prod'], ['Pydantic v2', 'prod'], ['asyncio / httpx', 'prod'], ['PostgreSQL', 'prod'], ['SQLite (FTS5, R-tree)', 'prod'],
    ['Firebird', 'prod'], ['SQL tuning', 'prod'], ['OAuth 2.1 / JWT', 'prod'], ['Microsoft Graph / Entra ID', 'prod'], ['Node.js / Express', 'prod'], ['Flask', 'prod'],
    ['Delphi / Object Pascal', 'prod'], ['C# / .NET 8', 'prod'], ['Supabase (RLS, Edge Functions)', 'prod'], ['Streamlit', 'prod'],
    ['SQLAlchemy 2', 'proj'], ['Rust', 'proj'],
  ] },
  { layer: 'platform', name: t('Frontend', 'Frontend'), items: [
    ['React 19', 'prod'], ['TypeScript', 'prod'], ['Vite', 'prod'], ['Tailwind 4', 'prod'], ['Three.js', 'prod'], ['Canvas 2D', 'prod'], ['Leaflet', 'prod'], ['Recharts / Plotly', 'prod'], ['Vitest', 'prod'],
  ] },
  { layer: 'auto', name: t('Infra & automação', 'Infra & automation'), items: [
    ['Docker / Compose', 'prod'], ['Linux VPS', 'prod'], ['nginx / Caddy', 'prod'], ['systemd', 'prod'], ['Vercel / Netlify', 'prod'], ['Git / GitHub', 'prod'],
    [t('Automação de build (MSBuild)', 'Build automation (MSBuild)'), 'prod'], ['Jira API', 'prod'], ['VBA', 'prod'], ['AppSheet', 'prod'], ['Kubernetes', 'study'],
  ] },
  { layer: 'eng', name: t('Engenharia, CAD & geo', 'Engineering, CAD & geo'), items: [
    ['ezdxf (DXF/DWG)', 'prod'], ['LandXML / Civil 3D', 'prod'], ['IFC / ifcopenshell', 'prod'], [t('AutoCAD via COM', 'AutoCAD via COM'), 'prod'], ['Shapely / SciPy', 'prod'],
    ['TIN / Delaunay', 'prod'], [t('FEM 2D (anaStruct)', '2D FEM (anaStruct)'), 'prod'], ['SICRO / SINAPI / TPU', 'prod'], ['QGIS', 'prod'], ['Agisoft Metashape', 'prod'],
    [t('Drones / aerofotogrametria', 'Drones / photogrammetry'), 'prod'], ['Civil 3D .NET API', 'prod'], ['GeoPandas / pyproj', 'prod'],
    ['rasterio / GDAL', 'proj'], ['COLMAP / OpenMVS', 'proj'],
  ] },
];

// ---------------------------------------------------------------- education
export const education = {
  degrees: [
    { name: t('Pós-graduação em Ciência de Dados', 'Postgraduate degree in Data Science'), org: t('Descomplica (UniAmérica)', 'Descomplica (UniAmérica)'), when: t('2025 — em andamento', '2025 — in progress') },
    { name: t('Pós-graduação em Engenharia de Software', 'Postgraduate degree in Software Engineering'), org: t('Descomplica (UniAmérica)', 'Descomplica (UniAmérica)'), when: t('2023 — 2024', '2023 — 2024') },
    { name: t('Bacharelado em Engenharia Civil', 'B.Sc. in Civil Engineering'), org: t('Universidade Federal de Viçosa (UFV)', 'Federal University of Viçosa (UFV)'), when: t('2018 — 2023', '2018 — 2023') },
  ],
  courses: [
    { name: 'Machine Learning Specialization', org: t('Stanford Online / DeepLearning.AI', 'Stanford Online / DeepLearning.AI'), when: t('concluído', 'completed') },
    { name: 'CS50x: Introduction to Computer Science', org: t('Harvard University', 'Harvard University'), when: t('concluído', 'completed') },
    { name: 'Deep Learning Specialization', org: t('DeepLearning.AI', 'DeepLearning.AI'), when: t('em andamento', 'in progress') },
    { name: 'Agentic AI', org: t('DeepLearning.AI', 'DeepLearning.AI'), when: t('cursado, sem certificado', 'audited, no certificate') },
    { name: 'Building and Evaluating Advanced RAG', org: t('DeepLearning.AI', 'DeepLearning.AI'), when: t('cursado, sem certificado', 'audited, no certificate') },
  ],
  other: [
    { name: t('Medalha de Prata na OBMEP', 'Silver medal, OBMEP'), org: t('Olimpíada Brasileira de Matemática', 'Brazilian Mathematics Olympiad'), when: t('2017', '2017') },
    { name: t('Medalhas de Bronze na OBMEP', 'Bronze medals, OBMEP'), org: t('Olimpíada Brasileira de Matemática', 'Brazilian Mathematics Olympiad'), when: t('2014, 2015 e 2016', '2014, 2015 and 2016') },
    { name: t('Inglês avançado', 'Advanced English'), org: t('EF SET 82/100 (C2 Proficient)', 'EF SET 82/100 (C2 Proficient)') },
    { name: t('Português', 'Portuguese'), org: t('Nativo', 'Native') },
  ],
};

// ---------------------------------------------------------------- UI strings
const ui = {
  pt: {
    metaTitle: 'Vinícius Magno · Engenheiro de Software e IA para infraestrutura',
    metaDescription: 'Engenheiro civil (UFV) e engenheiro de IA e software. Agentes com tool use, RAG, servidores MCP, visão computacional e plataformas FastAPI + React em produção para engenharia de infraestrutura.',
    jobTitle: 'Engenheiro de Software e IA',
    skip: 'Pular para o conteúdo',
    navLabel: 'Seções', menu: 'Menu', langLabel: 'Idioma',
    ids: { about: 'sobre', projects: 'projetos', career: 'trajetoria', stack: 'stack', education: 'formacao', contact: 'contato' },
    nav: [['sobre', 'Sobre'], ['projetos', 'Projetos'], ['trajetoria', 'Trajetória'], ['stack', 'Stack'], ['contato', 'Contato']],
    heroTag: 'Remoto, Brasil',
    heroTitle: 'Construo software e IA para quem projeta estradas, pontes e cidades.',
    heroLede: 'Sou engenheiro civil pela UFV e hoje engenheiro de software e IA na Manta Associados. Coloco em produção agentes com tool use, RAG, servidores MCP, visão computacional e plataformas FastAPI + React, do arquivo DWG ao deploy.',
    ctaProjects: 'Ver projetos', ctaContact: 'Falar comigo',
    cmdBoot1: 'Regenerando modelo… curvas de nível a cada 2 m.',
    cmdBoot2: 'Digite PROJETOS, TRAJETORIA, STACK ou CONTATO. AJUDA lista todos.',
    cmdPrompt: 'Comando:', cmdPlaceholder: 'PROJETOS', cmdHint: 'Navegue pelo site digitando o nome de uma seção e pressionando Enter.',
    aboutTitle: 'Sobre',
    photoAlt: 'Retrato de Vinícius Magno sorrindo, de camiseta cinza.',
    photoCap1: 'VP-01', photoCap2: 'Vinícius Magno',
    aboutParas: [
      'Comecei no canteiro, no cadastro e em voos de drone. Hoje escrevo o software que eu queria ter tido naquela época.',
      'Me formei em <strong>Engenharia Civil na UFV</strong> e passei pelo cadastro imobiliário de uma prefeitura, coordenando equipe, processando ortomosaicos e automatizando o que dava com Python e VBA. Depois fui para o desenvolvimento em tempo integral: dois anos num <strong>ERP Delphi em produção</strong>, com SQL pesado e um robô de release que eliminou trabalho manual.',
      'Desde janeiro de 2026 estou na <strong>Manta Associados</strong>, uma consultoria de engenharia de infraestrutura, onde concebo e opero plataformas inteiras: microsserviços, agentes de IA, RAG, servidores MCP, visão computacional, banco, autenticação e deploy. Por fora, desenvolvo produtos e sistemas para clientes, como um assistente de IA para o Civil 3D e as ferramentas de um escritório agroambiental. Em tudo isso, a diferença é que eu entendo o desenho que o software está lendo: sei o que é uma estaca, um greide, uma planilha SICRO ou um diagrama de Brückner.',
      'Gosto de problemas em que o número precisa estar certo. Por isso trato teste, avaliação e custo como parte do produto, e separo com cuidado o que já levei para produção do que só estudei.',
    ],
    boqTitle: 'Quadro de quantidades',
    boqNote: 'Medições do trabalho até novembro de 2026, contadas no código e nos registros dos próprios projetos.',
    boqCols: ['Item', 'Descrição', 'Unid.', 'Quant.', 'Origem'],
    projectsTitle: 'Projetos selecionados',
    projectsLede: 'Sistemas que resolvem problemas reais de engenharia. A maioria é interna da empresa: o código é privado, mas a arquitetura e os números estão aqui.',
    figLabel: 'FIG.',
    indexTitle: 'Lista de projetos',
    filterLabel: 'Filtrar por disciplina', filterAll: 'Todos',
    dwgPrefix: 'PRJ',
    indexFoot: 'projetos na lista. Clique numa linha para abrir os detalhes.',
    careerTitle: 'Trajetória',
    careerLede: 'Da obra ao código, uma rampa contínua: cada etapa automatizou um pouco mais o trabalho da anterior.',
    profileAlt: 'Perfil longitudinal da carreira de 2018 a 2026, subindo da graduação em engenharia civil até engenharia de IA na Manta.',
    profileAxisY: 'nível',
    profileGround: 'terreno natural: engenharia de campo',
    profileCaption: 'Perfil longitudinal da carreira · eixo horizontal em anos.',
    stackTitle: 'Stack',
    stackLede: 'Organizada como camadas de um desenho. O estado diz a profundidade: o que uso em produção, o que usei em projeto próprio e o que só estudei.',
    layersBar: 'Gerenciador de camadas',
    layersCols: ['Camada', 'Itens'],
    stateNames: { prod: 'em produção', proj: 'em projeto', study: 'estudo' },
    eduTitle: 'Formação',
    eduCols: ['Acadêmica', 'Cursos', 'Prêmios e idiomas'],
    contactTitle: 'Tem um problema de engenharia que deveria ser software?',
    contactLede: 'Estou aberto a conversar sobre vagas, projetos e parcerias em IA aplicada, plataformas e automação para infraestrutura. Respondo por e-mail ou LinkedIn.',
    contactEmail: 'E-mail',
    titleblock: {
      label: 'Carimbo da prancha',
      project: ['projeto', 'Portfólio profissional'], author: ['autor'],
      scale: ['escala', '1:1'], date: ['data', 'nov/2026'], rev: ['revisão', 'R01'],
    },
    footerNote: 'Feito à mão em HTML, CSS e Canvas. Sem template.',
    sourceLink: 'Ver o código-fonte',
  },
  en: {
    metaTitle: 'Vinícius Magno · AI & Software Engineer for infrastructure',
    metaDescription: 'Civil engineer (UFV) turned AI and software engineer. Tool-use agents, RAG, MCP servers, computer vision and FastAPI + React platforms in production for infrastructure engineering.',
    jobTitle: 'AI / Software Engineer',
    skip: 'Skip to content',
    navLabel: 'Sections', menu: 'Menu', langLabel: 'Language',
    ids: { about: 'about', projects: 'projects', career: 'career', stack: 'stack', education: 'education', contact: 'contact' },
    nav: [['about', 'About'], ['projects', 'Projects'], ['career', 'Career'], ['stack', 'Stack'], ['contact', 'Contact']],
    heroTag: 'Remote, Brazil',
    heroTitle: 'I build software and AI for the people who design roads, bridges and cities.',
    heroLede: 'I’m a civil engineer from UFV, now an AI and software engineer at Manta Associados. I ship tool-use agents, RAG, MCP servers, computer vision and FastAPI + React platforms to production, from the DWG file to the deploy.',
    ctaProjects: 'See projects', ctaContact: 'Get in touch',
    cmdBoot1: 'Regenerating model… contours every 2 m.',
    cmdBoot2: 'Type PROJECTS, CAREER, STACK or CONTACT. HELP lists them all.',
    cmdPrompt: 'Command:', cmdPlaceholder: 'PROJECTS', cmdHint: 'Navigate the site by typing a section name and pressing Enter.',
    aboutTitle: 'About',
    photoAlt: 'Portrait of Vinícius Magno smiling, wearing a grey t-shirt.',
    photoCap1: 'VP-01', photoCap2: 'Vinícius Magno',
    aboutParas: [
      'I started on job sites, in property records and flying drones. Now I write the software I wish I’d had back then.',
      'I graduated in <strong>Civil Engineering at UFV</strong> and worked in a city’s property-records office, leading the team, processing orthomosaics and automating what I could with Python and VBA. Then I moved into full-time development: two years on a <strong>production Delphi ERP</strong>, with heavy SQL and a release bot that removed manual work.',
      'Since January 2026 I’ve been at <strong>Manta Associados</strong>, an infrastructure engineering consultancy, where I design and run whole platforms: microservices, AI agents, RAG, MCP servers, computer vision, databases, auth and deploy. On the side, I build products and client systems, such as an AI assistant for Civil 3D and the tools of an agri-environmental office. In all of it, the difference is that I understand the drawing the software is reading: I know what a station, a vertical alignment, a SICRO cost sheet or a mass-haul diagram is.',
      'I like problems where the number has to be right. So I treat testing, evaluation and cost as part of the product, and I’m careful to separate what I’ve shipped from what I’ve only studied.',
    ],
    boqTitle: 'Bill of quantities',
    boqNote: 'Measured work up to November 2026, counted from the code and the projects’ own records.',
    boqCols: ['Item', 'Description', 'Unit', 'Qty.', 'Source'],
    projectsTitle: 'Selected projects',
    projectsLede: 'Systems that solve real engineering problems. Most are internal to the company: the code is private, but the architecture and the numbers are here.',
    figLabel: 'FIG.',
    indexTitle: 'Project list',
    filterLabel: 'Filter by discipline', filterAll: 'All',
    dwgPrefix: 'PRJ',
    indexFoot: 'projects listed. Click a row to open its details.',
    careerTitle: 'Career',
    careerLede: 'From job site to code, one continuous grade: each step automated a little more of the work of the one before.',
    profileAlt: 'Longitudinal profile of the career from 2018 to 2026, rising from civil engineering school to AI engineering at Manta.',
    profileAxisY: 'level',
    profileGround: 'natural ground: field engineering',
    profileCaption: 'Career longitudinal profile · horizontal axis in years.',
    stackTitle: 'Stack',
    stackLede: 'Organized like the layers of a drawing. The state shows depth: what I use in production, what I’ve used in my own projects and what I’ve only studied.',
    layersBar: 'Layer properties manager',
    layersCols: ['Layer', 'Items'],
    stateNames: { prod: 'in production', proj: 'in a project', study: 'studied' },
    eduTitle: 'Education',
    eduCols: ['Academic', 'Courses', 'Awards & languages'],
    contactTitle: 'Got an engineering problem that should be software?',
    contactLede: 'I’m open to talking about roles, projects and partnerships in applied AI, platforms and automation for infrastructure. Reach me by email or LinkedIn.',
    contactEmail: 'Email',
    titleblock: {
      label: 'Drawing title block',
      project: ['project', 'Professional portfolio'], author: ['author'],
      scale: ['scale', '1:1'], date: ['date', 'Nov 2026'], rev: ['revision', 'R01'],
    },
    footerNote: 'Hand-built in HTML, CSS and Canvas. No template.',
    sourceLink: 'View the source',
  },
};

export default { site, quantities, featured, index, profile, roles, layers, education, ui };
