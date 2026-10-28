# Pippo — prova visual em 2,5D

Direção de produto: [Estratégia aprovada v1.0](docs/ESTRATEGIA.md). Situação técnica e pendências desta versão estão registradas ao final deste README.

Estudo separado do jogo existente. Não altera o repositório pippoworld nem o protótipo anterior.

## Escopo
Personagem raster em um cenário de planos, piscada por composição localizada dos olhos, olhar simulado com deslocamento curto da região ocular, carinho com inclinação discreta, pausa e redução de movimento. Comparação com a arte fornecida. Sem ciclo final de caminhada, áudio, reconhecimento de fala, modelo 3D, pagamentos ou serviços em runtime.

## Arte
- `dist/assets/original.png`: referência fornecida pelo usuário, preservada.
- `dist/assets/cutout.png`: derivação produzida por ferramenta de imagens; remoção de fundo e bola, preservação solicitada de traços/pose. Pode haver diferenças generativas; ainda sujeita à avaliação do usuário.
- `dist/assets/closed.png`: derivação do recorte alterando somente olhos; no app, usada apenas dentro de máscaras oculares.

Não há garantia de igualdade pixel a pixel. Não substituir assets do jogo sem aceite visual. Não confundir esta prova com personagem completo animado.

## Execução
Site estático: servir `dist/`. Sem dependências de execução ou rede externa. Scripts: `node --check dist/app.js`.

## Verificação em 27/10/2026
Carregamento no Chromium remoto; inspeção visual de olhos abertos e fechados; ações de carinho, piscar, pausa/retomada, modo olhar, redução de movimento e diálogo de comparação conferidas. Ainda sem teste físico no iPhone/iPad ou validação com criança. Layout adaptável por CSS; sem alegação de benchmark móvel.

## Continuidade
Avaliar fidelidade do recorte e dos quadros oculares antes de produzir gestos novos. Olhar atual é uma composição limitada, não rotação anatômica. Caminhada/bola exigem novos quadros e validação de contato. A especificação original permanece preservada.

## Segunda rodada: estudos de movimento
A aparência em repouso e as ações já aprovadas foram preservadas. Foram acrescentados controles para passinhos no lugar (quatro poses em perfil), salto pequeno (preparação/impulso/ar/pouso) e agachamento (em pé/descida/agachado/subida). Um único estado de ação é executado por vez; novas escolhas substituem a ação sem fila. Pausa e comparação congelam o tempo; as ações retornam ao repouso.

`movements.png` foi gerado pela ferramenta de imagens usando o recorte aprovado e a prancha fornecida como referências. `movements.json` contém limites e sementes das regiões conexas de alpha. A aplicação isola a região principal de cada célula em canvas, descartando ruído de fundo desconectado. Os pixels de pose ficam sujeitos à revisão de identidade. A caminhada tem apenas quatro poses-chave; a alternância anatômica dos pés e a fluidez ainda não são consideradas aprovadas. Não é um ciclo final de animação.

Pendências: quadros intermediários de transição entre repouso e movimento, maior resolução das poses, melhor alternância dos pés; acenar, sentar, repousar, giros direcionais, expressões adicionais e contato com bola. Ainda não há navegação em oito direções ou giro contínuo. Os demais requisitos do jogo permanecem no escopo futuro, sem alegação de conclusão.

Verificação: carregamento dos novos assets, renderização das poses de caminhada e salto, acionamento do agachamento, pausa durante movimento, retorno e substituição de ações no Chromium remoto. Sem validação física de iPhone/Safari nesta rodada.

## Acabamento de bordas e contato
A limpeza anterior aplicava corte de alpha >220 ao contorno inteiro, perdendo cobertura parcial. `sprite-rendering.js` agora conserva o núcleo conectado, recupera até dois pixels da franja original com limite de diferença de cor, aplica cobertura suave de um pixel ao alpha e extravasa a cor do núcleo apenas para pixels externos. O RGB interno não recebe blur. Margens de três pixels evitam cortar a franja ao desenhar. O processamento é feito uma vez por pose e o resultado é reutilizado.

Canvas usa interpolação habilitada com preferência `high` e resolução ajustada ao DPR até 3, limitada a 2,4 milhões de pixels. `imageSmoothingQuality` é uma preferência que alguns navegadores podem ignorar; a suavização de alpha não depende dela. A resolução original das poses ainda limita o detalhe quando muito ampliadas.

Sombras radiais suaves: ambiente sob o corpo e contato nos trechos inferiores da silhueta, acompanhando cada pose. No quadro aéreo do salto, contatos são removidos e a projeção se torna mais larga e clara. A antiga sombra estática CSS foi desativada. Pausa congela a pose e suas sombras.

Validação: testes sintéticos de RGB interno, remoção de ruído desconectado, alpha fracionário, margem da franja e identificação de apoio; `node --check` nos dois scripts; inspeção visual da caminhada pausada no Chromium remoto. Teste físico no iPhone ainda pendente.

Referências técnicas consultadas:
- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas

## Etapa fechada: Pippo e a bola
Uma brincadeira simples reutiliza toda a arte existente, sem geração de imagem adicional ou serviço de execução pago. A bola é desenhada em CSS: alvo de pelo menos 72px, rolagem de ida/volta pelo chão e reação de piscada/carinho no meio do percurso. Ainda não representa chute nem contato anatômico. Os controles de estudo ficam recolhidos para destacar Pippo e um brinquedo.

Relógio único: pausa, aba oculta e comparação congelam bola/personagem; toques repetidos não enfileiram ações; outro gesto cancela a rolagem e recupera a bola na posição inicial. Movimento reduzido diminui o percurso e remove a inclinação. Sem pontuação, contagem regressiva, cadastro ou áudio. Poses sociais adiadas para concentrar a etapa no primeiro fluxo jogável e preservar a cota. Não é o jogo completo.

Próxima prioridade: revisar este fluxo no aparelho do responsável; depois produzir apenas as poses necessárias para uma atividade escolhida, preservando os assets aprovados. A especificação completa continua pendente além deste recorte.

Verificação desta etapa: testes de repetição, pausa/retomada, reação, retorno, cancelamento, movimento reduzido e aba oculta em `tests/ball-play.cjs`; regressão de bordas preservada. Chromium remoto: bola acionada, pausa manteve a mesma posição, retomada e carinho recuperaram o brinquedo. Inspeção visual do cenário realizada. Sem teste físico de Safari/iPhone ou validação com criança.

## Etapa A em andamento 28 de outubro de 2026

Toque simples no chão define um destino horizontal. Direita e esquerda usam a arte aprovada e espelhamento do perfil. A posição é normalizada pela largura da cena; chegada, pausa e mudança de atividade conservam essa posição. Um novo destino usa a posição corrente e substitui o anterior, sem fila. Aceleração e frenagem usam uma curva suave; o ciclo avança pela distância percorrida. A fase é conservada ao redefinir destino. O recorte foi enquadrado um pouco mais distante para permitir caminhar; limites consideram a largura da pose mais aberta, incluindo o salto, para evitar corte nas bordas. Redimensionar recalcula os limites e a rota restante.

Hit testing distingue cabeça, barriga, chão e área vazia. Toque na cabeça mantém uma piscada mais longa e uma inclinação lenta; barriga usa oscilação breve com outra duração. São composições e transformações do recorte existente, não articulação anatômica independente. O toque inicia na soltura; movimentos acima de 12 pixels e pointercancel não acionam ações, para tolerar rolagem vertical da página. Teclado: setas escolhem os extremos, espaço/Enter fazem carinho. O menu de estudo preserva acesso por botões a todas as ações.

A bola interrompe o deslocamento e limita seu alcance conforme a posição de Pippo. Ainda não há chute ou colisão física. Mantidos sombras de contato, bordas e cache das poses. Nenhuma geração adicional de imagem nesta etapa.

Validação: testes puros de limites, chegada exata, troca de destino e hit testing em quatro dimensões; testes de estado de pausa, interrupção, carinhos diferentes e preservação da chegada; regressões da bola e dos contornos. Chromium remoto: toque no chão à esquerda e à direita, perfil na direção correta, pausa congelada, carinho direto na cabeça e barriga, sem erros de console da aplicação. Quatro dimensões nos testes não equivalem a quatro aparelhos reais. Sem teste físico de Safari/iPhone.

Pendências da etapa A: o atlas continua com quatro poses de caminhada; faltam quadros intermediários, revisão anatômica da alternância dos pés, curvas de virar e transições de repouso para perfil. Carinho articulado de cabeça/asas exige novos recursos. Não há voo, rotação 360 ou navegação em oito direções. A estratégia v1.0 e as demais atividades continuam no plano. Esta entrega conclui a interação horizontal e a distinção dos toques, sem declarar a etapa A inteira finalizada.

## Caminhada v2 em oito quadros

Integra `walk-cycle-v2.png` e seus metadados sem apagar o atlas anterior. O primeiro lote gerado repetiu posições; uma correção direcionada produziu apoio, pé levantado atrás e passagem sob o corpo mais legíveis. O perfil mantém o bico aberto da referência original. Altura de referência 408px, contra 334px do atlas anterior; o alinhamento usa o centro da faixa da cabeça e um deslocamento fixo em direção à cauda para reduzir variações laterais entre quadros. Não normalizar cada quadro pela largura, pois a posição dos pés e da cauda varia.

O ciclo avança em oito fases a cada distância equivalente a 0,26 da altura do personagem, sem trocar quadros pelo relógio. Trocar destino conserva a fase; pausa congela posição e desenho. A cabeça permanece registrada por quadro; variações verticais pequenas dos desenhos foram preservadas. Sombras de apoio acompanham os contatos da silhueta. Se o novo recurso falhar ao carregar, o ciclo anterior continua disponível. Os saltos, carinhos e agachamentos não tiveram seus desenhos substituídos.

Prompts, origem e limitações: [registro da arte](docs/ARTE_CICLO_CAMINHADA.md). Foram necessárias duas chamadas de imagem: geração inicial e uma correção das pernas. Não houve contratação ou API paga adicionada ao jogo.

Testes: alcance das oito fases e fechamento do ciclo; limite de todas as silhuetas; continuidade ao redefinir destino; fallback de quatro quadros; regressões da pausa, bola, carinho e contorno. Chromium remoto: carregamento do novo atlas, pose de passagem limpa à esquerda, direção oposta e pausa. Ainda sem teste físico no iPhone e sem aprovação de ciclo final por animador ou teste em uso. Persistem diferenças de pose entre repouso e perfil, anatomia gerada a revisar e necessidade de transições de giro/chegada. Esta versão melhora o estudo de caminhada; não conclui toda a etapa A.

## Correções de uso da versão 7

Relato: impressão de patas extras com batida rápida, deslocamento curto, teclas sem resposta e carinho apenas por botão. Causas identificadas: a cadência podia chegar perto de 2,8 ciclos completos por segundo; o gesto antigo rejeitava deslocamento acima de 12px; setas eram ouvidas somente no canvas; o enquadramento deixava pouca margem nas telas estreitas. O relato visual não foi descartado como impressão: a aparência anatômica do atlas continua sujeita à avaliação em uso.

Mudanças: percurso mais lento (velocidade média de referência 0,28 altura/s); passada completa de 0,52 altura, com cadência máxima de cerca de 0,81 ciclo/s na curva atual. Estes valores substituem a passada anterior de 0,26 altura. Poses são exibidas individualmente, sem crossfade ou rastro. Enquadramento limitado a 0,56 da largura para liberar percurso no celular; em 360x500 CSS pixels, o caminho útil agora supera 150px. Isso é teste geométrico, não medição em iPhone.

Direções ficam sempre visíveis abaixo da cena. Teclas são tratadas na página ativa, preservando inputs e o diálogo de comparação. Repetição automática do teclado não reinicia a rota. Um destino igual ao atual mantém a rota; comando no limite informa que Pippo já está desse lado. Toques ao lado do personagem passam a funcionar também na altura intermediária da cena.

Carinho começa ao encostar na cabeça ou barriga. O ponteiro é capturado e o deslize deixa de ser descartado; a reação é mantida enquanto o contato continua, com retorno ao soltar. Pausa, cancelamento, perda de captura, comparação, aba oculta ou outro gesto encerram o contato. O movimento de página é desativado dentro da cena para que o navegador não cancele o carinho como rolagem; a página continua rolável fora da cena. A atuação de cabeça/asas ainda não tem articulação independente. Nas correções de entrada não foi necessária geração de imagem; a troca posterior do andar por peças separadas está descrita a seguir.

Evidências: teste de gesto com deslocamento de 70px e contato de 3s, soltura, captura, cancelamento, teclado fora do canvas, repetição de tecla, campos de formulário e diálogo; teste de cadência durante a rota; regressões da bola, das bordas e da troca de destino. Chromium remoto: deslize na cabeça, botões sempre visíveis e seta esquerda com foco no botão da direita acionaram os comportamentos esperados. Teste físico de toque no Safari/iPhone continua pendente.

Como experimentar: tocar ao lado ou usar as direções; no computador, usar ← e → com a página ativa. Para carinho, encostar na cabeça ou barriga e deslizar devagar mantendo contato. As demais atividades da estratégia continuam no plano, sem serem marcadas como prontas por esta correção.

## Substituição da caminhada após novo relato de patas extras

O relato continuou após a redução de cadência. A solução principal deixou de depender dos oito desenhos inteiros: foi produzido um atlas com corpo sem patas, versão ocular fechada e duas patas separadas. `rig-motion.js` calcula trajetórias contínuas em vez de selecionar desenhos do corpo para cada fase. O render desenha cada uma das duas patas uma vez; o corpo novo não contém patas desenhadas. Referências e prompt estão em [arte do movimento contínuo](docs/ARTE_MOVIMENTO_CONTINUO.md). A arte antiga e os testes associados permanecem para histórico e recuperação caso o recurso novo falhe.

A fase acompanha a distância percorrida. Na parte de apoio, a velocidade local do pé compensa o deslocamento do corpo, mantendo o apoio fixo no mundo nos dois sentidos. Na parte aérea, curvas de Hermite e elevação com seno ao quadrado dão continuidade de posição e velocidade nas transições. A parada acomoda as patas em 240ms e preserva o perfil, evitando o salto imediato para o recorte frontal. Cabeça e barriga aceitam o gesto de carinho também nessa montagem; olhos do perfil fechado são compostos na região ocular. O giro de direção ainda é espelhamento, e a passagem inicial de três quartos para perfil não tem ângulos intermediários.

Evidências adicionais: testes em 4.000 amostras, continuidade de posição e velocidade nas fronteiras de apoio/passagem, pé plantado no espaço do mundo, exatamente duas trajetórias de patas e chegada ao repouso. Chromium remoto mostrou a montagem nova com duas peças de pata, nos dois sentidos; carinho por deslize interrompeu a caminhada mantendo o perfil e as patas. Não se mediu FPS em aparelho físico nem se declarou fluidez natural validada por usuário/animador. A imagem de corpo continua sujeita à avaliação de fidelidade.

A versão 7 reúne esta substituição com as correções de entrada e de enquadramento descritas acima. Foram feitas as verificações de regressão existentes e os novos testes de gesto e movimento contínuo. Demais atividades e pendências da estratégia permanecem preservadas.

## Versão 8 correção baseada na gravação do usuário

Foi analisada a gravação de 4,64s enviada pelo responsável, com quadros amostrados a cada 250ms e inspeção ampliada das patas. O defeito aparece especialmente entre 0,25s e 0,75s: o topo da peça de pata fica exposto como uma abertura e a ligação diagonal anterior não fecha a junção de forma convincente. A evidência de uso reprovou o acabamento da versão 7; os testes anteriores de duas trajetórias e continuidade não eram suficientes para aprovar a montagem visual. A gravação é evidência do uso da v7 no aparelho do usuário, não um benchmark de FPS da v8. O vídeo pessoal não foi incorporado ao repositório.

Correção: ligação articulada com quadril, joelho e tornozelo; comprimentos constantes e alcance verificado durante o ciclo. O ponto terminal acompanha exatamente o tornozelo rotacionado, dentro de pixels sólidos da peça. A região superior aberta do desenho da pata deixa de ser pintada; o trecho sólido inferior se sobrepõe à nova perna. As junções têm espessura compatível com o tornozelo, e a barriga cobre o início das pernas. Foram conferidos os pixels de ligação no atlas: alpha 253 tanto no quadril dos dois corpos quanto nos tornozelos das duas patas. A imagem fonte foi preservada; a seleção e a articulação ocorrem na renderização do jogo.

Resposta ao comando: velocidade de referência de 0,42 altura/s com aceleração/frenagem de aproximadamente 120ms, em lugar da rampa suave aplicada à viagem inteira a 0,28 altura/s. Pequenos trajetos têm duração mínima de 350ms. Isso reduz o tempo de deslocamento sem acelerar descontroladamente a alternância dos pés. O teste de resposta em 100ms é de simulação; não mede latência real do aparelho.

Verificações: 4.000 amostras do ciclo incluindo alcance, comprimentos das articulações e coincidência entre ligação e tornozelo girado; continuidade de apoio e de aterrissagem; saída e percurso mais rápidos; regressões de carinho, teclado, pausa, bola e contorno. Inspeção no Chromium remoto de apoio e pé levantado, nos dois sentidos. A fluidez e o acabamento da v8 ainda precisam de revisão no mesmo aparelho da gravação. O giro e outras atividades permanecem pendentes. Nenhum novo lote de imagem foi gerado para esta correção.

## Continuação após a reversão — música e jardim

A versão 6 foi republicada a pedido do responsável após a rejeição visual das versões 7/8. Esta continuação recupera o ciclo de **poses completas**, sem carregar a montagem de pernas separadas, e mantém os controles de página e carinho por gesto. O andar continua com limitações visuais explícitas.

Entrega a Casa da Música com teclado C4–C5, tambor, xilofone, chocalho e pandeiro sintetizados, resposta musical opcional na pausa e prioridade do toque da criança. Jardim com regador e flor que permanece aberta na sessão; navegação livre entre três lugares. Preferências locais de som/volume, resposta musical e movimento reduzido. Não há API ou recurso pago adicionado.

Inventário completo, critérios e pendências: [estado da produção](docs/ESTADO_PRODUCAO.md). Timbres são provisórios; não há voz, sons de animais ou validação física de iPhone nesta rodada. A estratégia e a especificação completas continuam válidas além desta fatia.

Verificações adicionais: `node tests/music-audio.cjs` e `node tests/activities.cjs`, além das regressões de `interaction`, `inputs`, `ball-play` e `sprite-rendering`. A matemática do rig antigo deixou de ser um critério para aprovação visual ou funcionamento desta versão.

## Fidelidade aos desenhos originais

O personagem passou a ser recortado das folhas originais anexadas, com arquivos fonte copiados byte a byte, máscaras e encaixes em runtime. O perfil regenerado e a montagem de pernas separadas deixaram de carregar. Integra poses originais de andar, pular, agachar, sentar, descansar, erguer-se, acenar, olhar atrás e interagir com a bola; doze expressões completas, incluindo o bico de carinho. Comparação com todas as folhas disponível no jogo.

Registro, invariantes e limitações: [identidade do Pippo](docs/IDENTIDADE_PIPPO.md). Não houve geração de imagens nesta revisão. A fidelidade à fonte é verificável por hash e pelos pixels internos; o recorte e a composição ainda passam por revisão visual. As poses principais não representam um ciclo de animação final fluido. Testes adicionais: `node tests/canonical-art.cjs` e `node tests/canonical-state.cjs`.


### Refinamento de recortes

Corrige a meia bola residual em devolver/alcançar, os trechos claros do fundo sob asas/pés e a composição das expressões. Cada cabeça se registra por seu próprio pescoço sobre uma camada corporal sem a cabeça antiga; não existe mais o corte horizontal genérico na bochecha. Contorno com recuo de um pixel e cor interna na franja. Fontes aprovadas permanecem byte a byte iguais. Regressões específicas em `tests/art-refinement.cjs`; revisão visual de todas as expressões em fundo contrastante.


### Giros a partir da vista visível — revisão 15

Continuação da versão 14, sem regeneração de arte. Corrige o giro desnecessário ao retomar o mesmo sentido depois de uma chegada: o perfil direito não passa mais pelo quarto esquerdo/frente para caminhar à direita (e vice-versa). A inversão durante o giro começa na vista efetivamente exibida; mudar apenas a distância preserva o progresso do giro. O giro usa vistas adjacentes originais, 80 ms por vista, sem deslocamento durante a sequência. Perfis intermediários são preparados antes de habilitar a interação. Parar no ponto atual cancela um giro pendente.

Verificação: 11 suítes Node aprovadas, incluindo `tests/turn-continuity.cjs` (dez pares vista/direção, retomada, retarget, inversão, pivô, movimento reduzido e interrupções). Sintaxe dos três JS alterados conferida. Comparação no Chromium remoto com 24 capturas determinísticas dos mesmos instantes: retomada do perfil direito, inversão aos 200 ms e caminhada/chegada à esquerda. Evidências em `evidence/pippo-giros-comparacao-v15.jpg` e `evidence/pippo-inversao-comparacao-v15.jpg`. Para repetir: `python3 scripts/review-turns.py`, abrir `/__review.html` na prévia suportada, clicar Comparar versões; depois executar `python3 scripts/review-turns.py --clean` antes de empacotar. A página de ensaio não é publicada.

A caminhada conserva as quatro poses, a cadência e os recortes da versão 14. Não há interpolação de patas, sobreposição de personagens ou nova modelagem. Partida/parada e atuação entre poses continuam discretas: esta entrega melhora a coerência dos giros e comandos, não conclui a fluidez do andar. Próxima prioridade: ensaio de intermediários consistentes da caminhada, aprovado visualmente antes da integração. Safari/iPhone físico, FPS e latência reais continuam sem validação. Todo o inventário de atividades permanece vigente.
