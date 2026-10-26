# F01 Especificacao Integral v1 1

Fonte original: 02_WORK_CODEX_Especificacao_Mundo_Pippo(2).docx

Transcrição integral do corpo do documento, incluindo tabelas e complementos. A paginação original permanece no DOCX de origem. Esta transcrição não atualiza nem confirma as referências históricas da fonte.

# Mundo Pippo

Estrutura completa do jogo infantil 3D

Concepção do produto e especificação para desenvolvimento

Versão 1.1  |  26 de outubro de 2026  |  Público principal de 24 a 36 meses

### Proposta central

Um mundo 3D de exploração livre em que Pippo, o Patinho, acompanha a criança em brincadeiras com animais, instrumentos, bola, água e pequenas descobertas do cotidiano. Histórias curtas conectam as atividades sem obrigar a criança a segui-las.

O jogo começa com uma ação simples e perceptível. A criança toca, observa a consequência e pode repetir, mudar de brinquedo ou explorar outro ambiente. Pippo apresenta o mundo com sua própria voz, enquanto os animais preservam suas vocalizações naturais e os instrumentos têm sons correspondentes.

### Finalidade deste documento

Orientar produto, direção de arte, modelagem, animação, áudio, programação e validação com famílias. O documento reúne a visão completa do jogo e separa o escopo de lançamento das expansões, para permitir uma produção por etapas sem perder a proposta original.

### Como interpretar as definições

Os requisitos centrais da experiência estão consolidados nas seções de interação, animais, música e modo livre. Nome comercial, aparência final dos personagens, elenco de vozes, tecnologia, parâmetros de desempenho e ordem das entregas são propostas de projeto sujeitas à validação indicada nas seções finais.

Nomes de trabalho: Mundo Pippo em português e Pippo World em inglês. Pippo, o Patinho, identifica o protagonista; Vale dos Bichinhos identifica o primeiro mundo. Há usos públicos de Pippo em jogos educativos. A escolha comercial permanece pendente; a localização e o fluxo de trabalho estão detalhados nos complementos ao final.

## Guia de leitura

A primeira parte descreve o que a criança vive. A segunda define a produção e os critérios que permitem transformar o conceito em uma versão jogável verificável.

| Seção | Conteúdo | Página |
| --- | --- | --- |
| 01 | Visão e identidade do produto | 3 |
| 02 | Princípios para crianças de dois anos | 4 |
| 03 | Mundo e navegação | 5 |
| 04 | Personagens e seus papéis | 6 |
| 05 | Pippo e a comunicação com a criança | 7 |
| 06 | Modo livre e convites de brincadeira | 8 |
| 07 | Cuidados e atividades do cotidiano | 9 |
| 08 | Bola basquete e percursos | 10 |
| 09 | Animais e descoberta dos sons | 11 |
| 10 | Casa da Música | 12 |
| 11 | Aprendizagem durante a exploração | 13 |
| 12 | Histórias e roteiros de interação | 14 |
| 13 | Telas e controles dos responsáveis | 15 |
| 14 | Direção de arte em 3D | 16 |
| 15 | Animação e comportamento | 17 |
| 16 | Produção e funcionamento do áudio | 18 |
| 17 | Arquitetura de software | 19 |
| 18 | Dados funcionamento offline e privacidade | 20 |
| 19 | Escopo e etapas de desenvolvimento | 21 |
| 20 | Validação e critérios de qualidade | 22 |
| 21 | Requisitos e decisões pendentes | 23 |
| 22 | Referências e entregáveis de produção | 24 |

## 01  Visão e identidade do produto

### O que estamos construindo

Mundo Pippo será um jogo de exploração e faz de conta com personagens 3D, resposta direta ao toque e atividades musicais. O público principal é a criança de 24 a 36 meses, com participação do responsável. Conteúdos posteriores poderão atender crianças maiores, preservando uma entrada simples para quem está começando.

A experiência combina um companheiro recorrente com um pequeno mundo compartilhado. Pippo recebe a criança e participa; Mimi, Tico, Lolo, Belinha e Bento trazem outras aparências, movimentos e possibilidades de brincar. O protagonismo de Pippo organiza o universo sem reduzir o jogo às necessidades de um único bichinho.

### Objetivos do produto

Permitir que a criança descubra uma ação sem depender de leitura, tutorial longo, fala compreensível ou coordenação precisa.

Oferecer relações claras entre toque, movimento e som, permitindo repetição e escolhas próprias.

Apresentar animais e vocalizações reconhecíveis, instrumentos com sons corretos e palavras ligadas ao que está acontecendo.

Conectar atividades por pequenas histórias que possam ser abandonadas e retomadas sem penalização.

Proporcionar uma conclusão tranquila e favorecer momentos compartilhados fora da tela.

### Identidade e posicionamento

Mundo Pippo é o nome de trabalho em português e Pippo World é a forma proposta em inglês. Pippo será mantido como personagem enquanto a marca é avaliada. O primeiro mundo continua sendo o Vale dos Bichinhos, com casa, quintal, campinho, jardim e Casa da Música. A nomenclatura deve poder mudar sem alterar regras ou dados do jogo.

O diferencial proposto está na continuidade: uma ação deixa um resultado visível, um objeto pode participar de outra atividade e os personagens respondem ao que a criança acabou de fazer. A originalidade comercial e a compreensão infantil serão avaliadas, não presumidas.

### Resultado esperado de uma primeira sessão

A criança consegue iniciar pelo menos uma brincadeira, perceber uma consequência e repetir ou mudar de atividade com pouca ajuda. Esse é um objetivo de usabilidade a observar, não uma promessa de ganho cognitivo. Tempo de uso prolongado não será usado como principal indicador de sucesso.

## 02  Princípios para crianças de dois anos

### Uma ação de cada vez

A interface mostra poucos elementos ativos em primeiro plano. Uma sugestão por vez é suficiente: a bola pode se mover discretamente ou Pippo pode olhar para o regador. A criança mantém acesso à exploração mesmo quando não segue o convite. Inatividade não dispara uma sequência de ordens.

### Interação tolerante

Toda ação essencial terá caminho por toque simples. Arrastar será uma alternativa para explorar direção ou movimento. Para regar, por exemplo, a criança pode tocar no regador e depois na flor. Seleção, uso e cancelamento terão retorno visual claro. Uma área sensível ampliada não deve invadir a de outro objeto nem transformar um toque ambíguo em escolha arbitrária.

Poucas escolhas visuais por enquadramento, inicialmente três ou quatro; ajustar após observação em aparelhos reais.

Objetos reconhecíveis e suficientemente grandes, com contraste e forma além da cor.

Transições curtas, câmera previsível e opção de reduzir movimento.

Respostas que não exigem rapidez, sequência obrigatória ou contagem regressiva.

### Repetição com espaço para descobrir

Repetir um toque deve reproduzir uma relação reconhecível. Variações de expressão podem existir, mas o som e a função do objeto permanecem coerentes. O jogo não substitui continuamente o resultado por efeitos aleatórios. Pequenas descobertas adicionais aparecem depois que a interação básica já ficou clara.

### Participação e autonomia

O responsável pode nomear objetos, imitar sons, alternar toques e acompanhar a criança. O jogo funciona sem reconhecimento de voz. Em atividades conjuntas, cada participante pode tocar em uma área do instrumento, respeitando o espaço disponível. Preferências e habilidades variam entre crianças da mesma idade; os ajustes da interface não recebem rótulos de capacidade ou diagnóstico.

### Limites do desenho educativo

As atividades oferecem oportunidades de exploração, linguagem e faz de conta. O produto não se apresenta como avaliação de desenvolvimento nem promete acelerar fala, memória ou inteligência. A NAEYC destaca exploração digital mediada por interação com adultos; a AAP recomenda conteúdo de qualidade e preservação de outras experiências. Essas orientações fundamentam participação familiar e encerramentos naturais [1–2].

## 03  Mundo e navegação

### Um lugar pequeno e reconhecível

O Vale dos Bichinhos será composto por ambientes próximos, organizados em cenas. A criança entra no quintal do Pippo e reconhece os caminhos pelos próprios lugares e objetos. A localização dos acessos permanece estável entre visitas. Não é necessário caminhar manualmente por um mapa extenso.

| Ambiente | Elementos principais | Conexões |
| --- | --- | --- |
| Casa e quintal | Pippo, bola, cesta, banho e blocos | Campinho, jardim e Casa da Música |
| Campinho | Mimi, Tico, Belinha e objetos do campo | Quintal e jardim |
| Jardim | Flor, regador, água, rampa e barquinho | Campinho e Casa da Música |
| Casa da Música | Lolo, instrumentos e espaço para Pippo | Jardim e quintal |
| Cantinho tranquilo | Poucos objetos, sons suaves e menor movimento | Acesso opcional pelos responsáveis |

### Como a criança se desloca

Tocar na casa visível leva ao seu interior; tocar em um destino grande conduz Pippo até ele. A câmera faz uma transição curta. Um acesso de retorno consistente fica disponível fora das áreas mais usadas de toque. O desenho desse acesso deve comunicar retorno com imagem reconhecível, e sua compreensão será testada.

Um toque inicia a transição apenas uma vez. Toques seguintes não acumulam deslocamentos. Se um recurso ainda não estiver disponível offline, o responsável recebe a opção de baixá-lo; a criança permanece em uma atividade pronta, sem tela de erro técnica.

### Continuidade do mundo

A flor regada permanece aberta na sessão. A bola fica em posição recuperável. Um instrumento levado ao jardim pode participar de uma história, desde que exista suporte explícito para esse objeto. Não haverá transporte universal de qualquer item para qualquer cena na primeira versão.

A cada nova sessão, o estado retorna a uma configuração acolhedora e previsível. Preferências de volume e instrumento podem ser mantidas localmente. A criança não volta para encontrar personagens doentes, esfomeados ou punidos por sua ausência.

### Apresentação progressiva

Na primeira visita, Pippo e um brinquedo recebem destaque. Os demais acessos aparecem de forma natural. Não haverá apresentação verbal de todos os ambientes, personagens e regras antes de brincar.

## 04  Personagens e seus papéis

Os nomes próprios acompanham a espécie na apresentação. A criança pode gostar de Mimi e também reconhecer que ela é uma vaca. O elenco abaixo é uma proposta de produção; identidade visual, vocalizações e adequação das ações deverão ser revisadas em conjunto.

| Personagem | Personalidade e papel | Som e comportamento |
| --- | --- | --- |
| Pippo<br>O patinho | Curioso e gentil. Companheiro recorrente e voz principal. | Voz falada própria e vocalização natural separada. Anda, nada e bate as asas. |
| Mimi<br>A vaca | Calma e expressiva. Apresenta descobertas do campo. | Mugido real. Movimento de cabeça, orelhas e corpo associado ao áudio. |
| Tico<br>O pintinho | Curioso e atento. Participa de encontros e pequenas buscas. | Piado real de pintinho. Bico, passos curtos e pequenos movimentos das asas. |
| Belinha<br>A ovelha | Tranquila. Participa de contrastes de textura e momentos suaves. | Balido real correspondente ao animal representado. Movimentos legíveis. |
| Lolo<br>O coelho | Brincalhão e musical. Parceiro de percussão. | Sem som animal inventado. Expressões e movimentos; sons naturais apenas quando adequados. |
| Bento<br>O ursinho de brinquedo | Anfitrião de histórias e instrumentos em uma expansão. | Identificado como brinquedo. Não será usado para ensinar a vocalização de um urso real. |

### Características que permanecem

Cada personagem terá silhueta, proporções, paleta, jeito de andar e gestos próprios. Acessórios são secundários; retirar um chapéu não deve impedir o reconhecimento. A apresentação prioriza um amigo por situação, preservando espaço para ouvir seu som e observar sua reação.

### Convívio entre os personagens

Os amigos podem passar uma bola, escutar um instrumento ou demonstrar uma ação. Não disputam a atenção com falas simultâneas. Ao escolher outro animal, a câmera e o áudio destacam esse encontro. Pippo pode permanecer ao lado sem comentar tudo.

### Respeito e humor

Carinho, curiosidade e trapalhadas leves produzem as reações. Toques repetidos não devem virar socos, quedas dolorosas ou incentivo para machucar personagens. O humor pode vir de uma bolha no bico, de um passo engraçado ou de uma bola que retorna.

## 05  Pippo e a comunicação com a criança

### Voz principal do universo

Pippo explicará, demonstrará e convidará com sua própria voz de personagem. A direção de voz será doce, curiosa e clara, com pronúncia natural em português brasileiro. Evitar agudos estridentes, fala acelerada, excesso de diminutivos e erros de pronúncia usados para parecer infantil.

O roteiro utiliza frases curtas e uma intenção por fala. A voz acompanha aquilo que está visível e aguarda tempo para a criança agir. Explicações do responsável, configurações e ajuda técnica ficam fora do diálogo infantil.

| Situação | Fala proposta | Resposta seguinte |
| --- | --- | --- |
| Primeiro encontro | “Oi! Eu sou o Pippo!” | Aceno e espaço para tocar. |
| Apresentar Mimi | “A Mimi é uma vaca. Vamos ouvir?” | Mugido verdadeiro com destaque visual. |
| Escolher a bola | “Você pegou a bola azul!” | A criança mantém o controle. |
| Alternar música | “Agora eu!” e depois “Sua vez!” | Resposta curta, sem cobrança por imitação. |
| Explorar a rampa | “Vamos ver a bola rolar?” | Demonstração possível se a criança quiser. |
| Encerrar | “Vamos guardar? Até a próxima!” | Conclusão tranquila sem novo convite automático. |

### Política de silêncio

Pippo não narra cada toque. A primeira descoberta pode receber uma palavra; repetições privilegiam o som e a ação. Há controle separado da frequência de falas. Convites não se acumulam. Ao entrar em uma atividade, falas da anterior são canceladas. Sons de animais e instrumentos recebem espaço próprio.

### Conversar sem depender de reconhecimento de fala

Na primeira versão, a conversa acontece por olhar, toque, escolha visual e alternância sonora. Pippo pode oferecer duas opções e reagir ao objeto escolhido. Isso permite participação por gesto ou balbucio sem fingir que entendeu uma frase que não reconheceu.

### Microfone como expansão

Eco de voz ou imitação sonora poderá ser estudado após a experiência básica. Exigirá ativação do responsável, explicação do processamento e controle para desativar. Não haverá escuta contínua, envio de voz por padrão nem conversa aberta com IA no escopo inicial. O projeto deve ser divertido com o microfone sempre desligado.

## 06  Modo livre e convites de brincadeira

### O modo livre é a entrada principal

A criança começa no quintal com Pippo disponível. Escolhe um brinquedo ou toca nele. Não há seleção obrigatória de missão, fase ou aula. As histórias aparecem dentro do próprio mundo e podem ser ignoradas sem bloquear conteúdo.

### Três camadas da mesma brincadeira

Explorar permite tocar e experimentar. Descobrir junto acrescenta uma palavra ou demonstração breve. Um convite oferece uma possibilidade, como passar a bola ou ouvir um animal. Essas camadas são comportamentos do cenário, não três menus que a criança precisa entender.

| Estado | Comportamento do jogo | Como termina |
| --- | --- | --- |
| Exploração | Objetos disponíveis e reações diretas. | A criança escolhe uma ação ou outro ambiente. |
| Objeto selecionado | Mostra o objeto ativo e destinos válidos. | Uso, toque em outro objeto ou cancelamento. |
| Ação em curso | Animação e som com retorno imediato. | Volta ao repouso ou aceita nova ação compatível. |
| Convite opcional | Uma sugestão curta e visual. | Aceitação, outra escolha ou silêncio. |
| Transição | Carrega o destino e preserva estado necessário. | Entrada pronta ou retorno seguro. |
| Pausa | Interrompe ação, voz e acompanhamento. | Retomada pelo responsável ou saída. |

### Regras para alternar atividades

Trocar de brinquedo cancela convites pendentes e efeitos que perderam sentido. A troca não exige concluir uma tarefa. Objetos essenciais retornam a posições acessíveis; a bola não fica perdida fora da tela. O estado visual da sessão é preservado onde isso melhora a continuidade, sem acrescentar obrigações futuras.

### Ajuda e adaptação

Quando necessário, um objeto faz um movimento discreto ou Pippo demonstra uma única vez. O responsável pode ajustar frequência de dicas. A adaptação pode ampliar alvos e reduzir elementos visíveis, mas nunca classifica a criança como avançada ou atrasada. Áreas de toque não se sobrepõem de forma imprevisível.

### Brincar junto

O iPad poderá oferecer duas áreas confortáveis para criança e adulto. No telefone, a proposta é alternar ações, preservando o tamanho dos objetos. Multitoque será usado nos instrumentos quando a tela e o aparelho permitirem, sem ser requisito para completar uma brincadeira.

## 07  Cuidados e atividades do cotidiano

### Cuidados como faz de conta

Banho, alimentação e descanso serão atividades disponíveis, ligadas a situações visíveis. Não haverá medidores de fome ou energia que se esgotam com o tempo. Pippo continua bem quando o jogo está fechado. Cuidar dele é uma escolha de brincadeira, sem responsabilidade permanente imposta à criança.

### Banho depois da poça

A criança toca na poça e Pippo atravessa, deixando os pés sujos. O chuveirinho aparece próximo. Ao selecioná-lo e tocar nos pés, a água remove a sujeira gradualmente. Uma toalha permite enxugar. As etapas podem ser repetidas e a criança pode sair a qualquer momento.

O efeito acompanha o contato: água onde está sendo usada e sujeira diminuindo no mesmo lugar. Se arrastar for difícil, toques sucessivos resolvem. O volume dos respingos permanece controlado mesmo com repetição rápida.

### Alimentação

Dois alimentos definidos em uma revisão de adequação ao animal ficam disponíveis em recipientes grandes. A criança escolhe e oferece no pratinho. Pippo reage e nomeia o alimento quando oportuno. Não se deve ensinar alimentação inadequada de animais, usar comida como castigo ou associar consumo a moedas e recompensas.

### Roupas e acessórios

Duas opções visíveis por vez permitem experimentar um chapéu ou uma capa de chuva. A aparência essencial de Pippo permanece reconhecível. Acessórios não exigem compras, coleções ou desbloqueio diário. Trocar de roupa deve ser uma transformação simples de observar.

### Guardar e descansar

Uma caixa recebe brinquedos grandes por toque. Pippo pode demonstrar guardar um item. O descanso é uma opção de encerramento: colocar a mantinha, apagar a luz e ouvir uma despedida curta. O personagem não perde energia para obrigar essa atividade e o jogo não a apresenta como tratamento para o sono.

### Vínculo respeitoso

Os cumprimentos e despedidas são positivos e previsíveis. Pippo não diz que está sozinho, abandonado ou triste porque a criança saiu. A continuidade afetiva vem da identidade e da familiaridade das ações. A interface adulta controla duração e disponibilidade das atividades.

## 08  Bola basquete e percursos

### Bola com Pippo

Uma bola grande fica entre Pippo e a criança. Um toque envia a bola ao personagem, que a devolve. Arrastar pode alterar a direção dentro de uma faixa segura. A câmera permanece estável e a bola volta a uma área alcançável. A brincadeira funciona por repetição, sem contagem de passes obrigatória.

### Basquete de exploração

A cesta fica próxima e claramente visível. O toque simples produz um arremesso com trajetória legível. Na primeira configuração, a assistência favorece chegar à cesta. Arrastar poderá explorar direções com tolerância ampla. Se a bola não entrar, Pippo a recupera; não há sinal de fracasso, placar competitivo ou tempo limite.

A assistência respeita a relação entre ação e resultado. Não se teletransporta a bola para dentro do aro depois de uma trajetória incoerente. Movimento, colisão e recuperação precisam parecer parte da mesma ação.

### Percursos sem controle complexo

A criança vê um pequeno caminho com dois ou três destinos. Tocar no túnel faz Pippo caminhar até ele e atravessar. Tocar na rampa mostra uma subida e uma descida. Não existem joystick, corrida contra o tempo ou salto que dependa de reflexo. O personagem usa caminhos preparados para evitar quedas e travamentos.

| Atividade | Ação básica | Variação posterior |
| --- | --- | --- |
| Passar a bola | Tocar para enviar e receber | Duas bolas de tamanhos diferentes |
| Basquete | Tocar para arremessar | Escolher posição próxima ou mais distante |
| Túnel | Tocar no destino | Escolher entre dois caminhos visíveis |
| Rampa | Tocar para rolar a bola | Comparar duas inclinações preparadas |
| Blocos | Tocar em peça e posição | Montar ponte curta com encaixe assistido |
| Barquinho | Tocar para impulsionar | Abrir uma passagem de água simples |

### Aprendizagem ligada ao resultado

Palavras como perto, longe, grande, pequeno, dentro e fora aparecem quando a relação está visível. Cada variação introduz apenas uma mudança relevante. Percursos maiores e desafios de precisão ficam para expansões, avaliadas com responsáveis e crianças da faixa pretendida.

## 09  Animais e descoberta dos sons

### Requisito central de autenticidade

Cada animal sonoro terá gravações reais, limpas e reconhecíveis, correspondentes à espécie e ao estágio de vida representado. A aprovação de áudio será feita junto com a aparência. Não se utiliza automaticamente um pato adulto para um filhote, nem se altera a altura da gravação até ela perder sua identidade.

| Animal | Material a produzir | Conferência necessária |
| --- | --- | --- |
| Pippo | Vocalizações naturais do pato representado | Coerência entre idade visual, espécie e áudio |
| Mimi | Mugidos de vaca com início e fim limpos | Reconhecimento sem voz ou música sobreposta |
| Tico | Piados de pintinho | Não usar canto de galo ou ave diferente |
| Belinha | Balidos de ovelha | Não confundir com cabra |
| Lolo | Movimentos e expressões; som natural só se adequado | Não inventar som ou usar vocalização de sofrimento |
| Bento | Efeitos discretos de brinquedo e instrumento | Não ensinar como som de urso real |

### Descoberta livre

Tocar no animal destaca seu movimento e inicia a vocalização sem demora desnecessária. A fala de apresentação acontece antes ou depois, sem cobrir o som. Toques repetidos produzem resposta visual, mas não empilham várias gravações longas do mesmo animal. A política de repetição permite reconhecer a vocalização inteira.

### Nome e espécie

Na primeira apresentação, Pippo diz: “A Mimi é uma vaca.” A ação seguinte permite ouvir o mugido. Em repetições, pode dizer apenas “A vaca”, ou permanecer em silêncio. A onomatopeia falada é um complemento opcional e não substitui a gravação natural.

### Quem fez esse som

Um convite reproduz um som e mostra dois animais conhecidos. Tocar no correspondente faz o animal repetir a vocalização. Tocar no outro apresenta seu próprio som, seguido de espaço para comparar. Não existe buzina de erro, contagem de tentativas ou exigência de responder para sair.

### Critério de conclusão

Todos os arquivos terão origem, licença de uso, espécie, descrição e aprovação registrados. Quando não houver uma gravação adequada, o recurso fica pendente de produção; não será substituído silenciosamente por um efeito sintetizado incorreto.

## 10  Casa da Música

### Exploração musical desde a entrada

A Casa da Música mostra instrumentos grandes e separados. Escolher um aproxima a câmera e mantém o parceiro musical visível sem ocupar a área de toque. Um instrumento principal recebe foco por vez no telefone. No tablet, pode haver espaço para duas áreas de execução conjunta.

| Instrumento | Configuração proposta | Resposta ao toque |
| --- | --- | --- |
| Bateria | Bumbo, caixa, tom, prato e chimbal simplificado | Amostra correta por peça, vibração e baqueta associadas |
| Teclado | Oito teclas de Dó a Dó | Notas afinadas, tecla afunda e retorna |
| Xilofone | Cinco barras iniciais com alturas corretas | Nota e vibração da barra correspondente |
| Percussão | Tambor, chocalho e pandeiro | Timbres distintos e movimentos compatíveis |

### A criança toca e o personagem escuta

O áudio de uma tecla ou tambor é disparado no gesto, sem aguardar uma animação terminar. O personagem pode responder após uma pausa. Se a criança volta a tocar durante a resposta, o acompanhamento se reduz ou termina de forma suave, devolvendo espaço à execução.

Lolo pode repetir uma pequena ideia rítmica. Pippo pode responder com outro instrumento. O sistema usa padrões preparados e regras locais; não precisa gerar música por IA durante a sessão. A resposta não exige que a criança copie corretamente.

### Regras musicais

Sons de instrumentos mantêm sua identidade; tocar um prato não produz mugido ou fala.

Notas do teclado preservam afinação e ordem. Cores ajudam a localizar teclas, sem substituir diferenças visuais de posição.

Multitoque aceita notas simultâneas quando disponível. Limite de vozes previne saturação.

Acompanhamento opcional pode seguir uma pulsação; o toque da criança nunca é atrasado para encaixar no ritmo.

Música ambiente pode ser desligada, mantendo o instrumento audível.

### Convites musicais possíveis

Tocar e parar, alternar uma batida, ouvir dois timbres e acompanhar uma canção curta são propostas futuras. Partituras, leitura de notas, avaliação de ritmo e aulas formais não fazem parte da experiência inicial para os dois anos.

## 11  Aprendizagem durante a exploração

### Aprender durante uma ação compreensível

O conteúdo educativo será ligado àquilo que a criança escolheu. A voz nomeia um objeto enquanto ele está destacado; uma quantidade acompanha os itens colocados; um contraste aparece entre dois elementos visíveis. A criança pode continuar brincando mesmo sem responder ao convite.

| Campo | Situação proposta | Limite da atividade |
| --- | --- | --- |
| Animais | Ver, ouvir e nomear vaca, pato, pintinho e ovelha | Evitar vocalizações inventadas ou classificações confusas |
| Linguagem | Nomear bola, água, tambor e ações como abrir | Sem prova verbal ou correção de pronúncia |
| Cores | Escolher entre dois objetos de cores distintas | Não depender só da cor para navegar |
| Tamanhos | Comparar duas bolas ou dois blocos | Uma relação por vez, sem abstração longa |
| Quantidade | Colocar um item e depois outro | Começar por pequenas quantidades concretas |
| Espaço | Bola dentro da cesta ou fora dela | Palavra acompanha o resultado visível |
| Causa e efeito | Regar a flor e observar a abertura | Evitar efeitos desconectados da ação |
| Música | Explorar timbre, nota e alternância | Sem nota de desempenho |
| Rotinas | Lavar e guardar após uma brincadeira | Sem obrigação de cuidar para continuar |

### Progressão por conteúdo disponível

A primeira camada permite observar e agir. Uma segunda apresenta escolhas entre dois elementos conhecidos. Outra poderá propor sequência curta, como escolher e depois colocar. O responsável decide se ativa convites adicionais; o sistema não aumenta a dificuldade apenas porque a criança repetiu muitos toques.

### Demonstração e resposta

Pippo mostra uma ação curta, espera e aceita uma escolha diferente. Uma resposta inesperada pode virar descoberta: ao tocar na ovelha depois de ouvir a vaca, a criança escuta o balido e compara. O jogo não transforma toda interação em exercício de acertar.

### Verificação educativa

Antes de ampliar conteúdos, revisar linguagem, relações representadas e compreensão com profissional de educação infantil. As referências [1–3] orientam o desenho; não demonstram eficácia deste jogo específico. Não haverá relatório com diagnósticos, ranking ou promessa de avanço individual.

## 12  Histórias e roteiros de interação

### História inicial do jardim musical

Pippo encontra uma flor fechada perto de Mimi. A criança pode tocar nos dois animais e ouvir suas vocalizações. O regador oferece uma ação visível. Ao regar, a flor abre e Tico aparece. Um chocalho próximo permite experimentar um som e oferece uma conexão com a Casa da Música.

Chegada: “Oi! Vamos brincar?” Pippo acena; a criança já pode tocar no cenário.

Encontro: “A Mimi é uma vaca.” A vocalização ocupa seu próprio espaço.

Descoberta: “Olha o regador!” A criança seleciona o objeto e toca na flor; arrastar também funciona.

Transformação: a flor abre. “A flor abriu!” O resultado permanece visível.

Novo amigo: Tico se aproxima e pia. A criança pode ficar com ele, repetir o som ou escolher outro objeto.

Música: tocar na Casa da Música inicia a transição. Lolo apresenta uma batida e aguarda.

Conclusão opcional: guardar o chocalho e ouvir “Agora vamos bater palmas juntos?”, com espaço para participação do adulto.

### História da bola e da poça

Pippo recebe a bola e a devolve. Um passe aproxima a bola de uma poça rasa. Se a criança escolher a poça, Pippo atravessa e os pés ficam sujos. O chuveirinho permite lavar. A bola permanece disponível para continuar depois. Nenhuma etapa exige concluir a anterior para acessar outros ambientes.

### História do som que vem do campinho

Pippo escuta um mugido e olha para o campinho. O acesso visual permanece disponível. Lá, Mimi e Belinha permitem comparar dois sons. A criança pode ouvir cada uma livremente. O encerramento pode ser um encontro junto ao jardim, sem medalha, prêmio aleatório ou tela de aprovação.

### Variações e continuidade

As histórias reutilizam ações conhecidas e mudam um elemento de cada vez: o objeto, o amigo ou o destino. Não exigem lembrar instruções de uma sessão anterior. O estado de uma história pode ser reiniciado pelo responsável. O modo livre permanece disponível antes, durante e depois de qualquer convite.

## 13  Telas e controles dos responsáveis

### Telas e estados principais

| Tela ou estado | Conteúdo | Ação principal |
| --- | --- | --- |
| Entrada | Pippo e convite visual para começar | Toque que inicia a sessão e habilita áudio |
| Quintal | Companheiro, brinquedos e acessos estáveis | Escolher um objeto ou lugar |
| Atividade | Instrumento ou brinquedo em primeiro plano | Explorar, voltar ou trocar |
| Encontro | Animal destacado e ambiente simples | Ouvir, observar e interagir |
| Transição | Movimento curto e carregamento discreto | Concluir entrada ou retornar com segurança |
| Pausa | Cena estabilizada e som interrompido | Retomar, concluir ou abrir controles adultos |
| Área dos responsáveis | Configurações, recursos e ajuda | Ajustar e voltar ao jogo |

### Primeira utilização pelo responsável

Uma configuração breve permite ajustar volume, frequência de fala, movimento e duração. O idioma inicial é português brasileiro. Não será exigido cadastro infantil. O responsável pode experimentar som e controles antes de entregar o aparelho. A entrada no jogo não depende de comprar, fornecer cartão ou ativar microfone.

### Controles disponíveis

Volumes separados para fala, animais, instrumentos e ambiente, com opção de ouvir uma amostra.

Frequência das falas e dos convites; modo com menos movimento e efeitos.

Duração da sessão e forma de encerramento, com aviso discreto antes da conclusão.

Atividades disponíveis, download de recursos, espaço utilizado e remoção de dados locais.

Ajuda de instalação, suporte e informações de privacidade em linguagem adulta.

### Proteção de acesso

A área adulta terá uma barreira a testar, como sequência orientada e código configurável. Segurar um botão sozinho não deve ser tratado como proteção suficiente. Links externos, permissões e qualquer futura contratação ficam dentro da área adulta, com revisão específica antes da publicação.

### Conclusão e retomada

O encerramento respeita o ponto da ação em curso dentro de uma tolerância curta definida pelo responsável. Não inicia uma história nova. Se o aplicativo for interrompido, a retomada reabre em um estado estável e recupera áudio apenas após interação quando necessário. O jogo não controla o volume físico do aparelho; a configuração adulta deve orientar seu ajuste.

## 14  Direção de arte em 3D

### Estilo de animação infantil com identidade própria

A direção visual usará volumes arredondados, olhos expressivos e materiais suaves, com profundidade real e iluminação acolhedora. As espécies permanecem reconhecíveis. A aparência pode sugerir pelagem por massas e textura leve, evitando detalhes que prejudiquem leitura em tela pequena ou imponham custo gráfico desnecessário.

### Paleta funcional proposta

| Cor | Referência | Uso |
| --- | --- | --- |
| Amarelo Pippo | #F2C94C | Corpo do protagonista e pequenos pontos de atenção |
| Laranja bico | #E99945 | Bico e pés com contraste sobre o corpo |
| Verde campinho | #7FAE78 | Natureza e planos intermediários |
| Azul água | #83BBD0 | Água, céu e áreas tranquilas |
| Creme | #F6EEDC | Interiores e superfícies de apoio |
| Marrom madeira | #A77C55 | Estruturas e instrumentos |
| Vermelho suave | #CF7068 | Detalhes de brinquedos |

As cores são referências iniciais, a conferir sob a iluminação do jogo. Objetos essenciais usam também forma, posição e contorno. O fundo deve competir menos com os personagens e os alvos de interação.

### Pippo e o elenco

Criar estudos de frente, perfil, costas e três quartos, folha de expressões e comparação de escala entre personagens. Pippo terá uma característica permanente, como topete curto, a escolher nos estudos. Chapéus e acessórios não substituem o reconhecimento por silhueta. O desenho do corpo deve permitir caminhar, nadar, sentar e tocar instrumentos.

### Produção dos recursos visuais

A arte conceitual define aparência e enquadramento. Em seguida vêm modelagem 3D, materiais, esqueleto de animação e expressões. Uma imagem gerada não equivale a um personagem jogável; a entrega final exige modelos tridimensionais preparados para os movimentos e para o desempenho nos aparelhos alvo.

### Enquadramento e interface

Personagens e objetos principais ocupam espaço suficiente na tela. A câmera não exige controle da criança. O jogo deve adaptar o enquadramento à proporção do telefone e do tablet, respeitando recortes de tela e áreas do sistema. Textos ficam principalmente na área adulta; imagens finais e folhas de modelo serão produzidas em etapa própria.

## 15  Animação e comportamento

### Biblioteca de movimentos

Cada personagem precisa de repouso, olhar, cumprimento, deslocamento, reação ao toque e retorno suave à postura inicial. As ações especiais incluem vocalizar, receber objeto, passar bola, tocar instrumento e participar de despedida. Nem todas se aplicam a todas as espécies; o elenco terá uma matriz de movimentos por personagem.

| Grupo | Movimentos previstos | Critério visual |
| --- | --- | --- |
| Repouso | Respiração, piscar e pequenos olhares | Movimento discreto sem ruído constante |
| Interação | Perceber toque, reagir e relaxar | Causa e resposta fáceis de relacionar |
| Deslocamento | Andar, virar e parar | Pés apoiados e velocidade coerente |
| Animal | Bico ou boca e gesto associado ao som | Sincronização sem movimento humano excessivo |
| Objeto | Pegar, usar, devolver e guardar | Contato consistente entre mãos ou asas e objeto |
| Música | Ataque, movimento da peça e retorno | Som imediato e gesto associado |
| Pausa | Estabilizar e retomar | Sem salto brusco ou ação duplicada |

### Reação em três momentos

O personagem percebe, age e volta ao repouso. O tempo de preparação não deve atrasar o som do instrumento. Na vocalização animal, áudio e movimento são sincronizados no arquivo ou por marcadores. A mistura de poses permite sair de uma reação sem teletransportar o corpo.

### Interrupções e toques repetidos

Uma política por ação define se o novo toque repete, varia ou aguarda uma parte curta do gesto. Não se acumula uma fila longa de animações. A música admite repetição rápida com gestos combinados; um deslocamento mantém uma única intenção de destino. Toques durante carregamento recebem retorno sem iniciar cenas duplicadas.

### Olhar e presença

Pippo pode olhar para a criança representada pela câmera, para o brinquedo escolhido ou para um amigo. Não há câmera real nem rastreamento ocular. Expressões seguem os eventos do jogo. O comportamento é programado para parecer atento sem afirmar que compreende emoções ou sentimentos da criança.

### Definição de acabamento

Revisar pés deslizando, interseção de corpos, deformações, objetos flutuando, cortes de movimento e descompasso com áudio. A avaliação deve incluir toques fora do roteiro e troca rápida de atividades. Uma animação bonita isolada não basta se as transições falham durante a brincadeira.

## 16  Produção e funcionamento do áudio

### Quatro famílias de áudio

A produção separa voz do Pippo, vocalizações naturais, instrumentos e ambiente. Cada família possui controle de volume e regras de prioridade. Os arquivos originais ficam preservados com origem e licença. As versões de distribuição são preparadas e testadas nos navegadores e aparelhos escolhidos.

### Mixagem orientada à compreensão

Um animal destacado deve ser reconhecível sem disputa com a voz. A fala baixa o ambiente; uma apresentação pausa antes da vocalização. Nos instrumentos, o gesto da criança tem prioridade sobre acompanhamento. Limites de vozes simultâneas, ganho e duração dos efeitos evitam saturação. O controle interno não substitui o ajuste do volume físico pelo responsável.

### Execução técnica proposta

Web Audio será a base inicial para disparar amostras e controlar canais. Sons curtos serão preparados antes da atividade. O primeiro gesto habilita o contexto de áudio conforme as políticas do navegador; a retomada após bloqueio de tela é tratada explicitamente. Boas práticas de reprodução e restrições de autoplay estão nas referências [4–5].

O momento do som não depende da conclusão de um quadro de animação. Acompanhamentos usam agendamento musical, enquanto o instrumento responde diretamente ao toque. Uma biblioteca de sequenciamento só será adicionada se a complexidade justificar; não é requisito para os primeiros instrumentos.

### Inventário inicial de produção

Pippo: cumprimentos, nomes, ações, convites, alternância, encerramento e variações de silêncio.

Animais: tomadas naturais aprovadas, com metadados de espécie e idade representada.

Instrumentos: amostras por peça ou nota, sem fala embutida e sem reverberação excessiva.

Ambiente: natureza discreta, água e movimentos de objetos com limites de repetição.

### Critérios para liberar áudio

Não pode haver clique de corte, distorção ou aumento descontrolado de volume ao tocar repetidamente. Os sons precisam funcionar com os demais canais desligados. A voz deve ser compreensível em volume moderado. As vocalizações precisam de revisão de correspondência; as notas e peças musicais precisam de revisão de afinação e timbre.

## 17  Arquitetura de software

### Base técnica recomendada para o protótipo

A proposta inicial é um jogo web instalável com TypeScript, Babylon.js para cenas 3D e Web Audio para som. Modelos e animações serão preparados em uma ferramenta 3D e distribuídos em formato glTF ou GLB. A documentação do Babylon.js demonstra importação e execução de animações de personagens nesse fluxo [7]. A escolha será confirmada por um teste real de desempenho e áudio.

| Sistema | Responsabilidade | Contrato principal |
| --- | --- | --- |
| Entrada | Normalizar toque, arrastar e multitoque | Gesto com posição, alvo e identificador |
| Interação | Resolver seleção e intenção | Ação válida para a cena atual |
| Mundo | Guardar consequências e disponibilidade | Estado determinístico e recuperável |
| Personagens | Controlar poses, olhar e deslocamento | Uma ação principal com interrupções previstas |
| Áudio | Executar fala, animal e instrumentos | Prioridade, canal e limite de vozes |
| Atividades | Executar regras de cada brinquedo | Entrar, interagir, pausar e sair |
| Conteúdo | Carregar descrições, falas e recursos | Identificadores e versões verificáveis |
| Persistência | Salvar preferências e estado permitido | Migração e recuperação de dados |
| Área adulta | Configuração, ajuda e recursos | Sem acesso direto a links pela cena infantil |

### Fluxo de uma interação

O toque é convertido em intenção. O controlador da atividade verifica o estado, registra a consequência e dispara áudio e animação. Um evento de conclusão retorna ao repouso. A apresentação não altera diretamente o estado de outra atividade. Trocar de cena encerra assinaturas, animações e sons que não devem continuar.

### Conteúdo separado de código

Cada animal, objeto, fala e atividade recebe um identificador estável. Um manifesto informa arquivos, variantes, dependências, licença e versão. Histórias referenciam ações existentes em vez de duplicar sua lógica. Novas áreas devem reutilizar seleção, áudio e persistência já verificados.

### Infraestrutura inicial

O núcleo pode funcionar com arquivos estáticos e salvamento local, sem conta infantil ou serviço de IA durante a sessão. A hospedagem será escolhida após medir tamanho, tráfego e custos. Integração com MillionsNest, sincronização ou serviços pagos não são pressupostos do lançamento. Versões de dependências e ambientes serão fixadas no início da implementação.

## 18  Dados funcionamento offline e privacidade

### O que fica no aparelho

As preferências incluem idioma, volumes, frequência de falas, redução de movimento e atividades disponíveis. O estado de sessão inclui cena atual e consequências simples. Uma preferência opcional pode lembrar o instrumento escolhido. Não é necessário guardar nome, aniversário, foto, voz ou localização da criança.

| Grupo | Exemplos de campos | Política proposta |
| --- | --- | --- |
| Configuração | schemaVersion, volumes, locale, motion | Persistente e editável pelo responsável |
| Sessão | sceneId, activityId, objectStates | Restaurar somente estados seguros |
| Recursos | contentVersion, bundleId, downloadStatus | Validar pacote antes de ativar |
| Preferências | lastInstrument, enabledActivities | Local, opcional e apagável |
| Diagnóstico | Erro técnico e versão do aplicativo | Sem envio automático na primeira versão |

### Funcionamento offline

O aplicativo poderá usar service worker e cache para os recursos previamente baixados, conforme o modelo descrito pela MDN [6]. Instalar o aplicativo não garante que todo o conteúdo esteja disponível. A área adulta mostrará quais pacotes estão completos. O jogo só anuncia disponibilidade offline depois de validar as dependências da atividade.

Downloads interrompidos não substituem o último pacote válido. Atualizações são preparadas e ativadas fora de uma brincadeira em curso. Se o navegador remover dados locais, o aplicativo explica ao responsável a necessidade de baixar novamente. A capacidade de armazenamento e a retenção de cache dependem do aparelho e do navegador.

### Recuperação

Dados com formato antigo passam por migração versionada. Se houver corrupção, o jogo preserva o que puder e retorna a um estado inicial seguro. Sair da cena cancela tarefas pendentes. Bloqueio do aparelho pausa som e movimento. A retomada não reproduz falas antigas nem continua uma bola com física instável.

### Privacidade por desenho

A primeira versão não terá anúncios, rastreadores comerciais, ranking, chat entre usuários, câmera ou microfone. Relatórios automáticos e sincronização futura exigirão decisão específica, minimização de dados e revisão das exigências aplicáveis. Antes de publicar, revisar privacidade infantil, permissões, licenças e regras dos canais de distribuição, sem tratar este documento como parecer jurídico.

## 19  Escopo e etapas de desenvolvimento

### Visão completa e ordem de produção

O universo completo inclui cuidados, animais, instrumentos, bola, basquete, percursos e histórias. Produzir em etapas permite validar toque, som e animação antes de multiplicar cenários. A sequência abaixo é uma proposta; não representa funcionalidades já implementadas nem cronograma fechado.

| Etapa | Entrega concreta | Condição para avançar |
| --- | --- | --- |
| A  Concepção | Visual do Pippo, planta das cenas, roteiros e teste técnico | Identidade legível e caminho técnico viável |
| B  Experiência completa pequena | Pippo, Mimi, Tico e Lolo; jardim ligado à música; bola; tambor e teclado | Fluxo jogável com áudio, pausa, retorno e salvamento |
| C  Primeiro lançamento | Belinha; áreas essenciais; banho; basquete assistido; percurso simples; xilofone e percussão | Requisitos prioritários e revisão com famílias concluídos |
| D  Expansão | Bento, roupas, novas histórias, água e construção ampliadas | Núcleo estável e conteúdo revisado |
| E  Recursos opcionais | Microfone delimitado, outros idiomas e eventual sincronização | Justificativa de uso e validações próprias |

### Prioridades do primeiro lançamento

Modo livre, companheiro recorrente, outros animais com sons autênticos, instrumentos corretos, retorno fácil entre atividades, controles adultos e comportamento estável no aparelho têm prioridade. O basquete e o percurso entram em versões simples. Ampliar número de mundos vem depois de acertar essas relações.

### Itens fora do escopo inicial

Conversa aberta com IA, multiplayer online, loja infantil, publicidade, economia virtual, assinaturas dentro da brincadeira, mundo aberto extenso, desafios de reflexo e diagnóstico do desenvolvimento. Qualquer modelo comercial futuro será tratado apenas no fluxo dos responsáveis e não altera o acesso infantil por impulso.

### Custos e capacidade

Não há orçamento fechado. Arte 3D, animação, gravação de voz, áudio licenciado, validação e aparelhos de teste são frentes reais de produção, mesmo quando executadas com recursos próprios. Antes de contratar ou adotar um serviço, registrar limites gratuitos, custo recorrente, licença e alternativa. Não assumir que assinatura de IA inclui APIs ou geração ilimitada.

## 20  Validação e critérios de qualidade

### Validação em três frentes

O produto precisa ser compreensível, tecnicamente estável e coerente em seus conteúdos. A observação com famílias será acompanhada, breve e sem transformar a criança em objeto de avaliação. O responsável conhece a finalidade, pode interromper e não precisa fornecer gravações. A revisão educativa e de áudio acontece antes da exposição a novos conteúdos.

| Área | Verificação | Critério de aprovação |
| --- | --- | --- |
| Entrada | Iniciar e ouvir após o primeiro gesto | Sem depender de tutorial ou permissão de microfone |
| Toque | Escolher objeto e destino em telas diferentes | Sem alvos minúsculos, ambíguos ou inacessíveis |
| Animais | Ouvir cada vocalização isoladamente | Espécie correspondente e som reconhecível |
| Instrumentos | Repetição, multitoque e notas | Resposta direta, timbre correto e sem saturação |
| Movimento | Trocar de ação e tocar repetidamente | Sem saltos de pose, corpos atravessando ou fila longa |
| Navegação | Entrar, voltar e trocar de atividade | Sem exigir conclusão ou perder objeto essencial |
| Interrupção | Bloquear tela, pausar e retomar | Estado seguro e áudio sem repetição indevida |
| Offline | Abrir pacote baixado sem conexão | Todas as dependências prontas ou explicação adulta |
| Área adulta | Tentar abrir links pela cena infantil | Acesso exige a barreira adulta definida |

### Metas técnicas iniciais a medir

Como metas de engenharia, buscar execução estável de ao menos 30 quadros por segundo no aparelho mínimo escolhido e retorno visual do toque em até 100 ms na maioria das interações medidas. Áudio deve ter a menor latência prática, com medição por dispositivo e sem atraso introduzido pelo agendamento da música. Esses valores são alvos de protótipo, não resultados obtidos ou garantias para todo aparelho.

### Matriz de aparelhos

Testar Safari em iPhone e iPad, navegador Android e desktop de apoio, com versões registradas. Incluir um aparelho modesto representativo. Medir carregamento, memória, aquecimento, bateria, perda de contexto gráfico e retomada do áudio. Definir aparelhos e versões mínimos somente depois desses testes.

## 21  Requisitos e decisões pendentes

### Matriz de requisitos prioritários

| ID | Requisito | Evidência de aceite |
| --- | --- | --- |
| R01 | Modo livre como entrada | Iniciar brinquedo sem escolher missão |
| R02 | Pippo como companheiro e voz principal | Presença e falas consistentes em cenas distintas |
| R03 | Nomes e espécies associados | Apresentações aprovadas para cada animal |
| R04 | Vocalizações naturais corretas | Inventário de áudio revisado e executado no jogo |
| R05 | Instrumentos com sons próprios | Mapeamento de cada peça ou tecla verificado |
| R06 | Toque simples em ações essenciais | Completar interações sem arrastar obrigatório |
| R07 | Troca livre de atividades | Sair durante ação sem bloqueio ou corrupção |
| R08 | Ensino ligado à ação visível | Roteiros conectam palavra e objeto presentes |
| R09 | Pausa e configurações adultas | Som e movimento param; ajustes persistem |
| R10 | Ausência de cobrança por ausência | Retorno sem doença, fome ou culpa |
| R11 | Pacotes offline verificáveis | Abrir atividades baixadas após retirar conexão |
| R12 | Privacidade e recursos revisados | Sem permissões inesperadas e com licenças registradas |

### Decisões que precisam ser fechadas

Nome comercial e disponibilidade de marca; desenho e espécie visual do Pippo; estilo e elenco de voz; aparência final dos amigos; seleção de gravações animais; aparelhos mínimos; mecanismo de acesso adulto; duração padrão; hospedagem e orçamento. A visão não depende de contratar um serviço antes desses pontos serem avaliados.

### Riscos e resposta de projeto

Se o visual ficar pesado, simplificar materiais e efeitos antes de reduzir a legibilidade. Se houver confusão entre voz e som animal, separar melhor os momentos e revisar as falas. Se as dicas interromperem a criança, reduzir frequência. Se o escopo crescer, preservar R01 a R12 e adiar novas áreas. Se o reconhecimento de fala falhar, manter a brincadeira por toque como caminho completo.

### Regra para considerar pronto

Uma etapa só está concluída quando pode ser jogada no aparelho alvo, com arte e áudio correspondentes ao escopo, interrupções tratadas e problemas críticos resolvidos. Imagens, vídeos demonstrativos, código compilado e listas marcadas isoladamente não comprovam uma experiência pronta.

## 22  Fontes do projeto

### Pacotes de entrega para a equipe

Produto: mapa de telas, regras das atividades, roteiros de falas, matriz de requisitos e decisões registradas por versão.

Arte: folhas de personagens, expressões, escalas, cenários, objetos e modelos 3D com materiais e esqueletos.

Animação: arquivos fonte, clipes nomeados, transições, marcadores e matriz de ações por personagem.

Áudio: originais, versões de distribuição, mapeamento de canais e registro de origem e licença.

Engenharia: código versionado, manifesto de conteúdo, instruções de execução, pacotes e estratégia de recuperação.

Validação: aparelhos e versões testados, resultados, problemas conhecidos e evidências de aceite por requisito.

### Fontes consultadas

As referências apoiam princípios de uso e decisões técnicas. Não constituem comprovação de eficácia educativa do jogo. Consulta de referência em 26 de outubro de 2026.

[1] NAEYC — Technology and Young Children Infants and Toddlers.

https://www.naeyc.org/resources/topics/technology-and-media/infants-and-toddlers

[2] American Academy of Pediatrics — How to Make a Family Media Plan.

https://www.healthychildren.org/English/family-life/Media/Pages/How-to-Make-a-Family-Media-Use-Plan.aspx

[3] New York State Early Learning Guidelines — Toddlers.

https://earlychildhoodny.org/publications/nys-elg.php?stage=toddler

[4] MDN Web Docs — Web Audio API best practices.

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices

[5] MDN Web Docs — Autoplay guide for media and Web Audio APIs.

https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay

[6] MDN Web Docs — Offline and background operation.

https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation

[7] Babylon.js Documentation — Animating Characters.

https://doc.babylonjs.com/features/featuresDeepDive/animation/animatedCharacter

Referência de produto analisada: My Talking Tom 2, apresentação oficial da Outfit7. Utilizada para comparar cuidados, reações e brincadeiras, sem reprodução de personagens ou identidade visual. https://talkingtomandfriends.com/apps/my-talking-tom-2

## 23  Marca e localização

### Nomenclatura de trabalho

Adotar Mundo Pippo para português e Pippo World para inglês, como nomes provisórios. A grafia do personagem é Pippo, com dois p. O código interno pode usar pippo-world enquanto isso não conflitar com identificadores existentes. Não registrar domínio, publicar marca ou produzir uma identidade definitiva com base apenas nessa escolha.

### Resultado da pesquisa pública

Em 26 de outubro de 2026, a página oficial da Arsanesia apresenta Learn with Pippo como uma coletânea de jogos educativos infantis. A página institucional também descreve Pippo como personagem de sua linha de educação infantil. Isso indica uso prévio no mesmo segmento e recomenda avaliar maior diferenciação antes de fechar a marca. Não demonstra, por si só, impedimento jurídico ou disponibilidade de um nome composto.

Fontes: https://arsanesia.com/project/arsakids-learn-with-pippo/ e https://arsanesia.com/about-us/ . Não foram confirmados registro de marca, disponibilidade de domínio ou identificadores em lojas e redes. Essas verificações permanecem pendentes antes do lançamento comercial.

### Arquitetura de localização desde o início

Português brasileiro é o idioma de lançamento. Preparar inglês na arquitetura; lançamento multilíngue exige tradução e áudio revisados, não apenas troca de nome.

Manter nomes de exibição, textos, falas e recursos por idioma fora da lógica. Usar chaves estáveis e IDs neutros, como duck_main e music_house, sem depender da marca.

Separar voz falada de vocalização animal. Alterar idioma não muda a espécie, o timbre do instrumento ou sua afinação.

Configuração de idioma na área adulta; fallback definido para conteúdo ausente, sem misturar idiomas em falas da mesma sessão.

Carregar pacotes de voz por idioma. Validar cobertura das chaves, caracteres, tamanho de textos, duração das falas e disponibilidade offline.

### Critérios adicionais

R13: marca e textos substituíveis sem reescrever atividades. R14: idioma selecionado respeitado em interface, falas e pacotes. R15: português completo e revisado no lançamento; outros idiomas somente com cobertura validada. O índice principal cobre as seções 01 a 22; os complementos 23 e 24 ficam nas páginas finais.

## 24  Organização do trabalho

### Documentos e seus usos

01_CHAT_Guia_de_Decisoes_Mundo_Pippo.docx é o resumo para conversas sobre produto, personagens, nome e prioridades. 02_WORK_CODEX_Especificacao_Mundo_Pippo.docx é esta especificação completa. 03_WORK_CODEX_Prompt_de_Execucao_Mundo_Pippo.docx contém as instruções para produzir materiais no Work e executar desenvolvimento no Codex.

### Fluxo recomendado

No Chat, discutir uma decisão por vez usando o guia curto. Consultar a seção da especificação somente quando necessário. Registrar a mudança aprovada para transferência.

No Work, usar a especificação e a instrução de produção de documentos para criar roteiros, inventários e materiais de arte. Não declarar que produzir documentos equivale a implementar o jogo.

No Codex, usar especificação e prompt mestre junto de um repositório acessível. Implementar, executar, testar e registrar evidências no código versionado.

### Controle de mudanças

Uma mudança aprovada deve trazer data, motivo, requisito afetado, critério de aceite e impacto. A instrução mais recente do usuário prevalece; conflitos entre documentos devem ser apontados. O guia curto é um resumo, não autorização para eliminar requisitos da especificação. Não considerar qualquer atividade implementada sem inspecionar o projeto real.

### Uso das cotas

Work e Codex compartilham utilização segundo a documentação oficial consultada. A alternância entre eles não cria franquia adicional. Manter o contexto necessário à tarefa, evitar reconstruções completas e reutilizar recursos e verificações válidas. Não eliminar testes essenciais apenas para reduzir uso. Não é possível estimar a cota restante da conta a partir deste documento.

Fontes oficiais consultadas em 26 de outubro de 2026: https://learn.chatgpt.com/docs/pricing , https://learn.chatgpt.com/docs/projects e https://learn.chatgpt.com/docs/quickstart . Disponibilidade e limites devem ser conferidos na conta na data da execução.

### Estado desta entrega

Esta versão atualiza nome de trabalho, localização e organização do desenvolvimento. Não constitui implementação, publicação ou validação com crianças. A pesquisa de marca não está concluída. A continuidade técnica começa pela leitura do repositório e pela matriz de requisitos, mantendo o modo livre, os animais e sons reais, a Casa da Música e a aprendizagem na brincadeira.
