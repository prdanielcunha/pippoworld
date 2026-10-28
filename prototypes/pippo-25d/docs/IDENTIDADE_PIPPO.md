# Pippo — identidade e arte aprovada

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
