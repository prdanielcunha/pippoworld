# Corpo e braços contínuos — revisão 32

30/10/2026. O responsável rejeitou as versões 30 e 31 em capturas reais: mãos ainda pareciam sobrepostas ao tronco e as baquetas quase desapareciam. A aprovação técnica de registro do pulso não comprovava a construção visual. Esta revisão substitui o sistema de mãos isoladas na Casa da Música.

## Mudança visual e de construção

Nova folha com oito figuras completas, criada com `image_gen` integrado a partir do Pippo original e da referência do teclado. Ombros, braços curtos, pulsos e mãos são desenhados junto ao tronco. Segunda edição remove os pequenos cabos embutidos para que as baquetas/malhetas sejam inteiramente desenhadas até suas superfícies. Dois mestres PNG e hashes preservados em `dist/assets/music-body-v32/`.

O jogo usa a figura de repouso aberta e a de pegada como duas superfícies completas de torso. Uma deformação suave da superfície inteira acompanha cada ataque; não há sprite de mão, pivô de punho independente, cotovelo por dois ossos nem alcance que alonga o braço. Pescoço/ombros permanecem fixos e o campo de deformação não inverte. As outras seis figuras ficam como referências de pose, sem alternância abrupta de corpos.

A cabeça/rosto e expressões continuam sendo desenhadas da fonte original `music-rig-v23/rig.webp`. A antiga região de tronco/asas é removida; o novo torso tem mistura curta no pescoço e termina antes do banco/pés. Pés, banco e pé registrado do pedal usam a arte existente. A camada da mão diante de teclas/cabos é uma região da mesma superfície, no mesmo registro e transformação; não recebe posição independente.

A bateria fica um pouco à frente das mãos; a figura mantém margem superior. O xilofone e o teclado têm ajuste de altura para os dedos e para deixar o cabo visível. Som, alvos multitoque e prioridade da criança preservados. A exceção já pedida permanece: o teclado não alonga o braço para alcançar todas as teclas.

## Arquivos e execução

- `dist/music-torso.js`: fonte única da superfície de torso/braços/mãos, mistura e cache limitado a 24 poses; ombros ficam fixos, lift de 24 unidades no máximo e nove níveis por mão.
- `dist/music-rig.js`: composição original de rosto/pés com torso novo e utensílios medidos no DOM; nenhum carregamento das mãos isoladas v27/v30.
- `dist/assets/music-body-v32/poses.png`: folha limpa usada pelo jogo.
- `source-with-shafts.png`: primeiro mestre, histórico de criação; não carregado pelo jogo.
- `source.json`: hashes, referências, parâmetros de registro e estado de aceite.
- Identificação/cache: `continuous-torso-32`; “Sobre esta versão” informa revisão 32.

## Verificações e limites

`bash scripts/verify-v23.sh`: sintaxe JS, suítes Node, integridade/licenças de áudio e arte. As verificações novas cobrem a conexão real dos pixels de mãos/torso nas oito figuras; 81 combinações de levantamento de duas mãos sem inversão, deslocamento de ombro ou cache ilimitado. A regressão musical continua cobrindo 69 cenários, contatos ativos e pedal. Números são verificações técnicas, não certificação de qualidade artística.

Inspeção em navegador remoto, incluindo quadro de 390 × 844: bateria, teclado, xilofone, pandeiro e chocalho; notas extremas e troca de instrumentos. A página auxiliar de QA não é enviada. Sem teste físico de Safari/iPhone, medição de FPS/latência, revisão educativa final ou aceite visual do responsável. Continua sendo animação 2,5D.

Plano completo, personagens/atividades futuras e fontes anteriores preservados. Não atribuir a uma nova imagem o aceite de todos os movimentos. Destino desta tarefa: https://pippoworld-preview.vercel.app/ ; GitHub e deploy são conferidos separadamente.
