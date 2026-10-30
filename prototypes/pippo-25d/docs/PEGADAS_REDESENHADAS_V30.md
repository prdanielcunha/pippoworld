# Pegadas redesenhadas — revisão 30

30/10/2026. Durante a revisão desta tarefa, o responsável rejeitou também a mão da tentativa v29: parecia um punho colado ao utensílio. A v29 não foi publicada. Não confundir aprovação histórica da folha de mãos com aprovação desta implementação.

## Alteração final

Nova arte produzida com a ferramenta integrada `image_gen`: quatro poses específicas de pegada, duas para bateria e duas de perfil para malhetas. Origem e SHA-256 em `dist/assets/grips-v30/source.json`; PNG original preservado integralmente. O pulso é curto, o polegar acompanha o cabo e os dedos curvam sob ele, com assimetria e contorno legível. O pequeno trecho de cabo já participa do desenho; o restante é desenhado atrás da mão, sem mascarar dedos de um punho genérico.

A mão e o pulso são uma peça de escala uniforme, sem cotovelo deformado. O alcance é limitado junto ao corpo; baquetas/malhetas ajustam o comprimento. Mãos abertas da folha original têm proporção ampliada em teclado/pandeiro. A pegada do chocalho usa a nova pose, girada junto ao cabo. Pandeiro usa a mão de apoio da folha anterior, sem inserir um cabo na borda.

Não há novos serviços, bibliotecas, contas infantis ou custo de API de execução. As artes antigas permanecem no histórico. A revisão usa `relaxed-grip-30` no cache e `data-hands=relaxed-grip-30`; “Sobre esta versão” identifica a revisão 30.

## Escopo e validação

Mesma exceção explicitamente pedida: todas as notas do teclado soam e acendem, mas a mão não precisa alcançar teclas distantes. Pontas de baquetas/malhetas mantêm contato com os alvos. Som/multitoque e relógio dos ataques preservados. Pés, tornozelo, banco e camada do pedal v28 preservados.

Verificação: `bash scripts/verify-v23.sh`, incluindo sintaxe, suítes Node e integridade de artes/áudio. Geometria: 69 cenários em três larguras, 48 contatos ativos e três pedais; 960 alvos compactos. Inspeção em navegador remoto dos cinco instrumentos, com ataques e notas extremas. Sem teste físico de Safari/iPhone, medição de FPS ou aceite visual do responsável.

Referências de construção: https://blog.animschool.edu/2025/05/09/hand-posing-basics/ e https://ae.vicfirth.com/wp-content/uploads/FA-Drumset-Introduction.pdf . Não representam certificação de qualidade Disney, profissional ou aceite do jogo. A extensão variável dos utensílios é uma estilização pedida, não uma demonstração literal de técnica musical.

Destino desta revisão: https://pippoworld-preview.vercel.app/ . GitHub e deploy são conferidos separadamente. Documentação do jogo completo e atividades futuras continuam preservadas.
