# Mãos ativas, corpo estável — revisão 36

31/10/2026. A captura real rejeitou a v35: o tronco se mexia e a mão parecia presa; o chocalho usava uma pegada de baqueta. Não registrar v35 como aprovada.

## Causas corrigidas

O campo anterior atingia também a barriga. Havia balanço vertical do personagem, e a energia trocava a figura inteira, incluindo pequenas diferenças do corpo entre expressões. A v36 elimina o balanço, mantém o mesmo corpo neutro do pescoço para baixo e troca somente a cabeça original. Barriga, banco e junção do pé ficam estáveis.

`music-torso.js` agora deforma apenas superfícies transparentes dos braços completos, do ombro até os dedos. O corpo original não entra nessa malha. O movimento gira o pulso com transição suave no pequeno trecho de braço, sem alongar membros para alcançar notas. Ombros permanecem conectados; não são recortes de mãos movidos isoladamente. O alfa nas junções é suavizado; a franja das antigas asas em repouso é mascarada para não aparecer como outro braço por baixo. Cores interiores originais do corpo permanecem.

O chocalho possui arte específica: polegar oposto aos dedos curvados em torno de um cabo vertical, com madeira visível acima e abaixo da mão. Braço, mão, cabo e cabeça do chocalho estão na mesma superfície pintada e recebem a mesma rotação. Não há mais chocalho procedural girando sozinho sobre uma palma fixa. A extração limpa do braço remove pixels da bochecha que apareciam junto à borda do instrumento ao girar. Fontes e prompts em `sources/v36/`; nenhuma cabeça/pata/banco gerados entra no jogo.

Teclado, bateria, xilofone e pandeiro usam braços ativos com o corpo estável. A tecla sustentada mantém uma pequena pressão visível; soltura faz o retorno silencioso já existente. Bateria/xilofone preservam as pontas medidas nas superfícies reais. Pandeiro conserva apoio da mão esquerda e golpe com a direita. O pé do bumbo permanece na fonte neutra, sem trocar junto com expressões.

## Verificação e limites

`python3 scripts/prepare-music-layers-v36.py` prepara PNGs sem leitura/regravação de cor no navegador. `bash scripts/verify-v23.sh` executa regressões e integridade. O teste novo `hands-only-v36.cjs` usa o rasterizador real `@napi-rs/canvas`, disponível no runtime de desenvolvimento, e confere pixels da barriga imóveis, conexão alfa entre ombro/mão e corpo idêntico entre expressões em 21 poses. É dependência de teste, não do jogo; sua ausência em outro ambiente precisa ser resolvida explicitamente. `music-torso.cjs` cobre 100 combinações e verifica que o instrumento/pegada preservam distâncias na rotação. A regressão musical mantém 483 quadros e 69 cenários em três larguras. `prepared-music-v36.py` confere hashes e exclusão de cabeça/barriga/banco/pés da camada móvel.

`dist/__qa-v36.html` congela contato, rotação máxima e retorno com o mesmo renderer. Inspeção em Chrome remoto não substitui Safari físico, medição de latência/FPS, revisão educativa/sonora nem aceite do responsável. Som/multitoque, pausa/saída, bola, quintal, jardim e demais atividades são preservados. Código e prévia ficam em branch própria; main não é promovida.
