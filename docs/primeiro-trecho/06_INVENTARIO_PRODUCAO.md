# 6 Inventário de produção

## Estado e convenções

Nenhum recurso listado foi produzido, adquirido, licenciado ou encontrado no repositório nesta tarefa. Estado geral: **especificado e pendente de produção ou conferência**. Quantidades abaixo são mínimos de planejamento para o trecho, não orçamento nem prova de arquivos existentes. Não gerar variações em massa antes de aprovar necessidades, silhuetas, escala e enquadramento.

Cada recurso recebe ID neutro, versão, função, arquivos fonte, distribuição, dependências, responsável, estado e evidência. O manifesto precisa registrar origem, autor, licença e limitações. Separar `planejado`, `produzido`, `integrado`, `verificado` e `validado em uso`. A presença de um arquivo não autoriza marcar todos esses estados.

## Modelos tridimensionais

| Grupo e IDs propostos | Quantidade mínima | Entrega necessária |
| --- | --- | --- |
| duck_main, cow_friend, chick_friend, rabbit_friend | 4 personagens | Modelos 3D, materiais suaves, rig e expressões adequados às respectivas ações |
| yard, garden, music_house | 3 conjuntos de cena | Chão, caminhos, vegetação simples, interior musical e pontos de chegada/retorno |
| ball_main | 1 objeto | Bola azul, colisão ou trajetória coerente, posição de recuperação |
| watering_can | 1 objeto | Corpo, alça e saída de água compatíveis com uso por toque |
| flower_main | 1 objeto articulado | Flor fechada e aberta; transição por ossos ou deformação revisada |
| drum_single | 1 instrumento | Membrana e corpo legíveis, região de contato e suporte estável |
| keyboard_eight | 1 instrumento com 8 teclas móveis | Oito alvos e movimentos independentes, sem mecanismo visual confuso |
| shaker_story | 1 instrumento simples | Chocalho, suporte de guardar e contato coerente se transportado |
| acessos e suportes | Conforme planta aprovada | Portas, caminhos, suporte do chocalho e área de guardar; sem destinos falsos |

Cenários reutilizam módulos quando isso preserva leitura e desempenho. Não há meta arbitrária de polígonos; orçamento por personagem, material, textura e cena depende do aparelho mínimo medido. Evitar pelagem pesada, transparências excessivas e efeitos que escondam alvos. Manter escala comparativa entre vaca, patinho, pintinho, coelho e instrumentos.

## Preparação de arte necessária

Uma folha por personagem com frente, perfil, costas e três quartos; uma folha conjunta de escala; uma folha de expressões e poses por rig; uma planta por conjunto de cena com áreas sensíveis e câmera. São especificações para produção posterior, não imagens solicitadas nesta tarefa. Um estudo principal com revisão dirigida vem antes de qualquer lote de variantes.

Volumes arredondados, olhos expressivos, materiais suaves e iluminação acolhedora seguem a fonte. Paleta de referência preservada: amarelo #F2C94C, laranja #E99945, verde #7FAE78, azul #83BBD0, creme #F6EEDC, madeira #A77C55 e vermelho #CF7068. Validar sob a luz do jogo e não depender apenas da cor. Característica permanente de Pippo e aparência final dos amigos ainda precisam de escolha.

## Matriz mínima de animação

| Personagem | Clipes e comportamentos para o trecho | Marcadores e interrupções |
| --- | --- | --- |
| Pippo | Repouso, piscar, olhar, acenar, andar, virar, parar, reagir ao toque, vocalizar pato, falar, receber bola, devolver, observar rega, escutar/tocar música, despedir | Contato de pés e bola; eventos de bico/fala; saída suave para nova intenção |
| Mimi | Repouso, olhar, virar, reagir, mugir, acomodar postura | Início/fim do mugido e boca; sem articulação humana |
| Tico | Repouso, passos, virar, parar, piar, reagir, aproximar-se da flor | Bico e piado; parada estável se tocado durante caminho |
| Lolo | Repouso, olhar, saudação visual, reação, deslocamento curto, escuta, ataque de tambor, retorno, guardar opcional | Contato com instrumento; resposta cede ao toque infantil |
| Objetos | Bola rolar/quicar, água curta, flor abrir, tambor vibrar, tecla afundar/soltar, chocalho sacudir/guardar | Efeito no lugar do contato; cancelamento e pausa sem duplicação |

A biblioteca comum de cumprimento, deslocamento, interação e relaxamento deve existir na forma aplicável a cada espécie. Um cumprimento de Mimi pode ser cabeça/olhar, sem mão humana. Não multiplicar clipes quando controle procedural simples e revisado resolver; tampouco chamar pose estática de animação final.

Revisar deformações, bico, patas, pés no chão, objetos flutuantes, interseções e transições fora do roteiro. Prever redução de movimento. O corpo de Pippo deve permitir futuras ações de sentar, nadar, banho e instrumentos, mesmo que os clipes futuros não sejam produzidos agora.

## Áudio natural dos animais

| ID de tomada proposta | Material mínimo | Aprovação necessária |
| --- | --- | --- |
| animal.duck.main | 1 tomada curta natural aprovada | Espécie e idade compatíveis com Pippo; origem e licença |
| animal.cow.main | 1 mugido natural limpo | Vaca reconhecível, sem voz/música sobreposta |
| animal.chick.main | 1 piado natural de pintinho | Não canto de galo ou pássaro genérico |
| animal.rabbit | Nenhuma vocalização exigida no trecho | Registrar ausência intencional; não usar som inventado ou de sofrimento |

Uma tomada boa por animal sonoro basta inicialmente; variantes só se melhorarem repetição sem alterar identidade. Guardar material original sem compressão destrutiva, corte de início/fim e versão distribuída testada. Não aumentar artificialmente a altura para fazer um adulto parecer filhote. Falta de licença ou correspondência é bloqueio para aceite, nunca permissão para substituição incorreta.

Belinha precisa de balido de ovelha na etapa C. Bento é brinquedo na etapa D, sem vocalização de urso usada como ensino. Não há gravação infantil obrigatória.

## Voz instrumentos e efeitos

| Família | Mínimo preparado para produzir | Conferência |
| --- | --- | --- |
| Voz pt-BR | 14 textos do arquivo 05; uma tomada aprovada por chave usada | Dicção, nomes, licença, cobertura, pausas e bico |
| Tambor | 1 amostra principal de ataque com cauda natural | Timbre de tambor, repetição, ganho e ausência de clique |
| Teclado | 8 amostras/notas de Dó a Dó; envelope de liberação | Afinação, ordem, timbre consistente e multitoque |
| Chocalho | 1 gesto sonoro curto | Som próprio, sem fala ou outros instrumentos embutidos |
| Bola | Contato/quique e recepção/devolução, se distintos | Correspondência com superfície e movimento; repetição controlada |
| Jardim | Água curta e discreta | Sem som contínuo após parar; sem aumento por empilhamento |
| Ambiente | Natureza suave e eventual interior discreto | Opcional, sem vocalização falsa identificável ou competição sonora |
| Alternância | Padrões de uma ou duas batidas e animações correspondentes | Usar amostras existentes; sem geração por IA ou obrigação de copiar |

Não exigir efeito para cada porta, seleção ou pétala. Silêncio é opção de produção válida. No teclado, amostras gravadas ou síntese musical fiel são alternativas a testar; exigência de gravação natural aplica-se às vocalizações animais, não proíbe instrumento sintetizado correto. Arquivos e formatos finais serão escolhidos após teste de tamanho, memória, latência e decodificação nos aparelhos alvo.

## Registro de recurso e entrega

Campos obrigatórios: ID, categoria, etapa, versão, idioma quando aplicável, caminhos fonte/distribuição, tamanho, integridade, dependências, origem, autor, licença, atribuição exigida, restrições de uso/redistribuição, espécie e idade para animais, nota/timbre para instrumentos, estado e revisão. Para voz, registrar texto/chave, voz escolhida, permissão e necessidade de regravação se o nome mudar.

Pacotes propostos: núcleo e quintal, jardim e encontros, Casa da Música, voz pt-BR e controles adultos. Cada pacote declara dependências e versão compatível. Não anunciar offline se voz ou amostra obrigatória estiver ausente. Distribuição 3D proposta em glTF/GLB com fontes editáveis preservadas; confirmar por teste técnico antes de fixar o pipeline.

Pasta sugerida de recursos futuros: fontes de arte e áudio separadas de arquivos otimizados, com manifesto e licenças junto da documentação. Não criar arquivos vazios para simular recursos concluídos. Nenhum fornecedor, ferramenta paga ou contrato foi selecionado por este inventário.
