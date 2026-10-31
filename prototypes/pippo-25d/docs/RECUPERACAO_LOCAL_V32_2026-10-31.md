# Recuperação da continuação local v32 — 31/10/2026

A captura do responsável rejeitou o encaixe de mãos da v31. A auditoria anterior cobria o GitHub e a publicação v31; não tinha localizado esta continuação sem commit em outra cópia local do mesmo repositório.

## Origem preservada

Foram encontrados 17 caminhos preparados no índice Git da cópia local anterior, ainda com HEAD em b419a27509710ce836b49e595806be0dc46bd7ba. Contêm a arte de oito figuras completas, renderer de tronco contínuo, testes e documentação v32. Um JPEG tinha modificação adicional fora do índice; foi preservado separadamente como evidência de recuperação, sem sobrescrever a versão histórica da main. A cópia de origem e seu índice não foram alterados.

SHA-256 do patch binário original do índice: 5399b2911ec75745d7dcd54b8dbfe3662363c5c733dcb5261efb9773f31f985f.

A recuperação aplica os arquivos preparados sobre a base exata v31 em uma branch separada. Não restaura os braços por dois ossos v28 nem as mãos independentes v29–v31. A arte recuperada já existia: nenhuma nova geração foi feita nesta tarefa.

## Estado de validação nesta recuperação

As 22 suítes CJS, sintaxe JS, conexão de pixels nas oito figuras, áudio, arte v22 e equivalência RGBA dos quatro mestres v23 passaram pelo agregador verify-v23.sh. O teste de torso cobre 81 combinações de levantamento com ombros fixos, ausência de inversão e cache limitado. Esses resultados não equivalem a acabamento visual, Safari/iPhone físico, FPS ou aceite do responsável.

A documentação de origem relata inspeção remota anterior da v32. Esse relato é histórico. A revisão precisa ser inspecionada novamente na prévia recuperada antes de qualquer alegação de solução final. A branch main e o alias publicado da v31 ficam preservados durante esta comparação.

## Próxima leitura

CORPO_E_BRACOS_CONTINUOS_V32.md descreve a construção recuperada. PULSOS_LIGADOS_AO_CORPO_V31.md permanece como histórico da solução rejeitada pelo responsável. A revisão 32 também aguarda aceite visual; não confundir a recuperação com aprovação.
