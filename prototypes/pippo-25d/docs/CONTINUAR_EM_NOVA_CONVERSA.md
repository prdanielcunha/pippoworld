## Revisão prioritária 28 — braços dobrados e pé original da bateria

30/10/2026. Proposta de braços curtos e dobrados aprovada pelo responsável. Atlas integrado com mãos abertas/fechadas aplicado aos cinco instrumentos, ossos com comprimento fixo e cache por pose. Bateria reutiliza o pé/tornozelo pintado original, com pedal registrado e camada atrás das peças; removida a perna procedural. Referência, fonte e hashes em `dist/assets/music-anatomy-v28/`; detalhes e limites em `docs/BRACOS_E_PEDAL_V28.md` no protótipo. Não restaurar o braço reto da v27. Validação técnica concluída; sem teste físico no iPhone nem aceite da animação pelo responsável. Destino: `https://pippoworld-preview.vercel.app/`.

## Atualização prioritária — mãos aprovadas, revisão 27, 30/10/2026

A v26 foi rejeitada visualmente pelo responsável: desenhava mãos geométricas em vez de usar a imagem aprovada. A v27 integra **a própria folha PNG reenviada**, preservada byte a byte, em `dist/assets/hands-approved-v27/`: abertas para teclado/pandeiro e fechadas para baquetas/malhetas/chocalho. Não substituir por curvas amarelas nem restaurar o renderer rejeitado. Decisão, origem, implementação e limites em `docs/MAOS_APROVADAS_V27.md` dentro do protótipo. Destino desta tarefa: `https://pippoworld-preview.vercel.app/`; antigo Site separado. Sem teste físico no iPhone ou aceite final do responsável.

## Checkpoint atual — versão 25, 30/10/2026

Esta seção prevalece sobre os registros históricos abaixo. Base v24 preservada; retorno musical até repouso, soltura silenciosa e recuperação de notas sustentadas em acordes. Ver [RETORNO_MUSICAL_V25.md](RETORNO_MUSICAL_V25.md) e [CORRECAO_MUSICA_V24.md](CORRECAO_MUSICA_V24.md). Perna do pedal, anatomia final e iPhone físico seguem pendentes. Site e GitHub são sincronizados separadamente.

## Checkpoint mais recente — versão 23, 29/10/2026

Esta seção prevalece sobre os checkpoints históricos abaixo. Contatos musicais articulados por ataque; entrada no banco interrompível; expressões completas; fases de passagem e malha limitada da caminhada com parada gradual. Ver [POLIMENTO_V23.md](POLIMENTO_V23.md), os prompts e o roteiro de teste físico. As 19 suítes e as validações de recursos passaram; 69 contatos passaram no Chromium remoto em três larguras. Não houve teste em iPhone físico nem aceite visual final. O jogo continua em 2,5D e as atividades futuras permanecem na estratégia integral.

# Mundo Pippo — continuidade de desenvolvimento

**Estado atual: versão 22 — bateria com disposição refinada, novas poses completas de tocar e regar, água até a terra e abertura gradual da flor. Arte e som anteriores preservados. Ver POLIMENTO_V22.md. Novas poses ainda aguardam avaliação do responsável.**

Checkpoint de 29/10/2026. Este documento guarda decisões e estado técnico para trocar de conversa. Não é uma transcrição literal do chat nem um aceite final do jogo. Leia a versão mais recente na branch `main` do GitHub.

## Prompt para colar em outra conversa

Continue o desenvolvimento do Mundo Pippo de onde paramos, sem reiniciar nem substituir a identidade aprovada. Sou Daniel, não sei programar ou modelar e não tenho orçamento para serviços pagos. Preciso que você execute o trabalho, valide visualmente e salve as entregas no GitHub.

Repositório: https://github.com/prdanielcunha/pippoworld

IMPORTANTE: a raiz do repositório contém o protótipo antigo. O jogo atual está em `prototypes/pippo-25d/`. Comece lendo `PIPPO_ATUAL.md`, o `AGENTS.md` aplicável, este documento, e os arquivos `docs/IDENTIDADE_PIPPO.md`, `docs/ESTADO_PRODUCAO.md` e `docs/ESTRATEGIA.md` dentro dessa pasta. As especificações DOCX e as artes originais também estão salvas nela; não peça tudo de novo antes de procurar.

Jogo publicado: https://pippo-prova-25d-20261027.balmythyme13.chatgpt.site/

Pippo usa os recortes transparentes do pacote v2 enviado em 29/10/2026, derivados dos desenhos originais aprovados, em 2,5D. Não reaplicar máscaras de papel aos atlas em `assets/clean-v2/`. Preserve cabeça, bochechas, olhos, bico, penas e proporções. Não volte ao Blender procedural, ao perfil gerado rejeitado ou à montagem de pés e pernas separados. Não sobreponha duas poses inteiras de caminhada: isso pode parecer três patas. Não declare a caminhada fluida: ainda tem quatro poses originais e precisa de intermediários consistentes.

As últimas entregas corrigiram a meia bola duplicada, resíduos claros, bochecha cortada, emenda do pescoço; depois alinharam o toque à silhueta desenhada, mantiveram sentar/descansar até outra ação, evitaram piscada automática por cima de expressões e acrescentaram respiração discreta da figura inteira. Preserve essas correções e teste suas regressões.

Continue priorizando a qualidade visual do andar, giros e transições, com testes comparáveis antes de trocar a versão publicada. Depois avance as brincadeiras previstas nos documentos, sem esquecer música, jardim, amigos, cuidados, bola/basquete, percursos, blocos, água/barquinho e histórias opcionais. Não prometa sucesso de mercado nem confunda teste técnico com validação no iPhone.

Trabalhe em etapas completas, aproveite o que já está aprovado e evite gastar cota gerando o personagem de novo. Ao terminar cada entrega, atualize os registros, publique a versão validada no mesmo Site preservando o público atual e copie código, artes, testes e documentação para o GitHub. Deploy do Site não sincroniza o GitHub automaticamente. Informe exatamente o que mudou, o que foi verificado e o que ainda falta.

## Onde está cada coisa

| Recurso | Local |
| --- | --- |
| Código atual no GitHub | `prototypes/pippo-25d/dist/` |
| Testes atuais | `prototypes/pippo-25d/tests/` |
| Documentos e decisões atuais | `prototypes/pippo-25d/docs/` |
| Fontes DOCX | `prototypes/pippo-25d/project_sources/` |
| Folhas originais aprovadas | `dist/assets/canon/` dentro do protótipo |
| Histórico Git completo até a revisão 13 | `backups/pippo-25d-historico-2026-10-28.bundle.part01` e `.part02` |
| Restauração desse histórico | `python3 backups/restaurar-historico.py`, depois `git clone` conforme instrução impressa |
| Entregas posteriores à revisão 13 | Commits posteriores na `main` do GitHub e histórico do Site |

O pacote histórico em duas partes é um checkpoint imutável da revisão 13. As revisões posteriores são arquivos abertos e commits no GitHub; não confundir a data do pacote com o estado atual da pasta. Os manifestos datados também são fotografias daquela entrega.

## Publicação e ambiente

Site existente: `appgprj_6ae1365f002c819181664fab9d7beb12`. Público atual: public; conferir com `get_site` antes de publicar. Manifesto: `.openai/hosting.json`, estático `dist`. Não criar outro Site.

Na conversa de origem, a fonte editável do Site estava em `/workspace/sites/pippo-prova-25d`; esse caminho pode não existir em uma nova sessão. Recupere pelo conector Sites ou pelo GitHub conforme o ambiente. Não execute o helper do Site sobre a raiz antiga inteira do repositório `pippoworld`. Sites e GitHub têm históricos distintos; preservar ambos e sincronizar explicitamente a pasta atual.

Ler a skill Sites antes do fluxo. Usar helper de fonte antes de editar e para empacotar/push; credenciais apenas em memória/stdin, nunca no Git. Publicar o arquivo correspondente ao commit exato. Verificar o resultado nativo do deploy. Na nuvem, prévia pelo `sites-preview`; navegador via ferramenta disponível. Não improvisar outro servidor de preview contra instruções do ambiente.

GitHub: usar o conector conectado de `prdanielcunha`. Confirmar o SHA atual de `main`; acrescentar/atualizar somente os caminhos do protótipo e documentos de continuidade, preservando arquivos antigos e alterações novas do usuário. Criar commit filho do atual e atualizar referência com SHA esperado, sem force. Conferir árvore remota por SHA/tamanho de cada arquivo. Uploads grandes pelo conector têm limite de requisição de 16 MiB; se necessário, dividir pacotes com verificação SHA-256, sem fracionar as imagens que o jogo carrega.

## Arquitetura e invariantes

Buildless HTML/JS. Ordem dos scripts: `interaction.js`, `sprite-rendering.js`, `app.js`, `canonical-art.js`, `music-audio.js`, `activities.js`, `character-controls.js`. Cache-buster e máscaras da presente entrega: `contact-contours-18`.

`canonical-art.js` recorta folhas aprovadas em canvas e prepara/cacheia sprites. `scripts/reference-metadata.py` analisa pixels e grava somente JSON de máscaras/registro, sem alterar PNG/JPG original. `tests/canonical-art.cjs` confere os hashes das fontes.

Expressões usam cabeça original completa mais corpo sem cabeça, com colar estendido, transparência gradual e limite pela silhueta do tronco abaixo da ancoragem. Compor em uma única superfície cacheada para mover juntos; nunca restaurar corte genérico em 87% da cabeça. Respeitar a bochecha da piscadinha. Não recortar à força o pescoço em uma faixa horizontal estreita.

Bola: a bola solta pintada nas poses observar/devolver/alcançar é excluída pela máscara, incluindo sua faixa clara. Durante receber/segurar, a bola pintada permanece e a bola CSS fica escondida. Não desenhar duas bolas. Rega, música, pausa, sair da atividade e aba oculta cancelam trabalho pendente; não enfileirar intenções.

Toque atual: `PippoInteraction.hitRendered` usa o alpha do sprite realmente desenhado e inverte escala, espelhamento, rotação, respiração e deslocamento; transparência não é corpo. Há tolerância pequena na borda para o dedo. O repouso deitado usa região de cabeça própria. A captura mantém carinho longo até soltura/cancelamento. Não voltar a usar somente elipses da imagem antiga para os sprites canônicos.

Sentar e descansar têm `persistent:true` e terminam por nova intenção, não por temporizador. Respiração altera minimamente a superfície inteira, ancorada no chão; está desativada em movimento reduzido. Ela não adiciona quadros à caminhada. Piscada automática só no repouso frontal, sem substituir expressão, caminhada, perfil ou bola. A aproximação do olhar usa tempo em milissegundos, não fração fixa por frame.

## Verificação da presente entrega

Testes: `node tests/rendered-hit.cjs`, `node tests/inputs.cjs`, `node tests/canonical-state.cjs`, `node tests/canonical-art.cjs`, `node tests/art-refinement.cjs`, `node tests/ball-play.cjs`, `node tests/activities.cjs`, `node tests/music-audio.cjs`, `node tests/sprite-rendering.cjs`. Sintaxe: `node --check` nos JS alterados.

Provar no navegador: descanso continua sem timeout e acorda ao tocar no desenho; chão vazio continua destino; carinho distingue cabeça/barriga, preserva captura e pescoço; expressão escolhida não é substituída por piscada automática; pausa/retomada sem sons atrasados; bola única; andar nas duas direções preservado. Inspecionar imagens, não confiar só em asserts.

Limites: sem teste em iPhone físico/Safari, sem medição real de FPS/latência e sem teste com famílias. Quatro poses de caminhada ainda discretas; giro por vistas, poses sociais com articulação incompleta e sem voo. Timbres de protótipo sintetizados, não gravações acústicas finais. O inventário completo de pendências está em `ESTADO_PRODUCAO.md`.

## Produto e decisões que não podem se perder

24–36 meses, brincadeira livre, toque simples, sem precisão ou reflexo obrigatório. Proposta: companheiro de descobertas musicais no quintal; diferencial ainda é hipótese a validar, não promessa de liderança. Sem culpa, punição, pressão, anúncios, compras, conta infantil, câmera, microfone, telemetria ou API paga. Histórias opcionais. Preservar Mimi/vaca, Tico/pintinho, Belinha/ovelha, Lolo/coelho; sons naturais corretos e licenciados, sem inventar voz de coelho. Bento/urso de brinquedo é expansão posterior.

Distinguir planejado, implementado, verificado e validado. Não alterar silenciosamente especificações originais. A decisão posterior de 2,5D foi aprovada apesar da proposta inicial de 3D; não reiniciar uma modelagem malsucedida por ler apenas a especificação antiga.


### Giros a partir da vista visível — revisão 15

Continuação da versão 14, sem regeneração de arte. Corrige o giro desnecessário ao retomar o mesmo sentido depois de uma chegada: o perfil direito não passa mais pelo quarto esquerdo/frente para caminhar à direita (e vice-versa). A inversão durante o giro começa na vista efetivamente exibida; mudar apenas a distância preserva o progresso do giro. O giro usa vistas adjacentes originais, 80 ms por vista, sem deslocamento durante a sequência. Perfis intermediários são preparados antes de habilitar a interação. Parar no ponto atual cancela um giro pendente.

Verificação: 11 suítes Node aprovadas, incluindo `tests/turn-continuity.cjs` (dez pares vista/direção, retomada, retarget, inversão, pivô, movimento reduzido e interrupções). Sintaxe dos três JS alterados conferida. Comparação no Chromium remoto com 24 capturas determinísticas dos mesmos instantes: retomada do perfil direito, inversão aos 200 ms e caminhada/chegada à esquerda. Evidências em `evidence/pippo-giros-comparacao-v15.jpg` e `evidence/pippo-inversao-comparacao-v15.jpg`. Para repetir: `python3 scripts/review-turns.py`, abrir `/__review.html` na prévia suportada, clicar Comparar versões; depois executar `python3 scripts/review-turns.py --clean` antes de empacotar. A página de ensaio não é publicada.

A caminhada conserva as quatro poses, a cadência e os recortes da versão 14. Não há interpolação de patas, sobreposição de personagens ou nova modelagem. Partida/parada e atuação entre poses continuam discretas: esta entrega melhora a coerência dos giros e comandos, não conclui a fluidez do andar. Próxima prioridade: ensaio de intermediários consistentes da caminhada, aprovado visualmente antes da integração. Safari/iPhone físico, FPS e latência reais continuam sem validação. Todo o inventário de atividades permanece vigente.


### Continuidade de velocidade ao mudar destino — revisão 16

Continua a versão 15. A rota agora recebe a velocidade corrente quando o destino muda no mesmo sentido, preservando posição e fase dos passos. O perfil de velocidade tem entrada contínua, trecho de percurso e frenagem até zero. A partida normal sem velocidade herdada mantém matematicamente a curva da versão 15. Destinos muito próximos limitam a velocidade de entrada para frear sem ultrapassar o alvo; inverter o sentido zera a entrada para o giro. Redimensionamento também preserva velocidade quando há percurso restante e cancela giro sem rota.

Doze suítes Node aprovadas, incluindo `tests/motion-continuity.cjs`: continuidade de velocidade, quatro tamanhos, dois sentidos, frenagem próxima sem recuo/ultrapassagem, chegada exata, posição/fase preservadas, pausa, interrupção por carinho e equivalência em partições simuladas de 30/60/120 FPS. Esses testes não medem FPS/latência de aparelho. Sintaxe de `app.js` e `interaction.js` conferida.

Comparação no Chromium remoto antes de substituir a publicação: mesma posição inicial, mesma troca de destino e instantes 0/50/100/200 ms. Aos 50 ms após a troca, v15 percorre 1,66 px e a candidata 7,94 px; aos 100 ms, 6,65 e 15,80 px. São deslocamentos da simulação, não latência de toque nem uma nota de qualidade. Evidência: `evidence/pippo-retarget-v16.jpg`. Reprodução: `python3 scripts/review-retarget.py`; abrir `/__retarget.html` na prévia suportada e clicar Comparar caminhada. Remover o ensaio com `python3 scripts/review-retarget.py --clean` antes de publicar.

Ensaio de arte: uma geração nativa baseada em `assets/canon/movement.jpg` e `views.png`, seguida de uma correção direcionada das patas. Ambos os resultados repetiram fases de contato e não resolveram a alternância entre apoio próximo/distante. **Rejeitados para integração**. Nenhum desenho gerado entrou em `dist/`, nenhuma fonte aprovada foi alterada e a caminhada permanece com quatro poses. Não usar estes ensaios como novos recursos aprovados. Evitar repetir a mesma abordagem sem mudar o método de produção; mais células semelhantes não formam uma caminhada completa.

Próxima prioridade visual: produzir e aprovar fases de passagem/avanço dos pés anatomicamente distintas, em ensaio com apoio verificável, mantendo perfil e proporções originais. A partida/parada visual ainda é discreta; esta revisão elimina o reinício de velocidade ao mudar destino, sem concluir a animação. Todas as atividades e pendências da tabela continuam preservadas. Safari/iPhone físico e validação com famílias permanecem pendentes.


### Limpeza do fundo nas bordas e poses baixas — revisão 17

Correção motivada pela captura do responsável no iPhone: a cobertura de um pixel não removia toda a mistura do fundo marfim nos recortes. A busca da cor da borda também podia escolher o próprio pixel contaminado. Agora os metadados guardam a cor do papel por linha da folha original; o renderizador estima a cobertura da borda contra esse papel e toma a cor de uma região interna estável. A correção fica em uma faixa estreita do contorno, é preparada uma vez por sprite em cache e não usa filtro no personagem a cada frame. Não houve geração, regravação ou recoloração dos originais.

A inspeção das 49 máscaras também revelou chão marfim incorporado à pose agachada e a duas vistas superiores. Essas regiões de chão e fragmentos desconectados foram excluídos. A vista de topo tem limite próprio, pois os vazios sob as asas começavam mais acima; olhos e bochechas das vistas de frente e expressões não recebem remoção global por cor. A composição gradual do pescoço e a exclusão da bola solta permanecem.

Verificação: 13 suítes Node aprovadas; `tests/reference-matte.cjs` lê os originais via Pillow e confere todos os 49 recortes. Nesta execução, 1.611.058 pixels internos protegidos mantêm RGBA idêntico; a medição conservadora de amostras claras de borda vai de 612 a 166 (inclui detalhes claros legítimos, não equivale a percentual de perfeição visual). Alpha não se expande e pelo menos 97% da área de alpha das mesmas máscaras permanece após a descontaminação. `tests/art-refinement.cjs` verifica dez amostras concretas de chão residual removidas. Hashes das folhas originais, bola única, pescoço/bochechas, carinho pela silhueta, giros, destinos, música e jardim continuam passando. Sintaxe dos JS alterados conferida.

Revisão visual no Chromium remoto: 49 recortes sobre fundos azul escuro/rosa, comparação ampliada do agachamento e 12 expressões montadas com corpo/pescoço. Evidências: `evidence/pippo-contornos-comparacao-v17.jpg` e `evidence/pippo-expressoes-completas-v17.jpg`. Reproduzir com `python3 scripts/review-contours.py`; abrir `/__contours.html` e `/__assembled.html` na prévia suportada. Usar `--clean` antes de empacotar; as páginas e cópias temporárias não são publicadas. Fixture anterior do filtro preservada somente em `tests/fixtures/sprite-rendering-v16.js` para comparação.

Esta revisão trata recortes, não completa a animação de caminhada. Continuam quatro poses e todas as atividades/documentos anteriores. A captura enviada é evidência de uso no iPhone; esta correção foi conferida no navegador remoto, sem afirmar reteste físico no aparelho. Cache e máscara: `paper-matte-17`.


### Correção dos resíduos ainda visíveis na evidência 17 — revisão 18

O responsável apontou corretamente que a própria comparação entregue na revisão 17 ainda continha fundo no recorte. A revisão 17 não resolveu integralmente esse defeito. Sua galeria reduzida e a medição de cores claras não foram suficientes para aprovar as áreas de contato. A ampliação de quatro vezes mostrou sombras e papel com reflexo quente junto à barriga/patas em agachar, deitar, sentar e duas vistas superiores. Esses pixels não podem ser removidos de modo confiável apenas pela cor marfim.

A máscara usa agora contornos de contato e vazios explícitos nas coordenadas da folha original para essas cinco poses. O preenchimento não pode voltar a fechar os espaços entre barriga, bico e patas. A vista de topo preserva a região real dos olhos/face creme e as patas laranjas; regiões de fundo sob a cabeça são tratadas separadamente. Os originais permanecem inalterados. São refinamentos de máscara, sem novas imagens, modelagem ou mudança da caminhada.

Revisão visual: regiões de contato ampliadas em fundo escuro, comparação direta v17/correção na mesma escala. Evidência `evidence/pippo-residuos-comparacao-v18.jpg`. A comparação mostra os resíduos reais da v17 à esquerda e os limites corrigidos à direita, sem confundir páginas de referência opacas com o sprite final. Reprodução: `python3 scripts/review-residuals.py`; abrir `/__residuals.html`; clicar Comparar regiões de contato; executar `--clean` antes de publicar. A inspeção inicial usou ampliação de quatro vezes; a evidência comparativa usa duas vezes.

Testes: 13 suítes Node, incluindo novas amostras negativas de papel refletido/quente em cinco poses e amostras positivas da barriga, pés, bico e região dos olhos no topo. O teste de matting geral continua cobrindo os 49 recortes. Não usar o número de suítes nem a redução de amostras claras como prova de que não existe qualquer resíduo em todos os aparelhos. A evidência visual deve ser inspecionada antes de concluir. Safari/iPhone físico ainda sem reteste desta correção.

Cache e máscaras: `contact-contours-18`. Preservar bola única, bochechas, pescoço, carinho pela silhueta, velocidade e giros. Caminhada mantém quatro poses; os ensaios de animação rejeitados continuam fora do jogo. Todo o inventário de atividades permanece.


## Recortes enviados pelo responsável — versão 19, 29/10/2026

O pacote `Pippo-Recortes-Limpos-v2.zip` passa a ser a fonte de recorte do personagem. Foram comparadas as variantes normal, borda firme e 4×. Selecionada a normal na resolução nativa: elimina manchas de borda e resíduos observados, preserva melhor a suavidade das penas e não acrescenta o peso da ampliação. As 36 poses completas e 12 expressões com corpo são empacotadas em dois atlas PNG sem redimensionamento, regravação de pixels ou nova máscara. Não se aplica `prepareReferencePixels` a esses atlas. As folhas originais e suas máscaras históricas permanecem intactas para referência.

Expressões usam as figuras completas de 400×400 enviadas, com âncora (200,390). Não remontar rosto e torso nem acrescentar outro colar. As poses conservam a margem de dois pixels, âncoras, escala por folha, contatos dos pés, espelhamento e alpha real para carinho. Preservados bola única, repouso persistente, prioridade das expressões, giros e continuidade de velocidade. A caminhada continua com quatro poses e não está concluída.

Verificação: 14 suítes Node, incluindo `clean-cutouts.cjs`, que confere hash dos atlas, RGBA de cada uma das 48 imagens, dimensões/âncoras e executa o carregador/renderizador para expressões, caminhada e repouso sem segunda máscara. Suítes de máscaras antigas continuam como proteção do histórico; suas métricas não medem os recortes novos. Comparação visual antes da publicação: oito pares v18/nova em mesma escala, 48 figuras renderizadas no jogo sobre azul/rosa e teste de piscadinha, pausa, caminhada, bola e troca entre quintal/música/jardim no Chromium remoto. Evidências `evidence/pippo-v19-*.jpg`. Não foi realizado teste em iPhone físico, benchmark de FPS nem revisão auditiva real.

Detalhes, origem e reprodução em [RECORTES_V19.md](RECORTES_V19.md). Nenhuma atividade futura foi removida. Deploy do mesmo Site e backup GitHub continuam sendo operações separadas.


## Recuperação das bochechas apagadas — versão 20, 29/10/2026

A captura enviada mostrou parte real do rosto transparente ao lado dos olhos. O defeito vinha da máscara anterior e continuou no pacote v2; a conferência da versão 19 não o identificou corretamente. O novo tratamento recupera RGB das folhas originais somente nas regiões delimitadas de bochecha/face. Brilhos creme dentro do contorno recebem alpha opaco mesmo quando têm cor parecida com papel. Fundos e vãos são preservados por limites específicos de pose; não aplicar fechamento global da silhueta.

A recuperação é feita na preparação dos atlas, por `scripts/restore-face-regions.py` e `scripts/import-clean-cutouts.py`, sem novo filtro durante os frames. Nas 12 expressões completas só os trechos recuperados do rosto são transferidos; corpo, emenda do pescoço e posição permanecem. Caminhada, penas, cauda, bola, entrada, giros e atividades mantidos. As quatro poses da caminhada são idênticas ao pacote v2, sem alteração.

Verificação: 15 suítes Node; a nova `tests/face-restoration.cjs` exige alpha 255 e RGB original em amostras concretas do defeito, inclusive um brilho creme muito próximo da cor do papel; confere transparência em vãos cabeça/asa e 3.992.265 pixels protegidos idênticos à v19 (interior opaco e exterior das regiões recuperadas). Os testes de máscaras antigas seguem apenas como histórico. Comparação ampliada v19/correção no Chromium remoto e galeria das 48 figuras em fundos contrastantes. Evidências `evidence/pippo-v20-*.jpg`.

Reprodução: `python3 scripts/import-clean-cutouts.py /caminho/do/zip-extraido`; depois `python3 scripts/review-face-restoration.py`, abrir `/__face-review.html` na prévia suportada, usar Ampliar o rosto apontado e Conferir todas as 48 figuras. Executar `python3 scripts/review-face-restoration.py --clean` antes de publicar. As folhas em `assets/canon/` não foram alteradas. Mais detalhes em `docs/ROSTO_V20.md` (nesta pasta docs: `ROSTO_V20.md`).

Não foi feito reteste em iPhone físico nem medição de FPS. A resolução e as quatro fases de caminhada continuam limitadas; esta correção não conclui a animação. Todas as atividades previstas, os documentos e as pendências permanecem. Cache: `face-restoration-20`. Publicação e backup GitHub são operações separadas.

## Entrega v21 — música

Ver [MUSICA_V21.md](MUSICA_V21.md) para fontes, tecnologia, testes e pendências. A síntese histórica e o painel externo descritos acima foram substituídos. Jardim, preferências e demais atividades permanecem. Publicar e backup GitHub são operações separadas.

## Etapa de polimento v22

Ver [POLIMENTO_V22.md](POLIMENTO_V22.md). Novas poses completas derivadas da referência, sem alterar atlas aprovados da v20. Kit refinado, gestos musicais, regador nas asas e ciclo de três segundos no jardim. Não declarar animação contínua nem teste físico. Todos os requisitos futuros permanecem.

## Atualização v24
Retomar `docs/CORRECAO_MUSICA_V24.md`. A captura rejeitada era da v23: pé solto vinha de um sprite adicional em primeiro plano e as asas de repouso estavam cruzadas. V24 remove esse pé, corrige mãos/baquetas e enquadramento. Auditoria de 69 contatos passou, mas não é certificação de anatomia/fluidez. Ainda falta perna real acionando o pedal. Não restaurar o pé separado nem a experiência rejeitada de dividir a asa em segmentos. Preservar som imediato, multitoque, pausa e modo livre.
