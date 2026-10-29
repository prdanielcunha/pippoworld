# Mundo Pippo — continuidade de desenvolvimento

Checkpoint de 28/10/2026. Este documento guarda decisões e estado técnico para trocar de conversa. Não é uma transcrição literal do chat nem um aceite final do jogo. Leia a versão mais recente na branch `main` do GitHub.

## Prompt para colar em outra conversa

Continue o desenvolvimento do Mundo Pippo de onde paramos, sem reiniciar nem substituir a identidade aprovada. Sou Daniel, não sei programar ou modelar e não tenho orçamento para serviços pagos. Preciso que você execute o trabalho, valide visualmente e salve as entregas no GitHub.

Repositório: https://github.com/prdanielcunha/pippoworld

IMPORTANTE: a raiz do repositório contém o protótipo antigo. O jogo atual está em `prototypes/pippo-25d/`. Comece lendo `PIPPO_ATUAL.md`, o `AGENTS.md` aplicável, este documento, e os arquivos `docs/IDENTIDADE_PIPPO.md`, `docs/ESTADO_PRODUCAO.md` e `docs/ESTRATEGIA.md` dentro dessa pasta. As especificações DOCX e as artes originais também estão salvas nela; não peça tudo de novo antes de procurar.

Jogo publicado: https://pippo-prova-25d-20261027.balmythyme13.chatgpt.site/

Pippo usa as imagens originais aprovadas, em 2,5D. Preserve cabeça, bochechas, olhos, bico, penas e proporções. Não volte ao Blender procedural, ao perfil gerado rejeitado ou à montagem de pés e pernas separados. Não sobreponha duas poses inteiras de caminhada: isso pode parecer três patas. Não declare a caminhada fluida: ainda tem quatro poses originais e precisa de intermediários consistentes.

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

Buildless HTML/JS. Ordem dos scripts: `interaction.js`, `sprite-rendering.js`, `app.js`, `canonical-art.js`, `music-audio.js`, `activities.js`, `character-controls.js`. Cache-buster da presente entrega: `motion-continuity-16`. Máscaras: `continuous-neck-7`.

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
