# Bateria pintada — revisão 39

01/11/2026. O responsável rejeitou a disposição e, principalmente, o visual vetorial da v38. Esta revisão troca as sete superfícies independentes por uma única composição artística com volume, materiais, ferragens e iluminação coerentes. Não declara aceite da v38.

## Direção e disposição

Novo mestre transparente1536×1024 criado com image_gen integrado, sem copiar marcas ou fotografias. Cascos de madeira verde profundo, pele marfim, aros/tensores cromados, caixa metálica e pratos de latão escovado. A arte do Pippo v38 permanece intacta, incluindo pescoço e braços contínuos.

Dois toms montados acima do bumbo, em frente ao músico; tom agudo à direita da imagem frontal, médio à esquerda; surdo à esquerda da imagem, caixa e chimbal à direita. Crash separado à esquerda. O chimbal tem dois discos e pedal próprio. O pedal de bumbo pintado incorretamente à frente foi removido: o acionamento fica no lado do baterista, atrás da frente do bumbo.

A composição é dimensionada sem distorção (3:2), centralizada e alinhada ao alcance das mãos. Toms, caixa e surdo têm profundidades distintas, com ferragens comuns. Nomes internos preservados por acessibilidade; textos sobrepostos aos cascos foram retirados para não cobrir a arte.

## Interação

Sete botões e sons anteriores preservados. As áreas de toque abrangem pele/casco, com altura mínima44px. Coordenadas de contato medidas na imagem1536×1024 ficam em `dist/assets/drum-kit-v39/layout.json` e nos atributos dos botões. A ponta da baqueta usa a coordenada pintada, independentemente do tamanho da área tocável. Um brilho curto aparece no ponto de contato, sem deslocar toda a bateria. O carregamento da imagem faz parte do preparo musical, para não liberar os botões antes da arte.

Mestre: `sources/v39/drum-kit-master.png`; arquivo otimizado do jogo: `dist/assets/drum-kit-v39/kit.webp`. Prompts e origem: `sources/v39/README.md`. Fontes antigas preservadas, sem reset/merge em main.

## Verificação

`painted-kit-v39.py` confere transparência, hashes, sete pontos realmente sobre pele/latão do mestre e registro HTML. Testes de geometria, ritmo e anatomia conferem regressões. A inspeção do navegador deve verificar composição, pontas e seleção dos sete alvos em tamanhos estreitos e amplo. Aceite visual do responsável e Safari/iPhone físico continuam pendentes.

## Retomada e verificação — 01/11/2026

Continuação confirmada a partir de `637b488135226866275b0248a295a9b2bbfe189b`, na branch `fix/painted-drum-kit-v39-20261101`. A main continua preservada em v31. A bateria já estava integrada e salva nesta branch; o endereço estável de teste ainda apontava para a v31.

Reexecutado `scripts/verify-v23.sh` integralmente e o teste da arte v39: todos passaram. Inspeção no Chrome remoto: sete peças acionadas pela interface; composição inteira, contato e levantamento examinados na página de QA em 390 e 320 pixels, além da visualização ampla. Não constitui teste de som por audição, Safari físico, FPS no iPhone ou aceite visual do responsável.

O endereço `https://pippoworld-preview.vercel.app/` foi atualizado para a implantação pronta `dpl_D1xEnPeYUNkH4dwH8h5F8NxKe2CC`, código `637b488`. A atualização usa o mesmo build inspecionado, sem regenerar arte. A validação da bateria pintada agora integra o comando de verificação geral.
