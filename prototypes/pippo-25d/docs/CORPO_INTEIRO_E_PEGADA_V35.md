# Corpo inteiro e pegada — revisão 35

31/10/2026. O responsável rejeitou a v34 em capturas reais: corte horizontal no abdômen de bateria/xilofone e pegada das baquetas inadequada. Os testes geométricos anteriores não detectavam esse defeito visual. V34 não possui aceite.

## Correção

`prepare-music-layers-v35.py` monta 12 figuras RGBA completas, com três expressões, mãos abertas/pegada e variante do pé da bateria. A barriga original é mantida inteira do pescoço ao quadril; braços entram por máscaras laterais com mistura em RGBA pré-multiplicado. Não há mais recorte horizontal do tronco nem dois fades de alpha sobrepostos na cintura. Cabeça/expressões, faixa central da barriga, banco e pés vêm da fonte v23. Os arquivos originais não são sobrescritos.

`music-torso.js` deforma a figura já composta. Sua saída mede 340 × 680, em vez de um torso de 340 × 230 sobre uma barriga fixa. O campo é zero nas bordas superior/inferior da área deformada. Mãos dianteiras continuam no mesmo registro/campo, sem deslocamento independente. A arte de ambos os braços é conectada; não se volta às mãos isoladas. O cache conserva limite de 24 quadros.

A pegada foi redesenhada a partir da referência v32 com `image_gen` integrado: mãos simétricas por cima da baqueta, dedos curvados por baixo e polegares junto dos indicadores. A referência com baquetas e o mestre limpo ficam em `sources/v35/`; somente braços/mãos entram no jogo. As cabeças e pés gerados não são utilizados. Contornos são individuais para cada mão; não se presumiu simetria de pixels. Removidos os furos circulares artificiais da v34. Cabos procedurais passam atrás dos dedos, registrados na pegada, e mantêm contatos com as superfícies medidas no DOM.

## Verificação reproduzível e limites

`python3 scripts/prepare-music-layers-v35.py`; `bash scripts/verify-v23.sh`. O teste novo `whole-body-v35.py` confere hashes, as 12 figuras, RGBA original de rostos/barriga central, conexão do tronco e ausência de faixa transparente. O teste da deformação cobre 81 combinações, bordas fixas e textura completa; a regressão mantém 483 quadros/69 cenários e contatos/pedal em três larguras.

`dist/__qa-v35.html` permite congelar contato, levantamento máximo e retorno usando o mesmo renderer do jogo, sem alterar o fluxo infantil. A pausa impede que o relógio da animação substitua o quadro. A inspeção remota deve incluir esses três pontos de bateria e xilofone, além de teclado, pandeiro e chocalho.

Som, multitoque, prioridade da criança, pausa/saída, bola, quintal e jardim não são reimplementados. Main não é sobrescrita nem promovida. Prévia e commit são conferidos separadamente. Teste físico em Safari/iPhone, latência/FPS e aceite visual do responsável continuam pendentes. Não usar as contagens de testes como comprovação de acabamento perfeito.
