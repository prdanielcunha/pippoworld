# Inventário para levar ao Work — trecho B

Revisão: 27/10/2026. Fonte de produto: documentos originais 03, 05 e 06 em `docs/primeiro-trecho/`, F01 completo e complementos 23/24. Este documento descreve **o que produzir e como entregar**, sem afirmar que os arquivos finais já existem. A planilha portátil [inventario-producao.csv](inventario-producao.csv) lista cada arquivo. A revisão técnica/produção não equivale a aprovação educativa ou teste com crianças.

## Pedido de produção ao Work

Preparar e revisar o pacote B abaixo, preservando os IDs. Separar referência visual, fonte editável, modelo 3D animado e áudio. Imagens e vídeos de referência não substituem GLB, rig, clipes e arquivos de som. Começar por uma folha de cada personagem e escala conjunta; fechar espécie/idade de Pippo junto da gravação natural. Não contratar serviços nem adquirir recurso sem licença compatível e autorização de custo.

O protótipo atual não tem nenhum GLB, rig, textura, locução ou gravação animal final. Não chamar as esferas/caixas atuais de arte final. Nenhuma imagem gerada está integrada como personagem jogável. Não produzir vocalização inventada de coelho nem trocar piado de pintinho por ave genérica.

## Entrega 3D — arquivos finais planejados

Fonte editável proposta: Blender `.blend`, com texturas e dependências empacotadas. Distribuição: glTF 2.0 binário **`.glb`**, materiais e texturas incorporados. O pipeline GLB ainda requer importador/validação no jogo; hoje existe apenas a fábrica procedural. Caminhos abaixo são contratos de entrega propostos, **não arquivos já presentes**.

| ID | Fonte editável proposta | Distribuição esperada | Elementos móveis e integração |
| --- | --- | --- | --- |
| duck_main | assets-source/models/duck_main.blend | public/assets/models/characters/duck_main.glb | Corpo, cabeça, bico, olhos/pálpebras, asas, pés e topete. Rig para receber/devolver bola e futuras poses de sentar/nadar. Substituir `bird()` em yard.ts mantendo raiz duck_main e alvos |
| cow_friend | assets-source/models/cow_friend.blend | public/assets/models/characters/cow_friend.glb | Corpo reconhecível, cabeça, boca, orelhas, patas; sem gesto humano. Substituir `cow()` |
| chick_friend | assets-source/models/chick_friend.blend | public/assets/models/characters/chick_friend.glb | Pintinho, bico, pequenas asas e patas; independente do pato. Substituir `bird()` para este ID, sem compartilhar aparência final com Pippo |
| rabbit_friend | assets-source/models/rabbit_friend.blend | public/assets/models/characters/rabbit_friend.glb | Orelhas, olhos, patas e postura de escuta; ataque de tambor com contato visível. Substituir `rabbit()` |
| yard | assets-source/models/yard.blend | public/assets/models/environments/yard.glb | Quintal, chão, caminhos, jardim visível e casa musical tocável; sem saídas falsas. Substituir cenário de `build('yard')` |
| garden | assets-source/models/garden.blend | public/assets/models/environments/garden.glb | Jardim e posições de flor, regador, Mimi, Tico e chocalho; suportes sem sobreposição de alvos |
| music_house | assets-source/models/music_house.blend | public/assets/models/environments/music_house.glb | Interior, chão, suportes, portas de retorno e espaço de instrumentos; Pippo fora das teclas |
| ball_main | assets-source/models/ball_main.blend | public/assets/models/objects/ball_main.glb | Uma bola azul com origem central. Trajetória continua controlada por WorldState.ball |
| watering_can | assets-source/models/watering_can.blend | public/assets/models/objects/watering_can.glb | Corpo/alça/bico com pivô adequado para inclinação; saída da água precisa coincidir com flor |
| flower_main | assets-source/models/flower_main.blend | public/assets/models/objects/flower_main.glb | Caule, folhas e pétalas articuladas ou morph targets para fechada/aberta; manter estado confirmado da sessão |
| drum_single | assets-source/models/drum_single.blend | public/assets/models/instruments/drum_single.glb | Corpo e membrana independentes; superfície de contato e vibração |
| keyboard_eight | assets-source/models/keyboard_eight.blend | public/assets/models/instruments/keyboard_eight.glb | Oito teclas independentes nomeadas key_0…key_7 em ordem crescente; pivôs de pressão; sem teclas decorativas que aparentem ação inexistente |
| shaker_story | assets-source/models/shaker_story.blend | public/assets/models/instruments/shaker_story.glb | Chocalho e suporte de guardar local. Transporte entre cenas continua fora do protótipo; não animar transporte sem estado correspondente |

Requisitos técnicos de entrega:

- Raiz nomeada com o ID neutro; origem nos pés para personagens, centro da bola e base dos objetos. Unidade de cena: metro. Escala conjunta aprovada; não embutir escalas negativas nem deslocamento global nos clipes.
- O adaptador do jogo deve orientar a frente para o observador no eixo mundial −Z; confirmar conversão de coordenadas glTF/Babylon na importação. Sem câmera ou luz obrigatória embutida.
- Esqueleto, skin e nomes estáveis. Animações de deslocamento em posição; o controlador move a raiz. Incluir versão curta de repouso para redução de movimento. Exportação de referência a 30 fps é uma proposta de produção, não medição de FPS do jogo.
- Preferir materiais simples e superfícies foscas; evitar transparência em camadas, pelos geométricos e dependências externas. Limites definitivos de triângulos/texturas/memória dependem da medição em iPhone/iPad mínimo; não há orçamento final aprovado.
- Verificar silhueta, pés/chão, bico/boca, interseções, contato com bola/tambor e todas as saídas fora do roteiro. Entregar GLB autocontido e arquivo .blend correspondente; revisar exportação com o importador antes de substituir a fábrica.

## Animações por personagem

Nomes abaixo são **contrato proposto de clipes**, ainda não nomes importados pelo código. Não produzir arquivo vazio ou pose estática para marcar clipe concluído. Um gesto procedural revisado pode substituir um clipe onde apropriado, com registro.

| Personagem | Clipes comuns mínimos | Clipes específicos do trecho B | Marcadores / interrupção |
| --- | --- | --- | --- |
| duck_main | Idle, Blink, Look_Camera, Look_Target, Greet, Walk_Loop, Turn_Left, Turn_Right, Touch_React, Settle | Call_Duck, Speak, Receive_Ball, Pass_Ball, Watch_Water, Listen_Music, Play_Drum, Goodbye | ball_contact, ball_release; início/fim de bico e fala a partir do áudio final. Novo gesto abandona convite; saída recupera uma bola |
| cow_friend | Idle, Blink, Look_Target, Greet, Walk_Loop, Turn_Left, Turn_Right, Touch_React, Settle | Call_Cow, Rest_Shift, Watch_Flower | call_start/call_end e contato de patas; não mugir em cada rega automática |
| chick_friend | Idle, Blink, Look_Target, Greet, Walk_Loop, Turn_Left, Turn_Right, Touch_React, Settle | Call_Chick, Wing_Flutter, Approach_Flower | bico e piado sincronizados; aproximação cancelável e parada estável sem cruzar flor/Mimi |
| rabbit_friend | Idle, Blink, Look_Target, Greet, Walk_Loop, Turn_Left, Turn_Right, Touch_React, Settle | Listen_Music, Drum_Hit_Left, Drum_Hit_Right, Drum_Return, Shaker_Shake, Put_Away | drum_contact e retorno; resposta cede imediatamente ao toque. Sem arquivo Call_Rabbit |

Objetos: ball_main (rolar/quicar por trajetória), watering_can (selecionar/inclinar), water (aplicação curta no contato), flower_main (Open e React_Water, sem fechar flor já aberta), drum_single (Hit/Settle), key_0…key_7 (Press/Release independentes), shaker_story (Shake/Settle/Put_Away). Guardar chocalho e aproximação de Tico exigem implementação adicional; estão inventariados, não implementados.

Marcadores deverão acompanhar o modelo em `assets-source/models/<id>.events.json` com `{clip, event, timeSeconds}` e revisão. Esse formato é proposta de entrega; o adaptador de animação ainda terá de consumi-lo. Não inventar tempos finais antes de gravar o áudio/animar.

## Voz do Pippo em português brasileiro

Direção e textos preservados do arquivo 05. Cada fala deve ter tomada isolada, voz natural clara, sem música ou som animal embutido, sem agudo estridente e com pronúncia aprovada dos nomes. Fonte de áudio sem compressão destrutiva: WAV PCM 48 kHz/24 bits; distribuição inicial proposta: WAV PCM mono 44,1 ou 48 kHz/16 bits (opção AAC/MP3 só após ensaio Safari). Aparar silêncio inicial excessivo sem cortar ataques; preservar respirações discretas, cauda e margem contra clique. Não normalizar para volume máximo nem aplicar reverberação forte; revisar ganho em conjunto. Tamanho e duração reais só após produção.

Pasta de distribuição: `public/assets/audio/pt-BR/`. Mestre: `assets-source/audio/pt-BR/`. **Todas as falas abaixo faltam.**

| Chave de produto | Arquivo planejado | Texto exato | Integração atual / trabalho necessário |
| --- | --- | --- | --- |
| voice.hello.first | voice_hello_first.wav | Oi! Eu sou o Pippo! | Manifesto atual hello; `startGame()` já chama `recorded('hello')` |
| voice.hello.return | voice_hello_return.wav | Oi! Vamos brincar? | Alternativa de saudação: falta seleção/gancho e entrada no manifesto; não tocar as duas saudações |
| voice.friend.cow | voice_friend_cow.wav | A Mimi é uma vaca. | Chave atual cow tem URL nula; falta agendamento separado do mugido |
| voice.friend.chick | voice_friend_chick.wav | O Tico é um pintinho. | Chave atual chick nula; falta agendamento separado do piado |
| voice.friend.rabbit | voice_friend_rabbit.wav | O Lolo é um coelho. | Chave atual rabbit nula; falta apresentação no primeiro encontro |
| voice.ball.blue | voice_ball_blue.wav | A bola azul! | Falta chave/gancho contextual único; não narrar cada passe |
| voice.garden.can | voice_garden_can.wav | Olha o regador! | Falta chave/gancho opcional, sem bloquear seleção |
| voice.garden.flower | voice_garden_flower.wav | A flor abriu! | Chave atual flower nula; falta disparo oportuno após confirmação |
| voice.music.drum | voice_music_drum.wav | Um tambor! | Falta chave/gancho; omitir se houver toque instrumental |
| voice.music.keyboard | voice_music_keyboard.wav | Um teclado! | Falta chave/gancho; omitir se houver notas |
| voice.turn.mine | voice_turn_mine.wav | Agora eu! | Falta chave/gancho na resposta opcional e cancelável |
| voice.turn.yours | voice_turn_yours.wav | Sua vez! | Falta chave/gancho, cancelar se a criança já voltou a tocar |
| voice.shared.clap | voice_shared_clap.wav | Vamos bater palmas juntos? | História opcional futura do trecho; sem detecção de palmas ou microfone |
| voice.goodbye | voice_goodbye.wav | Vamos guardar? Até a próxima! | Chave goodbye nula; finish() ainda não toca fala. Integrar sem impedir saída nem retomar fila antiga |

`src/content/pt-BR.ts` contém hoje apenas parte desse banco; a produção deve entregar os 14 textos aprovados, e a integração deve ampliar `RecordedId`/`recordings` em `src/content/resources.ts`. O volume/frequência já têm controle adulto, mas a política completa de locução depende dos ganchos acima. Não declarar banco pronto apenas por preencher URLs.

## Gravações animais reais

Distribuição proposta: `public/assets/audio/animals/`; mestres/origem em `assets-source/audio/animals/`. Formatos como na voz, preservando o original recebido. Uma tomada curta, limpa e reconhecível por animal é o mínimo; registrar duração sem a inventar. **Nenhuma está incorporada.**

| ID / manifesto atual | Arquivo planejado | Identidade e restrições | Ponto de integração |
| --- | --- | --- | --- |
| animal.duck.main / duck_main | animal_duck_main.wav | Pato filhote; espécie/idade exatas dependem de D01/D04. Não usar adulto nem transpor gravação para fabricar filhote | `interact('duck_main')` → Mixer.recorded; URL/origem/licença nulas |
| animal.cow.main / cow_friend | animal_cow_main.wav | Bos taurus, vaca adulta, mugido real sem fala/música/sofrimento | `interact('cow_friend')` → Mixer.recorded |
| animal.chick.main / chick_friend | animal_chick_main.wav | Gallus gallus domesticus, pintinho, piado real; sem galo/pássaro genérico | `interact('chick_friend')` → Mixer.recorded |
| rabbit_friend | **Nenhum arquivo** | Ausência intencional. Não produzir “voz de coelho”, risada sintética ou som de sofrimento | Reação visual; canal de animais interrompido ao selecionar Lolo |

Origem, autor, página da licença, permissão de redistribuição/adaptação comercial, atribuição, restrições, espécie/idade, data de obtenção, versão, tamanho e SHA-256 precisam acompanhar cada tomada. Conferência auditiva de identidade/conforto com aparência aprovada antes de liberar. Não usar onomatopeia ou síntese como gravação natural.

## Instrumentos e efeitos

Mestres em `assets-source/audio/instruments/` ou `effects/`; distribuição em `public/assets/audio/instruments/` e `effects/`. Mesmo padrão WAV. Instrumentos podem manter síntese musical revisada; gravação é obrigatória para vocalizações animais, não para notas. Síntese atual é provisória, não gravação acústica.

| Arquivos finais propostos | Conteúdo e canal | Estado atual / integração |
| --- | --- | --- |
| keyboard_c4.wav, keyboard_d4.wav, keyboard_e4.wav, keyboard_f4.wav, keyboard_g4.wav, keyboard_a4.wav, keyboard_b4.wav, keyboard_c5.wav | Teclado consistente, C4 D4 E4 F4 G4 A4 B4 C5: 261,625565; 293,664768; 329,627557; 349,228231; 391,995436; 440; 493,883301; 523,251131 Hz | Triângulo sintetizado em Mixer.instrument('key', pointer, index). Amostras futuras exigem decodificação e envelope por contato, não só troca do URL no manifesto de animais |
| drum_single.wav | Ataque de tambor com cauda limpa, canal instruments | Síntese de três modos de membrana em Mixer.instrument('drum'); substituir/revisar timbre; gesto responde sem esperar animação |
| shaker_story.wav | Um gesto curto de chocalho, canal instruments | Ruído filtrado sintetizado em Mixer.instrument('shaker'); revisar timbre ou substituir por amostra |
| ball_bounce.wav, ball_receive.wav, ball_release.wav | Contatos discretos no instante correspondente, canal ambience/efeitos | Ausentes; bola é visual. Só diferenciar tomadas se necessário; faltam ganchos nos contatos |
| garden_water.wav | Água curta no local da rega, canal ambience/efeitos | Ausente; rega é visual, sem arquivo fingido. Gancho de início/fim precisa respeitar pausa/cancelamento |
| yard_ambience.wav, music_house_ambience.wav | Fundo discreto **opcional**, canal ambience | Silêncio deliberado hoje. Não incluir vocalização de espécie não mostrada como ensino; não disputar com fala/instrumento |

Ducking de fundo durante voz, escuta da mixagem completa, conforto e latência precisam de revisão com material final. Os quatro buses, compressor, limite de vozes e cancelamento existem; ambiente hoje fica silencioso. Acompanhamento de Lolo reutiliza tambor; não exige um arquivo de música novo. Saída/pausa nunca devem deixar cauda ou nota antiga na retomada.

## Recursos incorporados: origem e licença

| Recurso realmente existente | Origem / autoria | Licença / situação |
| --- | --- | --- |
| Geometria de 4 personagens, 3 ambientes e objetos, materiais e animação procedural em src/scene/yard.ts | Código original produzido para este repositório; não importado de banco de arte | Provisório; titular do repositório define licença de distribuição de seus originais. Não foi atribuída licença CC0 nem arte final aprovada |
| Síntese de teclado, tambor e chocalho em src/audio/mixer.ts | Código original desta implementação; sem amostra sonora de terceiros | Provisório; mesma situação de titularidade do código. Não é gravação natural |
| Ícones Unicode/emoji | Caracteres renderizados pela fonte do sistema do aparelho | Sem arquivo gráfico copiado; aparência variável por sistema. Produzir ícones próprios/licenciados para aparência consistente |
| @babylonjs/core 9.32.0 (runtime) | https://github.com/BabylonJS/Babylon.js | Apache-2.0; LICENSE e NOTICE do pacote preservados em public/THIRD_PARTY_NOTICES.txt e distribuídos no build |
| Vite 8.3.5 (ferramenta) | https://github.com/vitejs/vite | MIT; node_modules/vite/LICENSE.md; não é arte/áudio |
| TypeScript 7.0.2 (ferramenta) | https://github.com/microsoft/TypeScript | Apache-2.0; LICENSE/NOTICE no pacote |
| Playwright Test 1.64.1 (ferramenta) | https://github.com/microsoft/playwright | Apache-2.0; LICENSE/NOTICE no pacote; Chromium/WebKit são navegadores de validação, não recursos do jogo |
| Voz e gravações animais | **Nenhuma fonte incorporada** | **Sem licença/arquivo para aprovar**. Não preencher origem fictícia |

## Conferência de recebimento e próximos passos

Entregar por ID: fonte + distribuição + metadados (`id`, versão, idioma, autor/origem, URL da licença, atribuição, restrições, espécie/idade ou nota, tamanho, SHA-256, dependências, responsável e estado de revisão). Finais sem direitos ou correspondência ficam pendentes; não entram no jogo. Usar URLs locais relativas à base do build (`import.meta.env.BASE_URL`) para funcionar em subpasta.

1. Arte aprova identidade, escala e silhueta; áudio aprova espécie/idade e direção de voz. Work pode produzir referências, mas o pacote animado exige modelagem/rig/exportação reais.
2. Engenharia testa um GLB real com a versão do Babylon, adiciona importador compatível quando necessário e adapta as raízes/clipes/alvos. O loader/adapter ainda não existe no protótipo atual.
3. Áudio integra material com direitos, decodifica antes do uso, completa ganchos de fala/efeitos e sincroniza marcadores; testa repetição, prioridade, silêncio e cancelamento.
4. Safari iPhone/iPad físicos, Android, metas 30 FPS/100 ms, memória/aquecimento/bateria, revisão educativa/sonora e famílias continuam validações separadas. Offline também continua pendente.

Conteúdos C/D/E (Belinha, Bento, cuidados, campinho, basquete, percursos, xilofone, bateria completa, pandeiro, água/roupas e opcionais) permanecem nas fontes e não são substituídos por este inventário B.
