# Braços dobrados e pés da bateria — v28

30/10/2026. O responsável aprovou a nova composição do teclado e pediu aplicação nos lugares necessários, revisão dos pés da bateria e salvamento integral no GitHub.

## Fonte de verdade
A proposta aprovada está preservada em `dist/assets/music-anatomy-v28/approved-keyboard-reference.png`. Não restaurar o antebraço reto esticado da v27. A folha anterior de mãos permanece preservada como referência de identidade, mas o renderer agora usa braços completos com mãos integradas, derivados dessa proposta. Origem, hashes e prompt em `source.json` ao lado dos PNGs.

## Implementação
- Cinco instrumentos compartilham a mesma anatomia: ombro, cotovelo e pulso ligados por dois ossos de 72 unidades, escalados somente com o tamanho do corpo. O alvo não aumenta o braço nem a mão.
- Atlas com quatro braços completos, abertos/fechados e esquerda/direita. A malha deforma a região articulada; a palma tem escala uniforme. Transição de alpha no ombro evita uma borda retangular. Cada lado conserva apenas o cache da pose atual, sem acúmulo de quadros.
- Teclado mais próximo do corpo e dentro do alcance; repouso em Mi/Lá. Superfícies reais continuam medidas pelo DOM. Xilofone e bateria conservam mãos próximas do corpo e usam a extensão da malheta/baqueta até a superfície.
- Pandeiro: mão fechada segura a borda; a aberta toca a pele, com levantamento limitado para não atravessar o rosto. Chocalho: cabo aparece à frente do antebraço e os dedos voltam a aparecer sobre ele; gesto curto segue o relógio de cada ataque.
- Bateria: eliminada a perna longa e o pé desenhados por curvas. O pé pintado original e seu tornozelo são extraídos da mesma figura, removidos da composição de fundo e reposicionados no mesmo registro. O pedal acompanha a posição do pé. Camada própria atrás do kit impede pé/tornozelo sobre a caixa ou a pele frontal do bumbo. O pé pode ficar parcialmente encoberto pelas peças, como numa postura sentada.
- Quintal e jardim usam figuras completas próprias, sem o renderer de antebraços retos rejeitado. Não se aplica uma substituição cega sobre essas poses; o núcleo musical foi o local necessário nesta entrega.
- `package.json` local delimita o protótipo clássico como CommonJS para que os testes Node funcionem sem herdar o ESM do protótipo 3D antigo da raiz.

## Validação
- `bash scripts/verify-v23.sh`: sintaxe de todos os JS, todas as suítes CJS e verificações de arte/áudio concluídas sem falhas.
- Anatomia: 960 alvos em duas orientações e quatro escalas, verificando comprimentos fixos e valores finitos.
- Geometria musical: 69 cenários, 66 contatos ativos, três verificações de pedal em 320/390/940 pixels; inclui limites dos ossos. Simulação sem pixels reais.
- Navegador remoto: revisão de teclado, bateria e demais instrumentos; teclado e xilofone também nas extremidades; layout de 390 pixels. Ajustes após observar cotovelos muito abertos, sobreposição do pé à caixa e chocalho oculto pelo antebraço.
- Sem teste em iPhone físico, sem medição de FPS ou certificação de latência. Malha 2,5D, não esqueleto 3D; futuras atividades e animações gerais seguem no plano completo.

## Aceite e continuidade
A imagem conceitual tem aprovação do responsável. A implementação animada desta revisão ainda precisa de avaliação visual dele no dispositivo. Não tratar a aprovação da imagem como aceite de todos os quadros, Safari ou bateria inteira. Nunca substituir as artes por formas geométricas simples nem alongar os braços para alcançar peças distantes.

Destino de publicação desta conversa: `https://pippoworld-preview.vercel.app/`. O ChatGPT Site antigo permanece com fluxo e histórico separados.
