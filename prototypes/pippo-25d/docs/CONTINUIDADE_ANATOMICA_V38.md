# Continuidade anatômica e bateria — revisão 38

01/11/2026. As capturas reais rejeitam a v37/37a por linha de pescoço, antebraço do chocalho separando e aparência rígida. Não considerar os testes anteriores como aceite do responsável.

## Causas e correções

A troca da cabeça usava `a[:365]=head[:365]`, descartando o pescoço de cada expressão e produzindo uma junção horizontal. V38 conserva os pixels opacos originais de rosto, cabeça, pescoço e início dos ombros até y399. A transição passa para o peito opaco entre y400–500, em cor premultiplicada para não introduzir halo nas bordas. Banco, pés e corpo inferior originais preservados.

V37 dividia braço em capa fixa e colar móvel. Mesmo conectados por alfa, seus contornos podiam se sobrepor como duas peças no giro. V38 usa uma única superfície de braço completo e um campo contínuo de deformação: fixo no ombro e progressivo até a mão. A maraca, cabo e pegada permanecem rígidos entre si. Não há recorte de antebraço rodando sobre um braço separado. Os ombros são integrados à silhueta do corpo original; fontes v23/v36/v37 permanecem intactas.

A malha tem vértices compartilhados; WebGL desenha os triângulos em uma chamada sem as linhas de recorte de Canvas. Há fallback Canvas para indisponibilidade/perda de contexto. Rosto/corpo não passam pelo shader nem por leitura/regravação de pixels no navegador. A figura inteira recebe uma respiração mínima e coerente (escala de ±0,3%) usando o mesmo sistema de coordenadas de mãos, braços, corpo e utensílios. Movimento reduzido a desativa.

A sobreposição da baqueta corrigida na v37a é mantida. O punho é pequeno; o utensílio alcança a peça sem alongar o braço.

## Bateria

Os toms ficam à frente do baterista e montados acima do bumbo, com o tom agudo à esquerda do músico (direita da imagem frontal), médio à direita e surdo ao lado direito. Caixa do lado esquerdo do músico, com chimbal mais alto. Cinco tambores e dois alvos de pratos anteriores preservados, sem adicionar peças mudas. A ordenação agora coloca os toms diante da parte superior do bumbo.

Referências primárias: manual Stage Custom Birch Yamaha, https://usa.yamaha.com/files/download/other_assets/6/336036/StageCustomBirch.pdf (dois toms acima do bumbo, altura do surdo/caixa, chimbal); https://hub.yamaha.com/music-educators/instruments/perc/drum-set-configuration/ . A foto enviada pelo responsável orienta o enquadramento, sem copiar a fotografia para o jogo.

Arte vetorial original nova em `dist/assets/drum-kit-v38/`: aros, canoas/tensores, pele com profundidade, cascos, casco metálico da caixa, frente vertical do bumbo e dois discos no chimbal. Script reproduzível `draw-drum-shells-v38.py`. Sons gravados e sete alvos anteriores permanecem.

## Verificação e limites

`music-continuity-v38.cjs`: pixels opacos da cabeça/pescoço iguais à fonte nas três expressões, 99 poses com níveis positivos/negativos, caminho de alfa real entre ombro e pegada, nenhum triângulo dobrado/invertido. Testes legados permanecem para as fontes antigas e não são confundidos com teste da v38. Inspeção dos quadros de composição em `review-continuity-v38.cjs`.

Não declarar ausência absoluta de falhas: inspeção remota não substitui Safari físico, desempenho físico, revisão sonora/educativa nem aceite do responsável. Main deve permanecer na v31 até decisão posterior; v38 fica em branch e preview isolados. Registros de publicação e inspeção serão anexados a `evidence/v38/`.
