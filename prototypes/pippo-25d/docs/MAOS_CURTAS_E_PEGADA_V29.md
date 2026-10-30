# Mãos curtas e pegada — revisão 29

30/10/2026. O responsável rejeitou as dobras da implementação v28 e pediu somente a mão e um pequeno trecho de braço, mesmo sem alcançar as teclas distantes. A baqueta/malheta deve ajustar seu comprimento, sem alongar a mão. Esta decisão substitui a direção anatômica v28.

## Implementação

- Reutiliza a folha original de mãos aprovadas v27, sem regeneração nem alteração do arquivo. Recorta somente mão/pulso e suaviza a entrada do pequeno trecho de braço. Transformação rígida com escala uniforme: retirada toda a malha de cotovelo, seus triângulos, cache e dois ossos.
- Limite de movimento junto ao corpo, inclusive lateral, independente da distância da nota. Mãos abertas no teclado e mão de ataque do pandeiro; fechadas para cabos e apoio do aro.
- Bateria e xilofone: pivô da pegada no encontro de polegar/indicador, eixo diagonal espelhado, rotação da mão inteira acompanhando o cabo. Palma atrás da haste; polegar/indicador voltam à frente numa máscara curta. A ponta traseira da baqueta passa pela pegada. Mão não fica pintada por cima de toda a haste.
- Altura de repouso das mãos da bateria/xilofone elevada para junto do corpo. Comprimento do utensílio ajustado ao alvo, com espessura constante e cabeça própria de baqueta ou malheta. Chocalho usa a mesma composição de pegada.
- Pandeiro menor e junto à barriga, com mão esquerda no aro e direita na pele dentro do alcance curto.
- Teclado preserva som, luz e multitoque de todas as oito teclas. Contato visual da mão com teclas fora do alcance não é prometido, conforme pedido explícito. A interface explica essa escolha em “Sobre esta versão”.
- Pés pintados, banco e camada do pedal da v28 preservados. Não foram substituídos por geometria procedural.
- Cache de scripts muda para `compact-grip-29`, marcador DOM `data-hands=compact-art-29`.

## Referências consultadas

Decisão visual: mãos naturais, leitura de silhueta e agrupamento de dedos, conforme AnimSchool, “Hand Posing Basics”: https://blog.animschool.edu/2025/05/09/hand-posing-basics/ .
Pegada simétrica e pivô polegar/indicador: Vic Firth, introdução à bateria: https://ae.vicfirth.com/wp-content/uploads/FA-Drumset-Introduction.pdf ; Yamaha, “A Guide to Proper Stick Grips”: https://hub.yamaha.com/music-educators/instruments/perc/a-guide-to-proper-stick-grips/ .

São referências de construção, não certificação de qualidade profissional nem prova de aprovação da animação. O alcance variável dos utensílios é uma estilização solicitada, não uma demonstração literal de técnica instrumental.

## Verificação

`bash scripts/verify-v23.sh`: sintaxe JS, suítes CJS e verificações Python de áudio/arte aprovadas. Anatomia verifica 960 alvos; geometria verifica 69 cenários em 320/390/940 px, com 48 contatos ativos precisos e 3 verificações de pedal. Teste de contato do teclado respeita a exceção nova, sem esconder alongamento como contato exato.

Navegador remoto: cinco instrumentos inspecionados; ataques de caixa/chimbal e notas extremas do xilofone. Sem teste físico de Safari/iPhone, sem medição de FPS/latência e sem aceite visual do responsável. Fontes históricas, atividades futuras e documentação do jogo completo preservadas.

Destino: https://pippoworld-preview.vercel.app/ . Publicação e commit são conferidos separadamente; não usar o Site antigo como link desta revisão.
