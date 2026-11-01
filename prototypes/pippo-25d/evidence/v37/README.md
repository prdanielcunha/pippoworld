# Evidências da revisão 37

Prévia final: https://pippoworld-preview-dc3y1jap3-danielcunha-projects.vercel.app/
Código publicado: `2e358acca66c6fce27ccc43c634d9fa669655381`.
Deployment Vercel: `dpl_Ga36tJhAVvoZMPrJ5CvEx1KLddX1`, estado READY confirmado pela API.
Branch: `fix/wrist-junctions-drumkit-v37-20261031`. Main conferida em `b419a27509710ce836b49e595806be0dc46bd7ba`, sem promoção.

## Verificado

- Suite `bash scripts/verify-v23.sh` concluída com código 0 após ajustes de enquadramento da bateria/pegada. Saída em `verificacao.txt`.
- Em seguida, margem do xilofone alterada de 8% para 12%; `node tests/music-rig-geometry.cjs` passou: 525 quadros, 75 cenários, 48 contatos e três pedais em 320/390/940. Não se atribui nova execução integral da suite a essa última alteração CSS.
- Inspeção visual em Chromium remoto: teclado e pandeiro no levantamento, bateria em contato/levantamento/retorno em 390 e retorno em 940; chocalho nos extremos +8 e -8 em 390; xilofone em levantamento em 320. Após a última alteração CSS, nova prévia inspecionada em 320: xilofone separado da legenda.
- No link final, os sete botões da bateria foram acionados e a interface respondeu; pausa conferida. Isso não equivale a avaliação auditiva física.
- `bateria-preview.jpg` é captura do navegador do link final, sem retoque, durante pausa após os toques.
- `shaker-wrist-cycle.mp4` é exportação do renderer: 2,4 segundos a 60 quadros/s. Não é gravação de Safari, nem medição de FPS real.

## Pendências

Aceite visual do responsável e ensaio em Safari/iPhone físico; latência e FPS físicos; revisão educativa/sonora e uso com famílias. Testes técnicos não garantem ausência de defeitos em todos os aparelhos. As revisões rejeitadas não são consideradas aprovadas.
