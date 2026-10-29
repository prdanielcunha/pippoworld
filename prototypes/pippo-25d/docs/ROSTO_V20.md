# Bochechas e regiões claras apagadas — revisão 20

29/10/2026. A captura do responsável mostrou o cenário verde dentro da face. A versão 19 preservou pixel a pixel o recorte enviado, mas esse recorte já herdava partes apagadas do original. Preservar pixels defeituosos não é validação da forma do rosto. A conferência anterior foi insuficiente.

## Correção

O importador agora chama `restore-face-regions.py` antes de empacotar os atlas. O módulo delimita uma faixa de face por pose nas coordenadas da folha original. O invólucro convexo dos pixels opacos fornece um limite local para as concavidades indevidamente apagadas. A diferença em relação ao papel ajuda a identificar as bordas; entre amostras reais da face, o intervalo interno é opaco, preservando os brilhos creme que têm RGB parecido com o papel. Os pixels recuperados usam o RGB do mesmo ponto da folha original. Não há geração nem desenho de outra cabeça.

Os limites ficam acima do queixo/asa. Ensaios que também preenchiam papel entre cabeça e asa foram restringidos antes da publicação; amostras negativas protegem esses vãos em virar e pular. Pixels já opacos do pacote v2 permanecem idênticos. O atlas é montado uma vez, sem essa análise em runtime. Nas expressões, transfere-se apenas a mudança de alpha/RGB do rosto para a figura completa, com as mesmas coordenadas do pescoço já aprovadas.

`sprites.json` mantém hash do PNG enviado, hash do RGBA enviado e hash do RGBA preparado, além da região e contagem de amostras recuperadas. A alegação de igualdade integral com o PNG enviado era da v19; a revisão 20 muda deliberadamente as regiões apagadas.

## Verificação

- 15 suítes Node, incluindo a suíte nova de recuperação. Em `front`, as amostras (154,115), (154,123), (156,133) e (151,131), no canvas com margem, exigem alpha 255 e RGB exato da folha original. O ponto (156,133) é creme muito claro e impedia uma correção baseada só em cor.
- Vãos reais em `turnLeft` (150,133) e `jump2` (220,129) exigem alpha zero. Nenhum fechamento global deve voltar a preenchê-los.
- Fixtures compactas guardam máscaras e hashes da v19 para conferir 3.992.265 pixels que não podem mudar: detalhes opacos e exterior das regiões de reparo. As quatro poses de caminhada mantêm o hash RGBA enviado.
- Comparação ampliada do defeito no Chromium remoto, à mesma escala e sobre azul escuro. Galeria com 48 figuras renderizadas pelo jogo, revisada sobre fundos contrastantes. Evidências em `evidence/pippo-v20-rosto-comparacao.jpg`, `pippo-v20-galeria-1.jpg` e `pippo-v20-galeria-2.jpg`.

As suítes antigas que testam a máscara do papel não verificam a imagem nova; são regressão do histórico preservado. Não usar números de testes ou pixels protegidos como substituto da inspeção visual. Sem reteste em Safari/iPhone físico. As limitações da resolução original, da caminhada e das transições continuam.
