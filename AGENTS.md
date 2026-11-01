## Revisão prioritária 38 — pescoço inteiro e braços como superfície contínua

V37/37a rejeitada em capturas reais: linha de pescoço e antebraço saindo do braço. A v38 preserva a cabeça/pescoço original inteiro de cada expressão até y399 e faz a transição no peito; troca capa/colar separados por uma superfície de braço com deformação contínua, em Canvas com vértices compartilhados. Respiração discreta da figura integrada. Bateria com novas superfícies vetoriais, toms à frente do baterista acima do bumbo, aros e tensores. Ler `prototypes/pippo-25d/docs/CONTINUIDADE_ANATOMICA_V38.md` a partir da raiz. Não restaurar o corte y365 ou tomar conectividade alfa por aceite visual. Main preservada, Safari físico e aceite pendentes.

## Revisão prioritária 37 — junções limpas, pulso contínuo e bateria revisada

V36 rejeitada em capturas reais: ponta reta no pulso direito e braço do chocalho emergindo do corpo. V37 usa silhuetas limpas dos braços completos e conserva as capas superiores fixas. Apenas um colar emplumado do pulso e a mão/instrumento giram; sem malha triangular nem quantização em nove poses. A camada dos braços é desenhada uma única vez, acima dos utensílios, eliminando o segundo recorte parcial sobre o punho. Bateria: cinco tambores (bumbo, caixa, dois toms e surdo), chimbal e prato; amostras reais adicionais, mão direita cruzada no chimbal e pé direito do músico no bumbo (esquerda da imagem). Ler `prototypes/pippo-25d/docs/JUNCOES_E_BATERIA_V37.md` a partir da raiz. Conferir o ciclo completo e o site, sem substituir aceite por contagem de testes. Main permanece preservada.

## Revisão prioritária 36 — mãos ativas, corpo estável

A captura real da v35 foi rejeitada: o corpo se mexia e a mão parecia travada; a pegada do chocalho estava errada. A v36 mantém barriga/banco/pés do mesmo corpo neutro, troca somente a cabeça nas expressões e elimina bob. A superfície animada contém braços completos até as mãos, presos ao ombro; o pulso gira sem mover o tronco. O chocalho tem pegada vertical própria, e cabeça/cabo/dedos pertencem à mesma arte e transformação. Não restaurar objeto girando sozinho sobre palma fixa. Ler `prototypes/pippo-25d/docs/MAOS_ATIVAS_CORPO_ESTAVEL_V36.md` a partir da raiz. Executar o teste real de raster além da geometria; inspeção remota não substitui Safari físico nem aceite do responsável.

## Revisão prioritária 35 — corpo inteiro e pegada

As capturas reais rejeitaram a v34: corte horizontal na barriga durante o golpe e pegada inadequada. A v35 prepara figuras completas antes da deformação: cabeça, barriga central, banco e pés originais preservados; braços e mãos conectados na textura. Não restaurar torso cortado de 230px sobre barriga fixa nem furos artificiais na palma. Nova referência de pegada simétrica com dedos curvados em `sources/v35/`. Ler `prototypes/pippo-25d/docs/CORPO_INTEIRO_E_PEGADA_V35.md` (a partir da raiz). Prévia isolada; main permanece na v31. Inspeção remota e testes técnicos não equivalem a aceite visual do responsável nem Safari físico.

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

## Prioridade 33 — cores e contornos

A captura da v32 foi rejeitada: cabeça azul e recortes nas mãos. Não restaurar o preparo de faces por cópia de canvas seguida de readback/putImageData. Usar PNGs derivados do mestre RGBA e máscaras dianteiras em registro com o torso. Ler CORES_E_CONTORNOS_V33.md e executar prepared-music-layers.py. Testes em Chrome não comprovam Safari físico.
