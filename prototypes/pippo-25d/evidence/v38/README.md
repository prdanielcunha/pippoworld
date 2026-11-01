# Evidência da revisão 38 — 01/11/2026

Código publicado: c30ae8cd5013274da283eda5f509bbf8c5ed9b51.
Prévia final: https://pippoworld-preview-oh7ss6i1z-danielcunha-projects.vercel.app/
Deployment: dpl_5Vm4hzoDDvq7ZSHUd583GxkyXY3U, READY confirmado pela API.
Branch: fix/continuous-neck-arms-v38-20261101.
Main conferida em b419a27509710ce836b49e595806be0dc46bd7ba, preservada.

## Testes e inspeção

Suite completa em verificacao.txt passou na implementação inicial da v38. Após remover a tentativa opcional de WebGL, o caminho Canvas mantido foi novamente verificado pelos testes específicos de continuidade, geometria e ritmo (verificacao-final.txt): 99 posições positivas/negativas com conexão raster real e sem triângulos invertidos; pescoço inteiro original nas três expressões; 525 quadros de contato; ataques rápidos e pausas.

Prévia inicial da v38: chocalho nos dois extremos em390, bateria em contato em390 e pandeiro levantado em320. O navegador efetivamente usou Canvas. Medição com80 chamadas ao renderer do chocalho: mediana3,20ms, p95 4,10ms; não é FPS físico nem ensaio de latência. A versão final conserva esse caminho e retira o código WebGL não usado neste navegador.

Prévia final: sete peças da bateria acionadas na interface, pausa conferida e captura bateria-preview.jpg sem retoque. A captura mostra a expressão focada com pescoço completo e os toms montados acima do bumbo.

shaker-wrist-cycle.mp4: exportação do código do renderer, 2,4s/144 quadros, incluindo expressão e respiração comum. Não é gravação de iPhone ou do navegador. O arquivo oferece evidência de movimento além de uma imagem parada.

## Limites

Aceite visual do responsável e Safari/iPhone físico continuam pendentes. Não houve avaliação educativa/sonora com famílias nem medição de FPS/latência em aparelho físico. A bateria preserva os sete alvos existentes e suas gravações; a arte foi redesenhada em SVG original, sem reutilizar a fotografia de referência.
