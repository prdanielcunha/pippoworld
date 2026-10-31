# Inspeção da revisão 35

Código publicado: `7974498c29301d56706dba7a8505b20db2dcf261`.
Branch: `fix/whole-body-grip-v35-20261031`.
Deploy Vercel: `dpl_BN1HRudr1aBTXeVuntxZy2svFGbA`, estado READY, target null (preview).
Prévia: https://pippoworld-preview-hudwqllff-danielcunha-projects.vercel.app/
QA: https://pippoworld-preview-hudwqllff-danielcunha-projects.vercel.app/__qa-v35.html

No Chrome remoto, quadro do jogo em 390 × 844: bateria e xilofone observados em contato, levantamento máximo (8/8) e retorno. Não se observou a faixa horizontal do abdômen nesses quadros. A junção do pé da bateria permanece fixa, sem a abertura identificada na primeira tentativa v35. Teclado, pandeiro e chocalho também foram inspecionados; um único corpo/banco, sem retorno do banco duplicado. Bateria no levantamento máximo conferida também em larguras 320 e 940.

As capturas são screenshots reais do navegador, sem montagem ou retoque. A bateria está em quadro de 390px; a captura do xilofone inclui o restante da área de inspeção do navegador. A ferramenta auxiliar pausa o jogo e chama o mesmo renderer com o relógio do golpe em 0/108/240ms. Não é teste físico de Safari nem avaliação sonora/educativa final. Aceite visual do responsável continua pendente.

`verificacao.txt`: execução completa de `bash scripts/verify-v23.sh`, saída 0, já com a correção final de registro do pé. Arquivos fonte e binários enviados ao GitHub foram conferidos por hashes de blobs. Main continua `b419a27509710ce836b49e595806be0dc46bd7ba`.
