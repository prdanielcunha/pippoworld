# Mundo Pippo — estado da produção

28 de outubro de 2026. Este registro complementa, sem substituir, a especificação 1.1 e a estratégia aprovada. Uma funcionalidade parcial não representa aceite final nem teste com crianças.

## Decisão de recuperação

As versões 7 e 8 introduziram uma montagem de corpo sem patas, pés isolados e ligações desenhadas. A avaliação do responsável rejeitou o resultado. A publicação foi revertida para a versão 6. Esta continuação conserva as poses completas da versão 6, recupera os controles diretos da versão 7 e **não carrega nem desenha o rig rejeitado**. Seus arquivos permanecem no histórico e não são uma base aprovada para novas animações.

O ciclo de oito imagens continua limitado: diferenças anatômicas entre poses, cadência visual discreta, falta de giro e transições de chegada. Reduzir a frequência pela distância e melhorar a resposta ao destino não equivale a resolver animação. Sem aprovação final do andar.

## Atualização de fidelidade

O registro [IDENTIDADE_PIPPO.md](IDENTIDADE_PIPPO.md) substitui a descrição antiga de arte abaixo: o jogo agora usa os arquivos originais anexados, com máscara em runtime. Perfil gerado e rig de pernas rejeitados não carregam. Doze expressões e poses originais de contato foram integradas. As poses continuam exigindo animação intermediária; não declarar fluidez final.

## Entrega anterior de música/jardim, preservada

- Lugares conectados: quintal, música e jardim, com retorno livre.
- Teclado: oito notas naturais C4 a C5, A4=440 Hz; multitoque e teclas 1–8 no computador. Não há teclas cromáticas nesta versão do brinquedo.
- Tambor, xilofone, chocalho e pandeiro: timbres **sintetizados de protótipo**, distintos; nenhum é apresentado como gravação acústica final. Bateria completa ainda ausente.
- Uma resposta musical curta após 1,25 s sem dedos nas teclas. Até três sons, uma vez, sem fila; qualquer novo toque interrompe a resposta. Pode ser desligada.
- Pippo permanece visível e reage discretamente; não existe ainda gesto anatômico de tocar instrumento.
- Jardim: um toque no regador ou flor inicia a rega. A flor abre e permanece aberta ao alternar atividades na mesma sessão. Sair durante a rega cancela a ação incompleta. Sem áudio de água nesta etapa.
- Pausa, saída, aba oculta e perda de foco cancelam sons e respostas pendentes. O áudio só é retomado em novo toque, sem reproduzir notas antigas.
- Preferências locais: volume dos instrumentos, som desligado, resposta musical e redução de movimento. Nenhuma conta ou dado da criança.
- Carinho por toque e arrasto longo, direções visíveis e setas da página recuperados sobre as poses completas.

## Inventário de toda a visão preservada

| Frente prevista | Estado verificável nesta entrega | Trabalho que falta |
| --- | --- | --- |
| Modo livre | Entrada no quintal; acesso direto a três lugares | Melhorar acessos ilustrados e compreensão sem leitura |
| Pippo e identidade | Folhas originais, doze expressões, carinho, aceno e poses sociais | Articulação e transições consistentes entre as poses |
| Caminhar para os lados | Deslocamento com destino único, setas e botões | Reconstrução visual do ciclo, giro e partida/parada sem cortes |
| Pular e agachar | Estudos de poses acessíveis no quintal | Intermediários e transições; voo curto ainda ausente |
| Bola | Rolagem, receber/segurar/devolver por poses originais, pausa e interrupção | Intermediários e contato contínuo entre bola e asas |
| Casa da Música | Teclado, tambor, xilofone, chocalho e pandeiro tocáveis; alternância curta | Revisão de timbres, áudio final, bateria completa, movimentos próprios e acompanhamento opcional |
| Jardim | Regar, abrir flor e preservar consequência na sessão | Mimi, Tico, chocalho no cenário, narrativa conectada e natureza sonora |
| Amigos | Não implementados | Arte aprovada de Mimi, Tico, Belinha e Lolo, reações e escala coerente |
| Sons naturais | Não implementados | Gravações corretas por espécie, origem/licença e revisão; coelho sem vocalização inventada |
| Voz do Pippo | Não implementada | Voz consistente, frases curtas, nomes e ações visíveis, pausas sem sobreposição |
| Cuidados | Não implementados | Alimentar, banho e descanso como faz de conta, sem medidores de culpa |
| Basquete | Não implementado | Cesta assistida sem precisão obrigatória e retorno da bola |
| Percursos | Não implementados | Rampa, túnel e destinos preparados, sem controle difícil |
| Blocos | Não implementados | Empilhar com um toque, derrubar e recomeçar |
| Água e barquinho | Não implementados | Interações de água, poça, barco e conexão com banho |
| Histórias | Não implementadas | Jardim musical e bola/poça como convites opcionais |
| Casa/campinho/cantinho tranquilo | Não implementados | Cenários conectados; não apenas botões de destinos vazios |
| Área adulta | Ajustes de áudio e movimento locais | Entrada adulta apropriada, encerramento tranquilo, volumes por família quando os canais existirem |
| Offline | Não implementado | Manifesto de dependências, cache validado e atualização sem interromper brincadeira |
| Idiomas/marca | Português; nome de trabalho preservado | Catálogo externo de textos, nome substituível e inglês com cobertura revisada |
| Privacidade | Sem câmera/microfone, contas infantis, anúncios ou telemetria | Revisão de distribuição, inventário final de recursos e licenças |
| Bento e expansões | Preservados no plano | Somente após o núcleo funcionar com qualidade |

## Rastreabilidade dos requisitos

R01, R06, R07 e R10 têm caminhos jogáveis nesta fatia. R02 é parcial (presença, sem voz); R03 e R04 pendentes; R05 parcial (notas mapeadas e síntese, sem acervo final); R08 parcial (ação visível e textos, sem fala); R09 parcial (preferências e pausa, acesso adulto a aprimorar); R11 pendente; R12 parcial (nenhuma coleta/permissão, revisão final ausente). R13–R15 de marca/localização permanecem parciais ou pendentes. Nenhum desses registros significa aceite em Safari/iPhone.

## Verificação e limites

Testes de comportamento: multitoque, seis vozes máximas, afinação por frequência/octava, liberação/cancelamento antes de desbloquear áudio, prioridade da criança, resposta apenas após silêncio, pausa sem fila, troca de lugar durante rega e música, persistência da flor na sessão e preferências locais. Regressões de bola, direções, gestos e alpha continuam passando.

A revisão no navegador detectou e corrigiu a propagação do clique do instrumento para o painel, que reiniciava a seleção e cortava o som; a regressão agora verifica que somente os botões selecionam instrumentos.

Chromium remoto: abertura de lugares, teclado, tambor e demais seletores, pausa, rega e retorno ao jardim; revisão de largura de 390 px. Estes testes não comprovam timbre agradável, latência física, FPS ou qualidade final no iPhone. Sem validação com crianças. Não há geração adicional de arte nem serviço pago de áudio nesta entrega.

## Próximos critérios de produção

1. Resolver o andar em um ensaio visual isolado e comparável, sem substituir a publicação por uma montagem rejeitada.
2. Revisar o áudio desta Casa da Música no aparelho e preparar movimentos e timbres finais antes de chamá-la de concluída.
3. Integrar arte aprovada de amigos e gravações naturais com origem/licença; dar vida à história do jardim.
4. Implementar as demais atividades da tabela em fluxos completos com saída, pausa e retorno, mantendo este inventário atualizado.


### Continuidade do pescoço — revisão 13

O recorte anterior terminava na linha mais estreita do pescoço e deixava uma emenda horizontal durante risada/carinho. Agora cada retrato conserva até 24 linhas adicionais do colar original. A transparência começa dez linhas antes da ancoragem e progride até o fim do recorte; abaixo da ancoragem, o colar fica limitado à silhueta real do tronco. Cabeça e corpo são compostos uma vez em uma superfície única em cache, que recebe o movimento como unidade. Não houve geração nem alteração dos arquivos de imagem originais. As doze expressões foram comparadas no navegador sobre fundo de contraste; Safari em iPhone físico continua sem validação. Esta revisão corrige a montagem, sem acrescentar quadros à caminhada.

### Refinamento de interação e presença — entrega posterior à revisão 13

O carinho passa a consultar a silhueta do sprite realmente desenhado, com pequena tolerância na borda e inversão das transformações. A pose deitada tem área de cabeça própria. Sentar e descansar continuam até uma nova intenção, sem retorno automático após 4,5/7 segundos. Piscadas automáticas não substituem expressão escolhida, movimento ou perfil de chegada. Respiração discreta na figura inteira mantém a base no chão e respeita movimento reduzido. A resposta do olhar usa tempo, mantendo comportamento equivalente a 30/60/120 FPS em simulação; isso não mede FPS do aparelho.

Não foram geradas imagens nem acrescentados quadros à caminhada. Verificação de toque transformado/transparência, persistência de repouso e prioridade de expressão foi acrescentada aos testes. O documento `CONTINUAR_EM_NOVA_CONVERSA.md` contém a passagem de contexto e os locais de código, histórico e fontes.

Conferência no Chromium remoto desta entrega: pose deitada manteve-se durante a revisão; toque sobre a cabeça deitada acordou com carinho na cabeça; toque na barriga em pé acionou carinho na barriga. Não houve geração de arte adicional. Os demais limites de animação e de aparelho real permanecem.


### Giros a partir da vista visível — revisão 15

Continuação da versão 14, sem regeneração de arte. Corrige o giro desnecessário ao retomar o mesmo sentido depois de uma chegada: o perfil direito não passa mais pelo quarto esquerdo/frente para caminhar à direita (e vice-versa). A inversão durante o giro começa na vista efetivamente exibida; mudar apenas a distância preserva o progresso do giro. O giro usa vistas adjacentes originais, 80 ms por vista, sem deslocamento durante a sequência. Perfis intermediários são preparados antes de habilitar a interação. Parar no ponto atual cancela um giro pendente.

Verificação: 11 suítes Node aprovadas, incluindo `tests/turn-continuity.cjs` (dez pares vista/direção, retomada, retarget, inversão, pivô, movimento reduzido e interrupções). Sintaxe dos três JS alterados conferida. Comparação no Chromium remoto com 24 capturas determinísticas dos mesmos instantes: retomada do perfil direito, inversão aos 200 ms e caminhada/chegada à esquerda. Evidências em `evidence/pippo-giros-comparacao-v15.jpg` e `evidence/pippo-inversao-comparacao-v15.jpg`. Para repetir: `python3 scripts/review-turns.py`, abrir `/__review.html` na prévia suportada, clicar Comparar versões; depois executar `python3 scripts/review-turns.py --clean` antes de empacotar. A página de ensaio não é publicada.

A caminhada conserva as quatro poses, a cadência e os recortes da versão 14. Não há interpolação de patas, sobreposição de personagens ou nova modelagem. Partida/parada e atuação entre poses continuam discretas: esta entrega melhora a coerência dos giros e comandos, não conclui a fluidez do andar. Próxima prioridade: ensaio de intermediários consistentes da caminhada, aprovado visualmente antes da integração. Safari/iPhone físico, FPS e latência reais continuam sem validação. Todo o inventário de atividades permanece vigente.


### Continuidade de velocidade ao mudar destino — revisão 16

Continua a versão 15. A rota agora recebe a velocidade corrente quando o destino muda no mesmo sentido, preservando posição e fase dos passos. O perfil de velocidade tem entrada contínua, trecho de percurso e frenagem até zero. A partida normal sem velocidade herdada mantém matematicamente a curva da versão 15. Destinos muito próximos limitam a velocidade de entrada para frear sem ultrapassar o alvo; inverter o sentido zera a entrada para o giro. Redimensionamento também preserva velocidade quando há percurso restante e cancela giro sem rota.

Doze suítes Node aprovadas, incluindo `tests/motion-continuity.cjs`: continuidade de velocidade, quatro tamanhos, dois sentidos, frenagem próxima sem recuo/ultrapassagem, chegada exata, posição/fase preservadas, pausa, interrupção por carinho e equivalência em partições simuladas de 30/60/120 FPS. Esses testes não medem FPS/latência de aparelho. Sintaxe de `app.js` e `interaction.js` conferida.

Comparação no Chromium remoto antes de substituir a publicação: mesma posição inicial, mesma troca de destino e instantes 0/50/100/200 ms. Aos 50 ms após a troca, v15 percorre 1,66 px e a candidata 7,94 px; aos 100 ms, 6,65 e 15,80 px. São deslocamentos da simulação, não latência de toque nem uma nota de qualidade. Evidência: `evidence/pippo-retarget-v16.jpg`. Reprodução: `python3 scripts/review-retarget.py`; abrir `/__retarget.html` na prévia suportada e clicar Comparar caminhada. Remover o ensaio com `python3 scripts/review-retarget.py --clean` antes de publicar.

Ensaio de arte: uma geração nativa baseada em `assets/canon/movement.jpg` e `views.png`, seguida de uma correção direcionada das patas. Ambos os resultados repetiram fases de contato e não resolveram a alternância entre apoio próximo/distante. **Rejeitados para integração**. Nenhum desenho gerado entrou em `dist/`, nenhuma fonte aprovada foi alterada e a caminhada permanece com quatro poses. Não usar estes ensaios como novos recursos aprovados. Evitar repetir a mesma abordagem sem mudar o método de produção; mais células semelhantes não formam uma caminhada completa.

Próxima prioridade visual: produzir e aprovar fases de passagem/avanço dos pés anatomicamente distintas, em ensaio com apoio verificável, mantendo perfil e proporções originais. A partida/parada visual ainda é discreta; esta revisão elimina o reinício de velocidade ao mudar destino, sem concluir a animação. Todas as atividades e pendências da tabela continuam preservadas. Safari/iPhone físico e validação com famílias permanecem pendentes.
