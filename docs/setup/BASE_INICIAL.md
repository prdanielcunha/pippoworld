# Registro da base inicial

Data: 26/10/2026. Pedido atual: criar e validar a base executável; atividades serão desenvolvidas depois. Repositório originalmente sem commits e sem refs remotas, acesso Git autenticado existente confirmado. A autorização atual inclui escrever código/documentação, instalar dependências, criar o primeiro commit e tentar enviar `main`; não inclui publicação do jogo ou contratação.

## Incorporação e preservação

Lidos os 13 Markdown e os três DOCX do pacote `Mundo_Pippo_Pacote_Preparacao_v1_0.zip`. O corpo XML dos DOCX foi extraído e comparado com os Markdown: as fontes F01/F02 são transcrições correspondentes; o Word de preparação reúne os materiais 00–09, mais capa/índice. Conferidos também os complementos 23 e 24. Todos os 16 arquivos foram incorporados sem alteração de conteúdo, com comparação byte a byte. `LEIA_PRIMEIRO.md` do pacote está em `docs/LEIA_PRIMEIRO_PACOTE.md`; as outras pastas conservam a estrutura. O Word de preparação está em `docs/`.

Os trechos históricos “não implementar” e o prompt “implemente o jogo completo” descrevem tarefas anteriores ou futuras. São referências, e o pedido atual prevalece: esta entrega cria a base técnica. As fontes e sua rastreabilidade não foram reescritas nem receberam aceite inventado. A atualização de estado está em `PENDENCIAS.md`.

## Decisões reversíveis

| Decisão | Problema e solução | Benefício, custo e verificação |
| --- | --- | --- |
| TypeScript estrito, Vite sem framework UI | Base vazia; aplicação estática mínima | Sem backend/serviços/credenciais; tipos, build e Chromium |
| Babylon.js modular por imports diretos | Evitar CDN e dependências desnecessárias | Pacotes fixados e assets locais; teste de renderização real |
| Câmera ortográfica sem controles | Futuro público infantil não deve pilotar câmera | Enquadramento redimensionável; desktop e telefone emulados |
| Primitivas com IDs neutros | Arte aprovada ainda inexistente | Estudo descartável identificado; sem afirmar que é personagem final |
| Textos em `src/content/pt-BR.ts` | Marca provisória/localização futura | Identidade fora da lógica; apenas pt-BR oferecido |
| Pausa simples e suspensão ao perder foco | Base deve interromper renderização com segurança | Sem animações/áudio de atividade; controles adultos continuam pendentes |
| Cache npm no checkout ignorado | Cache padrão não gravável na máquina cloud | `.npmrc`, instalação normal e `npm ci` sem alterar o lockfile |

A cena contém chão, patinho geométrico e bola azul estáticos. Não existem destinos falsos, coleta de dados, serviços externos de runtime, áudio, contas, atividades ou PWA. Formato GLB e Web Audio continuam propostas não testadas nesta etapa. Pipeline definitivo, requisitos de aparelhos e orçamento de arte dependem de medições posteriores.

## Ferramentas e fontes oficiais

Versões estáveis informadas pelo `dist-tag latest` do registro npm, consultado em 26/10/2026; versões exatas no manifesto e integridade no lockfile:

- Node.js 24.19.0, npm 11.9.0 (runtime existente; `.nvmrc` e `engines` com Node 24).
- Vite 8.3.5 (aceita Node `^20.19.0 || >=22.12.0`), TypeScript 7.0.2, Babylon.js `@babylonjs/core` 9.32.0.
- Playwright Test 1.64.1; Chromium do sistema 154.0.8037.57, Linux, headless/SwiftShader.

Documentação oficial atual consultada via os repositórios oficiais, pois os sites Vite/Babylon responderam 403 à política de rede:

- [Vite: introdução, instalação manual, scripts e requisito Node](https://github.com/vitejs/vite/blob/main/docs/guide/index.md), corpo obtido via raw.githubusercontent.com.
- [Babylon.js: módulos ES6, imports diretos, Engine/Scene/câmera/luz e loaders](https://github.com/BabylonJS/Documentation/blob/master/content/setup/frameworkPackages/es6Support.md), corpo obtido via raw.githubusercontent.com. O exemplo Webpack da fonte foi adaptado ao Vite solicitado; nenhum polyfill/CDN legado foi incorporado.
- [TypeScript: tsconfig e compilação](https://github.com/microsoft/TypeScript-Website/blob/v2/packages/documentation/copy/en/project-config/tsconfig.json.md), corpo obtido via raw.githubusercontent.com.

Sites de leitura não exigem ampliar a rede do runtime. Dependências usam registry.npmjs.org, Git usa o proxy HTTPS existente. Nenhum segredo ou variável de aplicação é necessário. Não se desativou TLS nem verificação de integridade.

## Evidências e limites

Instalação inicial e reinstalação com `npm ci --no-fund --no-audit` executadas. Tipos e build executados. Auditoria npm de produção e completa: zero vulnerabilidades reportadas na consulta. Isso é resultado do registro na data, não garantia futura.

O teste inicial detectou prontidão antes da conclusão dos shaders: o marcador de primeiro frame podia anteceder o patinho. Corrigido usando `scene.executeWhenReady` antes do loop. Comparação de imagens também passou a comparar diferenças de pixels com tolerância pequena de antialiasing, em vez dos bytes PNG, que podem variar na codificação. A investigação mostrou também um contorno de foco padrão no canvas ao arrastar: removido do canvas estático, mantendo o foco visível nos botões.

Verificações finais e configuração reutilizável: registradas após a execução, abaixo. Nenhum teste físico ou com crianças foi realizado. AC01–AC40 do jogo não foram executados; os três testes técnicos da base têm escopo próprio. O build avisa sobre chunk principal acima de 500 kB (aproximadamente 1,03 MB minificado / 244 kB gzip); não é falha e não foi ocultado. Avaliar custo de carregamento em aparelhos reais na próxima etapa, antes de fixar orçamento ou ampliar arte.

## Resultado final desta etapa

- `npm ci`: concluído com lockfile, sem alteração das versões.
- `npm run typecheck` e `npm run build`: passaram; build mantém o aviso de tamanho descrito acima.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run validate`: passou (build e 3 testes).
- Após adicionar cobertura explícita da perda de foco, `npm run test:smoke` com Chromium: 3 passaram, zero falhas/ignorados. Confere cores reais de patinho/bola no framebuffer, câmera fixa por comparação visual após arrasto, pausa/continuar, pausa por blur, ausência de erros JavaScript/tráfego externo e fallback sem WebGL.
- `npm run dev`: iniciou; GET da página/módulo TypeScript respondeu e Chromium confirmou a cena pronta. Preview foi iniciado e encerrado pelos testes. Processos não devem ser presumidos ativos em outra tarefa.
- Capturas examinadas: [desktop](evidencias/quintal-desktop.png) e [telefone emulado](evidencias/quintal-telefone.png). Não há evidência de aparelho físico.
- Todos os arquivos do pacote foram conferidos byte a byte após a cópia. `git diff --check` sem erros.
- `install_script` e `start_skill` foram salvos com confirmação em rascunho de configuração do ambiente. Isso não executa scripts nem publica snapshot; revisão/salvamento e publicação do ambiente são ações da interface. Os comandos salvos foram exercitados nesta máquina.

Commit e envio remoto são informados na entrega; o histórico Git identifica a versão desta base. Publicar a configuração do ambiente não equivale a publicar o jogo em hospedagem.
