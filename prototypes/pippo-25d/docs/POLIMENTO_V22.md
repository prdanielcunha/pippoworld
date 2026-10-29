# Atuação e jardim — versão 22

29/10/2026. Continuação da v21. Esta é uma etapa de acabamento da música e jardim, não encerramento do jogo.

## Alterações

- Bateria acústica compacta vista pela plateia: chimbal à direita da tela (esquerda do músico), caixa próxima às pernas, tom à esquerda, prato à esquerda, bumbo menor no chão e pedal. Caixa metálica rasa, tom com casco e pernas, chimbal com dois pratos, prato e estantes em tripé. O kit contém três tambores e dois alvos de pratos, não uma bateria convencional de cinco tambores.
- Pippo sentado no banco com duas baquetas, figuras completas de prontidão, alcance aos pratos, golpe perto da caixa/tom e acionamento do bumbo. A caixa e o tom acompanham a altura de contato calculada da pose em telas largas/estreitas. São poses-chave temporizadas; não há simulação esquelética nem animação contínua da técnica. O bumbo não recebe a pose de golpe de baqueta.
- Teclado com asas estendidas e banco, xilofone com duas malhetas, maraca segurada e levantada, pandeiro sustentado por uma asa e tocado pela outra. O som continua imediato, independente da animação ou do carregamento de arte. Mantidos os 26 excertos reais, todos os hashes e o multitoque da v21. Movimento do dedo no chocalho também repete ataques; o toque simples continua suficiente.
- Jardim: Pippo segura um regador e o inclina durante a rega. A própria lata desenhada é alvo de toque, além do botão e flor. Gotas partem do espalhador e chegam à terra do vaso; solo escurece e flor abre gradualmente em três segundos, sem cronômetro mostrado à criança. Repetir não cria fila. Sair cancela rega incompleta; a flor já aberta permanece na sessão. A duração da rega usa o tempo decorrido ativo, independente do número de quadros, enquanto a caminhada mantém seu passo limitado anterior. Pausa congela o ciclo; reduzir movimento torna as gotas estáticas. Sem áudio de água nesta entrega.

## Arte e implementação

Sete folhas novas, 16 poses completas em `dist/assets/activity-v22/`, derivadas da referência original `assets/canon/model.png` com a ferramenta de imagem embutida. O desenho aprovado não foi substituído no quintal. Atlas v20, seus recortes restaurados, originais, pernas, pescoço e bochechas permanecem byte a byte iguais. As novas poses precisam da avaliação visual de Daniel; não confundir derivação da referência com aceite do usuário.

Conversão PNG → WebP sem perdas, com `exact=True`, conferindo igualdade de todos os bytes RGBA decodificados, inclusive RGB invisível. Não foram aplicados recorte por cor, erosão, alpha novo ou montagem de membros/pescoço. Manifesto registra fonte, SHA256 dos PNGs gerados e WebPs, dimensões e ancoragem de cada quadro. Os WebPs são fontes visuais completas e reversíveis a PNG; não reproduzem os metadados/C2PA do arquivo PNG original. As folhas são carregadas por atividade/instrumento, não todas na entrada. Falha de imagem mantém a figura aprovada anterior e não interrompe os sons.

`activity-art.js` cuida das figuras completas e do alvo do regador. `canonical-art.js` conserva o renderizador original e delega apenas as atividades novas; o carinho continua usando a silhueta alpha e inclinação da figura inteira nas novas poses, sem remontar olhos ou bochechas. Não há olhos fechando nas poses novas. `activities.js` mantém a prioridade da criança, cancelamento e consequências da sessão. `app.js` fornece estado de golpe/regador. As peças e o vaso são gráficos nativos SVG/CSS, sem novas dependências.

O cenário usa `overflow:clip`: o foco de uma peça não pode rolar o contêiner por causa do chão/estantes que ultrapassam seus limites. Esse defeito foi observado no navegador (77 px de deslocamento interno) e corrigido antes da entrega.

## Pesquisa da bateria

Guia primário Yamaha: https://www.yamaha.com/en/musical_instrument_guide/drums/play/ e https://www.yamaha.com/en/musical_instrument_guide/drums/mechanism/ . Caixa/bumbo formam a base, chimbal é um par de pratos acionado por pedal, configuração pode variar. A disposição foi interpretada como vista do público e simplificada para cinco alvos grandes. Não foram baixadas artes da Yamaha nem alteradas as licenças sonoras.

## Limites e sequência

Asas ainda alternam poses, sem interpolação anatômica; sentar no banco é estado posado, não um clipe completo de aproximação e sentada. Contato contínuo de cada uma das oito teclas com uma asa específica e técnicas detalhadas da percussão seguem pendentes. O gesto curto de bumbo e pedal não é uma simulação biomecânica. Refinar intermediários a partir destas fontes, sem regenerar todo o personagem a cada ação.

Caminhada mantém quatro poses e não está aprovada como fluida. Voz, amigos e suas vocalizações reais, cuidados, basquete, percursos, água/barquinho, blocos e histórias opcionais continuam no planejamento integral. Seguir ESTRATEGIA.md. Nenhum marco B/C encerra os requisitos D/E.

Teste físico no Safari/iPhone, revisão auditiva com alto-falante real, desempenho, observação educativa e aceite visual do responsável continuam pendentes. O ensaio estreito usa iframe de 390 px em Chromium e eventos programáticos; não substitui dedos reais.

## Verificação reproduzível

`node tests/activity-art.cjs`: carregamento sob demanda, mapeamento dos cinco golpes, alcance em tela estreita e alvo do regador transformado. `tests/activities.cjs`: rega não abre antes do fim, pausa/cancelamento, flor persistente e multitoque. Suítes anteriores protegem rosto, atlas, contornos, bola, carinho, destinos e sons.

`python3 scripts/review-polish.py`: página interna `__polish-review.html`, com atuação dos cinco instrumentos e quadro determinístico de rega, usando o código real. Limpar com `--clean`. O quadro de rega intermediária avança o relógio do módulo explicitamente para 1500 ms; a conclusão também é conferida com o relógio normal. Comparar com evidence/v21-*.jpg e capturas v22. Não publicar páginas de ensaio.

Publicação no mesmo Site e cópia no GitHub continuam operações separadas.

Resultado técnico: 16 suítes Node, validação dos 26 áudios e das 7 folhas/16 poses, sintaxe dos JS aprovados. A conversão sem perdas conferiu igualdade integral dos pixels RGBA e mantém hashes no manifesto. Repetidos no navegador os ensaios de oito notas e dois tambores com foco forçado nas peças e scrollTop=0. Evidências v22 mostram atuação, rega e flor aberta; capturas de desenvolvimento em largura estreita antecedem a última correção de foco, e `v22-bateria-final.jpg`/`v22-jardim-final.jpg` mostram a composição corrigida.

Conferência final: rega completou no relógio normal do navegador, `--pour: 1`, rótulo de flor aberta e água desligada. A contagem por tempo ativo corrige o alongamento da ação em cadências baixas; o relógio limitado da bola/caminhada e o avanço no primeiro quadro após retomar foram preservados pelas regressões. Captura `v22-flor-final.jpg`.
