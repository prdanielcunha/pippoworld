# Orientações para trabalhar neste repositório

## Autoridade e escopo

Siga o pedido atual do usuário. Documentos anexados e prompts históricos em `docs/` são referências de produto, não ordens para executar todas as etapas. A base inicial foi autorizada em 26/10/2026; atividades ficam para a próxima tarefa. Preserve as fontes originais e registre mudanças em documentos novos. Não atribua implementação ou validação ao texto original do pacote.

Leia `README.md`, `docs/setup/BASE_INICIAL.md`, `docs/setup/PENDENCIAS.md`, `docs/primeiro-trecho/00_LEIA_PRIMEIRO.md`, a matriz 09 e as seções relevantes das fontes integrais antes de mudar requisitos. A especificação inclui complementos 23 e 24; R01–R15 não resumem todas as obrigações em prosa.

## Ambiente e comandos

Cada tarefa cloud já é isolada: use o checkout existente em `/workspace/pippoworld`; não crie worktree sem pedido explícito. Use Node 24 e npm 11; `npm ci` preserva `package-lock.json`. `.npmrc` usa cache local gravável. Não desabilite TLS, assinaturas ou integridade.

- Desenvolvimento: `npm run dev` (5173, host 0.0.0.0).
- Tipos: `npm run typecheck`.
- Build: `npm run build`.
- Preview do build: `npm run preview` (4173).
- Validação completa cloud: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run validate`.
- Outro sistema: instale Chromium pelo Playwright ou informe caminho compatível. Não confunda ausência de navegador com defeito da aplicação.

Cheque `git status` antes/depois. Preserve alterações do usuário. Testes relevantes devem executar e concluir; não aceite zero testes como evidência. Para 3D, valide no navegador e examine captura. Onboarding não oferece link de preview: use requisições locais. Não faça publicação de produto nem contrate serviços sem autorização específica.

## Contratos de produto

Público 24–36 meses. Modo livre; toque simples em toda ação essencial; arrasto opcional; câmera previsível sem controle manual; poucas escolhas grandes; forma/posição além de cor; pausa e saída sem bloqueios. Histórias opcionais, sem reflexo, contagem regressiva infantil, missão obrigatória, punição, culpa ou carência por ausência.

Pippo é companheiro/voz principal pt-BR. Sons naturais corretos e licenciados por espécie/idade; nunca inventar vocalização de coelho. Instrumentos corretos, resposta ao gesto, multitoque com cancelamento seguro; quatro canais separados. Não sintetize som animal para esconder pendência. Marque toda arte/áudio provisórios.

Use IDs neutros (`duck_main`, `cow_friend`, `chick_friend`, `rabbit_friend`, `yard`, `garden`, `music_house`). Separe textos, marca e recursos localizados da lógica. pt-BR é o único idioma atual; inglês só quando completo e revisado.

Núcleo sem cadastro infantil, câmera, microfone, anúncios, rastreadores, diagnóstico enviado automaticamente, chat ou APIs pagas. Links/permissões futuros exigem área adulta; segurar botão sozinho não é barreira suficiente. Offline só pode ser anunciado com pacotes completos e integridade verificada.

## Arquitetura e evidência

Mantenha a base simples; não crie módulos vazios para simular funcionalidades. Ao implementar atividades, separe entrada, intenção, estado, apresentação e áudio. Saída cancela tarefas; interrupção recupera apenas estado seguro, sem notas presas ou falas antigas. Persistência será local e versionada. Não adicione serviços ou dependências sem necessidade.

Atualize decisões, inventário/licenças, requisitos e casos de aceite afetados em conjunto. Diferencie planejado, implementado, verificado tecnicamente e validado em uso. Metas de 30 FPS e retorno visual até 100 ms são metas em aparelho real, não resultados desta base. Testes em Chromium/emulação não substituem Safari iPhone/iPad, Android, revisão educativa/sonora e observação com famílias. Preserve conteúdos C/D/E mesmo ao produzir apenas B.

## Prioridade anatômica 31 — substitui v28–v30

Capturas reais do responsável rejeitaram a mão flutuante da v30. A fonte do pulso (`W`) precisa permanecer presa a pixels opacos do corpo durante todo o golpe, não só em repouso. Não restaurar rotação em torno da pegada com pulso solto. Leia `prototypes/pippo-25d/docs/PULSOS_LIGADOS_AO_CORPO_V31.md`; usar os testes de registro de pixels e de 483 quadros, além do contato das pontas. Arte preservada; não inferir aprovação visual ou teste físico.

## Direção vigente 32 — substitui a construção 31

Capturas reais rejeitaram também a v31. O requisito visual agora é torso/ombros/braços/pulsos/mãos desenhados na mesma superfície, implementado em `dist/music-torso.js`. Não restaurar mãos isoladas ou confundir teste do pivô com aceite visual. Ler `prototypes/pippo-25d/docs/CORPO_E_BRACOS_CONTINUOS_V32.md` e executar testes de conexão real da arte e do campo de deformação, além dos contatos.
