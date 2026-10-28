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
