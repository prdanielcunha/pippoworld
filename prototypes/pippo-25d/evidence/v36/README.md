# Inspeção da revisão 36

Código: `b1eacb1b6d7e694d864a06fcc99d9702523f5b27`.
Branch: `fix/hand-motion-shaker-v36-20261031`.
Vercel: `dpl_FCuEbi228KZ4kPGM7CB2n7x5j2am`, preview (target null).
Jogo: https://pippoworld-preview-pe4cxdj07-danielcunha-projects.vercel.app/
QA: https://pippoworld-preview-pe4cxdj07-danielcunha-projects.vercel.app/__qa-v36.html

Chrome remoto, iframe 390 × 844: chocalho, bateria e xilofone observados em contato, rotação máxima e retorno. Teclado em rotação máxima e em toques normais após retomar o jogo; pandeiro com a mão direita em golpe e esquerda em apoio. Chocalho também inspecionado em 320px, bateria em 940px. Não se observou corte horizontal na barriga, banco duplicado, cabeça azul ou separação entre cabo e mão nesses quadros. A mão muda de orientação/posição, enquanto a base do corpo é idêntica. A captura é real do navegador, sem retoque.

O teste real de raster executa 21 poses: pixels centrais da barriga imóveis, alfa conectado entre ombro e mão, corpo igual entre expressões. 100 combinações de pose exercitam deslocamento visível das mãos e transformação rígida comum de chocalho/cabo/pegada. A geometria musical mantém 483 quadros, 69 cenários e contatos/pedal em três larguras. `verificacao.txt` guarda a execução completa com saída 0 de `bash scripts/verify-v23.sh`. Blobs de fonte/arte enviados ao GitHub conferidos com os hashes locais.

Sem teste em Safari/iPhone físico, medição de latência/FPS, revisão sonora/educativa final ou aceite visual do responsável. Não declarar perfeição artística com base nesses testes. Main não foi modificada nem promovida.
