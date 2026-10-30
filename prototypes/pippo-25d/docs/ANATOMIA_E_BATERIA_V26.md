# Polimento anatômico e bateria — revisão 26

30/10/2026. Continuação do commit `b8b4f354` (v25), atendendo à direção aprovada pelo responsável para mãos pequenas arredondadas e braço que não cresce até o instrumento.

## Implementado nesta alteração
- As asas da performance musical são desenhadas como curvas arredondadas amarelas com contorno e pequenas pontas de penas, mantendo uma mãozinha de raio proporcional fixo. A montagem deixa de usar escalonamento da asa pintada pela distância ao alvo; a imagem original de corpo/face permanece intacta.
- No xilofone e bateria, a pegada fica limitada ao alcance definido; a malheta/baqueta é o objeto que chega mais longe até o ponto real de contato, com cabeça do instrumento em tamanho constante. A mão não aumenta para alcançar notas distantes.
- No teclado, a mão continua acompanhando a tecla efetivamente tocada; o desenho curvo não altera o tamanho da mão. Acessibilidade e multitoque existentes são preservados.
- No pandeiro, uma mão sustenta a borda e a outra toca, ambas com a mesma anatomia compacta. O chocalho usa a mesma convenção.
- Pedal passa para a lateral do bumbo; uma pequena perna dobrada laranja, conectada à postura sentada, acompanha a pressão. O pedal antigo no centro fica oculto pelo CSS já existente para a montagem musical.
- Não altera os áudios, notas, mixagem, cronômetro de gestos, assets aprovados, nem a estratégia de atividades futuras.

## Evidência e limitações
O código de geometria está separado em `dist/music-anatomy.js`; testes de alcance, tamanho e pedal em `tests/music-anatomy.cjs`. **A alteração ainda requer abrir o jogo no navegador e inspecionar quadro a quadro em tamanhos de celular e tablet; não houve teste físico no iPhone nem validação visual do responsável nesta execução.** As asas continuam estilizadas em 2,5D (não são um esqueleto 3D). Uma curva pode parecer longa em teclas extremas: verificar com a referência aprovada e refinar caso necessário.

## Próximos controles de aceite
1. Teclado: todas as oito teclas acionadas, inclusive acordes e alternância rápida, sem mãos gigantes ou separadas.
2. Xilofone: cabeça da malheta encosta na barra correta; mão fixa à pegada e retorno no ritmo real.
3. Bateria: chimbal, caixa, tom, prato e bumbo alcançam superfícies corretas; pedal lateral conectado e sem atravessar peças; nenhum golpe no bumbo com baqueta.
4. Pandeiro e chocalho: gesto acompanha 4–8 toques rápidos sem ficar atrasado, mantendo anatomia pequena.
5. Pausa, troca de instrumento, movimento reduzido, rotação de tela e retomada sem fantasmas, mãos presas ou áudio antigo.
6. Safari físico, julgamento de fidelidade pelo responsável, FPS/latência no dispositivo e atividades restantes do universo seguem pendentes. Não declarar jogo completo.
