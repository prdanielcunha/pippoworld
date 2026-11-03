# Revisão do trecho e demonstração para teste no iPhone

Registro técnico de 27/10/2026 UTC (noite de 26/10 em São Paulo). Continua a branch `dev/first-playable` e o PR #1, sem merge. Estado inicial conferido antes de alterar: árvore limpa, HEAD e remoto `e211626`, somente branches main/dev, PR aberto em rascunho. Lidos AGENTS, relatórios de implementação e contratos de produção afetados. Não houve reinício do projeto.

## Prévia publicada

**https://mundo-pippo-avaliacao-20261027.balmythyme13.chatgpt.site**

Demonstração separada hospedada com Sites, versão 1. Acesso **privado para o responsável**: abra no Safari e use a mesma conta do ChatGPT se o serviço pedir login. A política consultada tem somente o proprietário, sem visitantes externos. Não foi criada conta infantil. Nenhuma publicação existente foi alterada, nenhuma mudança na main, nenhuma contratação/ativação de cobrança.

- Commit do jogo/build: **`1e052f1606ec0646998d02e44d5cc9901315adbc`**, exibido como `1e052f1` na entrada adulta.
- Commit do snapshot estático no repositório de hospedagem: `5a10910769332df900e99bc054460271dc5848ec` (não é o SHA do código no GitHub).
- Site ID: `appgprj_6adff0b8c06881918d9efb2620f35c79`.
- Deployment ID: `appgdep_6adff443e7e08191aa7b144131f5edb3`; retorno nativo **succeeded**, URL confirmada por `get_site.current_live_url`, versão 1. Usar esses IDs para atualizar a mesma demonstração, sem criar outro Site.
- `.openai/hosting.json` da cópia de hospedagem declara static.directory = dist. O pacote contém exatamente o build estático, identidade de versão e avisos de licença, sem credenciais. Fonte de verdade do código continua o GitHub; o Site é apenas snapshot de teste.

Verifiquei primeiro a existência de prévia compartilhável: o ambiente cloud não oferece essa capacidade/URL. O repositório público declarou `has_pages=false`; `gh api .../pages` retornou Forbidden pelo proxy. O conector GitHub disponível não expõe ativação administrativa de Pages. A documentação oficial de actions/configure-pages confirma que enablement exige token administrativo diferente do GITHUB_TOKEN comum. Por isso não declarei Pages ativo nem empurrei uma branch de publicação que aparentasse resolver essa falta de capacidade. O build usa base relativa e está preparado para hospedagem estática em subpasta se Pages for habilitado no futuro, após conferir publicações existentes.

**Limite de verificação do domínio externo:** o acesso HTTP daqui falhou no CONNECT do proxy com 403, antes de chegar ao Site. Isso não é um HTTP 403 observado na aplicação nem prova de que o link falha no iPhone. A publicação foi confirmada pelo serviço, mas não houve navegação externa desse domínio a partir deste executor. Não contornei a política de rede. A primeira abertura no Safari físico pelo responsável ainda é necessária.

## Correções feitas

| Falha encontrada na revisão | Correção e evidência |
| --- | --- |
| Fontes em liberação podiam ficar fora da lista ativa e reaparecer brevemente ao retomar contexto suspenso | Mixer rastreia fontes em liberação e desconecta/interrompe todas na pausa; evita caudas antigas na retomada |
| Uma Promise de retomada atrasada podia recolocar o jogo em play depois de o responsável abrir a barreira | Revisão de tela e intenção de áudio invalidam resultados antigos. Teste segura a Promise, abre a barreira e verifica que ela não é contornada |
| Blur/ocultação só silenciavam o modo play; amostra na área adulta também precisa parar | Interrupção suspende áudio em todas as telas e pausa/estabiliza o jogo quando ativo |
| Web Audio pode entrar em estado suspenso/interrompido pelo navegador sem um blur útil | Listener de estado solicita pausa segura e gesto explícito de continuar; não presume som ativo |
| Resize/orientação durante contato podia conservar tecla pressionada | Resize/visualViewport liberam contatos/vozes e recalculam câmera/alvos |
| Controles absolutos em paisagem ignoravam recortes laterais; teclado em telefones estreitos podia ter alvos sobrepostos | CSS respeita safe-area nos controles e viewport dinâmico; margem menor em telefones mantém teclas ≥44 px nos viewports testados; largura limitada ao espaçamento entre teclas evita seleção ambígua |
| Distribuição tinha caminhos de raiz e não identificava versão de avaliação ao adulto | Base relativa Vite, aviso “Protótipo em avaliação”, SHA curto visível e build-info.json com identidade/hashes |
| Distribuição precisava preservar avisos da biblioteca 3D | LICENSE/NOTICE Apache-2.0 do Babylon incorporados em THIRD_PARTY_NOTICES.txt |

Os fluxos originais foram mantidos: entrada livre, quatro personagens/reação visual, passe de bola, jardim/regador/flor/chocalho, instrumentos, retornos contextuais, pausa/concluir e preferências adultas. Não foram inventadas gravações para preencher recursos ausentes.

## Resultado dos testes

Código executado: commit `1e052f1`.

| Execução | Ambiente | Resultado |
| --- | --- | --- |
| npm run validate | Node 24.19.0, npm 11.9.0, Debian Linux, Chromium 154.0.8037.57, WebGL por software | Tipos/build passaram; **23 testes passaram**, zero ignorados |
| Browser review: chromium | GitHub Actions, Ubuntu 24.04, Playwright 1.64.1, Chrome for Testing 156.0.8078.4 (build v1248) | **23 testes passaram**, job success |
| Browser review: webkit | GitHub Actions, Ubuntu 24.04, WebKit 27.2 (Playwright build v2370) | **22 testes passaram, 1 ignorado** por depender do protocolo CDP exclusivo do Chromium; job success |
| Auditoria do arquivo publicado | Archive exato extraído e servido em HTTP local; Chromium | **29 arquivos** com HTTP 200 e SHA-256 iguais a build-info.json, versão adulta visível, framebuffer renderizado e áudio running após gesto, zero erros JS/requisições falhas |

[Execução CI e logs](https://github.com/prdanielcunha/pippoworld/actions/runs/40427982714). As capturas de WebKit foram baixadas do artifact browser-review-webkit e examinadas. Artifact temporário expira em sete dias; capturas selecionadas e resumo duráveis ficam nesta pasta. Não somar execuções repetidas como se fossem casos diferentes.

Cobertura: entrada/modo livre, caminhos completos nas quatro proporções, personagens, bola, flor persistente, tambor/teclado/chocalho, oito frequências e sinal real via AnalyserNode, soltar/cancelar notas, glissando, contatos independentes, câmera fixa e framebuffer, preferências, barreira/erro/cancelamento, corrupção, duração, ausência de WebGL, perda e restauração reais de contexto pela extensão WEBGL_lose_context, retorno de página preservada e corrida assíncrona de áudio. Todos os arquivos de dist/assets também foram requisitados para evitar HTTP 200 de fallback HTML em lugar de JS/CSS.

O teste CDP fornece injeção de múltiplos contatos no Chromium. O teste portátil de Pointer Events usa eventos gerados por script para verificar roteamento/liberação e não representa hardware multitoque. Resize/orientação e safe-area foram verificados por viewport e variáveis CSS simuladas (inclusive 375×667); **não são teste de notch, home indicator, troca de aplicativo ou áudio num iPhone físico**. Pagehide/pageshow preservados foram gerados pelo teste; não equivalem a bloqueio real do aparelho.

Instalação local do WebKit foi tentada e bloqueada por 403 “Domain forbidden” nos hosts de download; a execução no runner GitHub resolveu essa limitação técnica. Isso valida WebKit em Linux, não Safari/iOS. O build mantém aviso de chunk principal ~1,06 MB minificado / 257 kB gzip. Desempenho, calor, bateria e latência física seguem não medidos.

Reprodução:

```sh
npm ci
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run validate
# Em máquina/CI com acesso ao download oficial:
npx playwright install --with-deps webkit
npm run test:webkit
# Snapshot identificado, apenas com código de runtime salvo na branch:
node scripts/build-preview.mjs
node scripts/verify-build.mjs
# Auditoria do pacote exato, após extrair a mesma distribuição:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/verify-preview-package.mjs <pasta-dist>
```

Scripts de verificação precisam de permissão para servidor local/navegador. O pipeline browser-review.yml usa runners Linux padrão e não publica nada; a demonstração foi publicada separadamente, com build da branch.

## Roteiro curto para o responsável no iPhone

1. Abra o link no **Safari**, faça login na mesma conta se solicitado e confira “Protótipo em avaliação” / versão **1e052f1**. Ajuste o volume físico; nenhuma permissão de câmera/microfone deve ser solicitada.
2. Comece por ▶. Entre na música diretamente pela casa, antes de regar. Toque Lolo (silencioso), tambor e as oito teclas. Segure duas teclas; solte uma por vez e confira se a outra continua respondendo.
3. Com uma nota, gire o aparelho e confira que ela é liberada. Troque de aplicativo/volte: o esperado é pausa, som interrompido e retomada somente ao tocar “Continuar”. Confira controles longe do recorte e da barra inferior.
4. Volte ao quintal, toque Pippo/bola e pause durante o passe. Retome ou conclua sem precisar guardar. Uma bola deve continuar alcançável, sem fila de passes.
5. No jardim, toque Mimi/Tico antes da rega (só reação visual nesta versão). Selecione regador e flor; observe água/abertura. Vá à música e retorne: a flor permanece aberta. Experimente o chocalho local.
6. Abra ⚙: resposta errada não deve liberar ajustes; cancelar retorna à pausa. Resolva a soma, ajuste instrumentos/redução de movimento, salve e confira persistência após recarregar. Concluir deve voltar à entrada sem cobrar outra atividade.

Para relatar defeito, basta modelo do iPhone, versão do iOS/Safari, orientação, versão mostrada e passos/resultado. Não precisamos de nome, imagem, voz ou dados da criança. Teste primeiro como responsável; revisão educativa/sonora e observação com famílias continuam separadas.

## Inventário para o Work e pendências reais

Levar estes três arquivos:

- [INVENTARIO_PRODUCAO_WORK.md](INVENTARIO_PRODUCAO_WORK.md): formatos, raízes, rigs/clipes e marcadores, 14 textos exatos, gravações naturais, sons, nomes de arquivo, integração e critérios de recebimento.
- [inventario-producao.csv](inventario-producao.csv): 50 linhas portáteis separando final pendente, provisório integrado e silêncio intencional.
- [recursos-incorporados.json](recursos-incorporados.json): caminhos, versões, origem/licença, tamanho e SHA-256 do material realmente incorporado.

Modelos/animações seguem procedurais provisórios, sem GLB/rig final. Voz pt-BR e tomadas naturais de pato filhote/vaca/pintinho **não existem ainda**; Lolo não deve ganhar vocalização inventada. Síntese de teclado/tambor/chocalho é instrumental provisória. Pipeline GLB, agenda completa de falas, efeitos de contatos, guardar chocalho, aproximação narrativa de Tico, offline completo e validações físicas/educativas/sonoras continuam pendentes. Aparelhos de 320 CSS px não recebem confirmação de alvos de 44 px: suporte mínimo definitivo depende da validação física.

Nenhum R01–R15 recebe aceite global por estes resultados. Etapas C/D/E e fontes integrais permanecem preservadas.
