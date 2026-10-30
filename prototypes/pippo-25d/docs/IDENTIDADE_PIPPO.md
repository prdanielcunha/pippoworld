## Atualização prioritária — mãos aprovadas, revisão 27, 30/10/2026

A v26 foi rejeitada visualmente pelo responsável: desenhava mãos geométricas em vez de usar a imagem aprovada. A v27 integra **a própria folha PNG reenviada**, preservada byte a byte, em `dist/assets/hands-approved-v27/`: abertas para teclado/pandeiro e fechadas para baquetas/malhetas/chocalho. Não substituir por curvas amarelas nem restaurar o renderer rejeitado. Decisão, origem, implementação e limites em `docs/MAOS_APROVADAS_V27.md` dentro do protótipo. Destino desta tarefa: `https://pippoworld-preview.vercel.app/`; antigo Site separado. Sem teste físico no iPhone ou aceite final do responsável.

# Pippo — identidade e arte aprovada

**Estado atual: versão 22 — bateria com disposição refinada, novas poses completas de tocar e regar, água até a terra e abertura gradual da flor. Arte e som anteriores preservados. Ver POLIMENTO_V22.md. Novas poses ainda aguardam avaliação do responsável.**

28 de outubro de 2026. Corrige o uso de recursos gerados que alteravam o personagem de perfil. Este documento complementa a estratégia e o inventário completo, sem declarar animações finalizadas.

## Fonte de verdade

Os arquivos em `dist/assets/canon/` são cópias byte a byte das folhas anexadas pelo responsável: `model.png` (três vistas), `views.png` (doze vistas), `movement.jpg` (andar/pular/agachar), `contact.png` (contato/giros/repouso) e `expressions.png` (doze expressões). Não foram regenerados nem regravados. Não usar `walk-cycle-v2.png` nem `walk-rig-v1.png` como referência de identidade; foram rejeitados. Não existem requisições desses dois recursos nesta implementação.

Prioridade: três vistas para a estrutura; doze vistas para os ângulos; folhas de movimento e contato para as ações; folha de expressões para o rosto. As pequenas variações entre desenhos aprovados não autorizam inventar outra cabeça ou normalizar o desenho esticando sua largura.

## Invariantes visuais

- Duas penas curvas no topete; preservar a largura, curvatura e implantação do desenho fonte.
- Cabeça arredondada, pescoço curto e barriga de filhote. Escala proporcional e fixa por folha, sem normalizar cada pose pela altura variável de asas, pés ou topete.
- Olhos castanhos grandes, contorno de pálpebra e sobrancelhas da referência; não substituir por olhos genéricos.
- Bochechas creme com volume integrado ao bico. Bico largo e arredondado; sua abertura faz parte da expressão.
- Exatamente as patas e asas desenhadas na fonte. Não cobrir erros com linhas laranjas ou sombras; não criar conectores de pernas.
- Penas das asas e cauda, cor e textura preservadas no interior das máscaras.

## Implementação verificável

`scripts/reference-metadata.py` analisa as imagens e escreve **somente JSON** com contornos, regiões e âncoras. A máscara exclui o fundo e rótulos; mantém buracos internos preenchidos para preservar olhos, boca e bochechas. O trecho inferior de figuras em pé rejeita uma ponte de papel/sombra entre os pés. Sentar e descansar preservam os contatos da barriga com o chão.

`prepareReferencePixels` aplica cobertura de um pixel ao contorno em runtime, mantendo o RGB do interior. Cores externas da franja são propagadas da silhueta, evitando franjas de papel. Cada expressão tem um ponto de pescoço medido pela menor largura da silhueta entre mandíbula e ombros. A cabeça é mantida até esse ponto, com cobertura suave de quatro pixels no encaixe. A camada `body_front` remove a cabeça e as bochechas antigas do corpo, preservando apenas o pescoço e o tronco. As duas camadas compartilham o mesmo pivô. Isso substitui o corte genérico de 87%, que cortava a piscadinha e deixava pontas no pescoço. O arquivo original inteiro permanece no comparador.

`canonical-art.js` carrega as quatro folhas usadas para animação, prepara os recortes quando usados e desenha o personagem com escala uniforme por folha. A caminhada usa as quatro poses **originais**, com espelhamento para o sentido oposto. O repouso lateral usa as vistas esquerda/direita originais. O giro mostra vistas intermediárias antes de começar o deslocamento; não é uma rotação 3D contínua. O alinhamento e limites impedem que poses largas saiam da tela.

## Ações integradas

- Caminhada, salto e agachamento vindos da folha original.
- Sentar, descansar, erguer-se, acenar e olhar atrás, acessíveis no painel de gestos.
- Doze expressões completas acessíveis no painel; retornam ao repouso. Carinho na cabeça usa a expressão aprovada com olhos fechados e bico relaxado. Barriga usa a risada.
- Observação, recebimento, sustentação e devolução na brincadeira da bola. A bola CSS chega antes da pose de receber e é ocultada enquanto a própria ilustração mostra a bola nas asas, evitando duas bolas simultâneas. Movimento reduzido remove o giro decorativo, conservando o ponto de recebimento.
- Música e jardim preservados. As reações musicais usam o mesmo acervo aprovado.
- Comparador contém as cinco folhas originais e a referência inicial do quintal.

## Limites que não podem ser ocultados

Esta etapa corrige a **origem dos desenhos e amplia as poses**, sem garantir animação cinematográfica. Quatro poses de caminhada e quatro de salto/agachamento são posições-chave; ainda faltam intermediários consistentes, deformação controlada e transições contínuas. Sentar/descansar/acenar são poses temporizadas, não clipes articulados completos. O espelhamento não substitui um turnaround tridimensional. Não há voo, fala sincronizada ou modelo 3D.

Não voltar a gerar o personagem inteiro para obter cada gesto. Qualquer arte nova precisa partir da referência original e passar por comparação de cabeça, bico, olho, topete, proporções e patas antes de entrar no jogo. A mera existência de duas patas em uma estrutura matemática nunca será aceite visual.

## Evidências

`tests/canonical-art.cjs`: hashes dos originais, inventário de poses, validade das máscaras, RGB interno preservado e ausência de carregamento das artes rejeitadas. `tests/canonical-state.cjs`: giro sem deslocamento, troca de intenção, repouso lateral, interrupção, retorno de expressões e uma única bola. Regressões de gestos, áudio, jardim e bola mantidas. Revisão visual no Chromium remoto, sem medição física de Safari/iPhone ou aceite final de animação pelo responsável.

## Refinamento a partir das capturas do responsável

- Exclui geometricamente a bola solta das poses observar/devolver/alcançar, inclusive a faixa creme; preserva as asas amarelas na sobreposição. A maior componente conectada não bastava porque a bola encosta no personagem em algumas poses.
- Remove os vazios de papel preenchidos sob a asa e resíduos claros do chão junto aos pés.
- Recua a máscara um pixel antes da cobertura; a cor da franja vem de pixels internos, evitando carregar o fundo marfim original para a borda. O RGB do interior opaco permanece preservado.
- Encaixe individual das doze expressões e corpo sem a mandíbula antiga; elimina o corte reto que atingia a bochecha da piscadinha.
- Revisão das doze expressões em grade sobre fundo contrastante e inspeção das poses com e sem a bola. A página interna de revisão não integra a publicação.
- `tests/art-refinement.cjs` verifica amostras da bola/faixa excluídas, bochecha preservada e ausência da mandíbula antiga na camada de corpo.

Essas correções tratam os defeitos de recorte enviados. Não acrescentam quadros intermediários à caminhada nem comprovam desempenho ou acabamento final no iPhone.


### Continuidade do pescoço — revisão 13

O recorte anterior terminava na linha mais estreita do pescoço e deixava uma emenda horizontal durante risada/carinho. Agora cada retrato conserva até 24 linhas adicionais do colar original. A transparência começa dez linhas antes da ancoragem e progride até o fim do recorte; abaixo da ancoragem, o colar fica limitado à silhueta real do tronco. Cabeça e corpo são compostos uma vez em uma superfície única em cache, que recebe o movimento como unidade. Não houve geração nem alteração dos arquivos de imagem originais. As doze expressões foram comparadas no navegador sobre fundo de contraste; Safari em iPhone físico continua sem validação. Esta revisão corrige a montagem, sem acrescentar quadros à caminhada.


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

## Etapa de polimento v22

Ver [POLIMENTO_V22.md](POLIMENTO_V22.md). Novas poses completas derivadas da referência, sem alterar atlas aprovados da v20. Kit refinado, gestos musicais, regador nas asas e ciclo de três segundos no jardim. Não declarar animação contínua nem teste físico. Todos os requisitos futuros permanecem.
