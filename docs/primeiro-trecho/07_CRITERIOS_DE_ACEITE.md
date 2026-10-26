# 7 Critérios de aceite por interação

## Como registrar evidência

Todos os casos começam em estado **não executado**. Registrar versão/commit futuro, aparelho, sistema, navegador e versões, configuração de fala/movimento, passos, resultado observado, evidência, defeito e responsável. Emulação e teste físico são registros distintos. Não preencher aprovação a partir deste documento.

Executar as ações por toque simples primeiro, depois gesto opcional. Verificar som com os demais canais desligados; repetir com a mixagem normal. Cobrir toque repetido, troca de ação, pausa e retomada em momentos diferentes. Um resultado tecnicamente correto não comprova compreensão infantil; a observação acompanhada com famílias tem registro próprio.

## Entrada navegação e controles

| Caso | Procedimento e resultado exigido | Requisitos |
| --- | --- | --- |
| AC01 Entrada | Começar por um toque, habilitar áudio quando permitido e chegar ao quintal sem missão, tutorial longo, cartão ou microfone | R01 R06 R12 |
| AC02 Caminhos livres | Percorrer os três caminhos do arquivo 01; acessar música antes da flor e sair de toda atividade sem concluí-la | R01 R07 |
| AC03 Retorno | Ir quintal → jardim → música → jardim; flor permanece; bola continua recuperável no quintal | R07 R08 |
| AC04 Transição | Tocar várias vezes em destino durante carregamento; uma transição e um Pippo, sem fila ou entrada duplicada | R06 R07 |
| AC05 Alvos | Tocar bordas, espaços entre objetos e áreas próximas ao sistema em telefone/tablet; nenhum alvo essencial minúsculo ou seleção arbitrária | R06 |
| AC06 Pausa | Pausar no passe, rega, som animal, nota e resposta de Lolo; áudio e movimento param; nenhum som fica preso | R09 |
| AC07 Retomada | Bloquear tela/perder foco e voltar; estado seguro, gesto de áudio quando exigido, sem fala antiga nem ação duplicada | R07 R09 |
| AC08 Área adulta | Tentar abrir configurações, links e permissões a partir do jogo; barreira validada exigida; segurar sozinho não basta | R09 R12 |
| AC09 Configuração | Alterar quatro volumes, frequência de fala/dicas, movimento, duração e atividades; reiniciar e conferir persistência | R09 R10 |
| AC10 Saída | Concluir pela pausa ou limite adulto; saída possível sem guardar; despedida única, sem novo convite, culpa ou perda de energia | R07 R10 |

## Personagens e jardim

| Caso | Procedimento e resultado exigido | Requisitos |
| --- | --- | --- |
| AC11 Pippo | Tocar no corpo; ouvir pato natural aprovado com gesto correspondente, separado da voz falada; companheiro coerente nas três cenas | R02 R03 R04 |
| AC12 Mimi | Tocar em Mimi; mugido natural reconhecível e nome/espécie em espaço separado; sem sobreposição de fala | R03 R04 R08 |
| AC13 Tico | Ouvir piado antes e depois de regar; som é de pintinho; tocar durante aproximação não atravessa objetos ou bloqueia ação | R03 R04 R07 |
| AC14 Lolo | Tocar no corpo; reação visual sem vocalização inventada; som de tambor só com ação instrumental visível | R03 R04 R05 |
| AC15 Repetição animal | Tocar rapidamente no mesmo animal e alternar amigos; retorno visual em cada toque, sem coro, fila longa ou som preso | R04 R06 R07 |
| AC16 Seleção da rega | Tocar regador e flor completa a ação; tocar outro objeto cancela; arrastar é alternativa, sem requisito de precisão | R06 R07 |
| AC17 Transformação | Água atinge flor antes da abertura; flor abre, permanece em troca de cena e reage à nova rega sem fechamento brusco | R08 R07 |
| AC18 Flor interrompida | Sair/pausar antes e depois de confirmar abertura; resultado corresponde ao estado confirmado, sem abrir ao fundo ou resetar estado válido | R07 R09 |
| AC19 Tico livre | Escolher Tico sem tocar no regador; interação completa disponível. A história não funciona como desbloqueio | R01 R07 |
| AC20 Chocalho | Tocar e ouvir timbre próprio, repetir sem saturar, guardar e sair; se houver transporte, um objeto e lugar coerente nas duas cenas | R05 R07 R08 |

## Bola e música

| Caso | Procedimento e resultado exigido | Requisitos |
| --- | --- | --- |
| AC21 Passe | Um toque envia e recebe; trajetória contínua, contato com Pippo, retorno alcançável e câmera estável | R06 R08 |
| AC22 Bola interrompida | Repetir toques, arrastar para fora e sair no meio do passe; uma bola, nenhum passe em fila e recuperação segura | R06 R07 R09 |
| AC23 Tambor | Tocar uma vez e rapidamente; ataque sonoro no gesto sem esperar baqueta/pulso; timbre correto, sem distorção ou clique | R05 R06 |
| AC24 Teclado | Tocar as oito teclas em ordem e isoladas; oito alturas afinadas de Dó a Dó, posição correta e tecla correspondente | R05 R08 |
| AC25 Multitoque | Tocar dois ou mais alvos simultâneos no aparelho compatível; instrumentos respondem; soltar um dedo não cancela outros | R05 R06 |
| AC26 Cancelamento de nota | Arrastar entre teclas, perder contato e sair/pausar; notas liberam, sem repetição descontrolada ou tecla presa | R05 R07 R09 |
| AC27 Alternância | Fazer pausa, ouvir padrão opcional, voltar a tocar durante resposta; padrão e fala cedem; não há correção ou obrigação de copiar | R01 R05 R08 |
| AC28 Troca musical | Trocar tambor/teclado durante ataque; atividade antiga cancela, novo instrumento responde e retorno fica acessível | R05 R07 |
| AC29 Silêncio | Repetir passes, notas e sons com poucas falas e dicas desligadas; exploração completa, sem narração compulsiva ou falas acumuladas | R01 R02 R09 |
| AC30 Mixagem | Isolar cada canal e depois combinar; instrumento não vira animal, voz não cobre mugido, ambiente desligado não silencia notas | R04 R05 R09 |

## Recursos dados localização e qualidade

| Caso | Procedimento e resultado exigido | Requisitos |
| --- | --- | --- |
| AC31 Offline completo | Validar pacote, retirar conexão e abrir todas as atividades do trecho com seus sons; prontidão só após dependências completas | R11 |
| AC32 Offline incompleto | Interromper download, simular falta de espaço/cache removido/arquivo ausente; manter versão válida quando possível e orientar adulto | R11 R12 |
| AC33 Recuperação de dados | Carregar dados antigos e corrompidos; migrar ou voltar a estado seguro, preservando o recuperável, sem fila ou punição | R07 R09 R10 |
| AC34 Atualização | Preparar versão nova durante uso; sessão não interrompe e pacote só é ativado em momento seguro | R07 R11 |
| AC35 Privacidade | Conferir permissões, dependências e tráfego; núcleo sem cadastro infantil, câmera/microfone, publicidade, rastreio comercial ou envio automático de diagnóstico | R12 |
| AC36 Licenças | Conferir origem, autor, licença, espécie/idade e revisão de cada recurso; provisórios e ausências não recebem aprovação final | R04 R05 R12 |
| AC37 Marca substituível | Trocar nomes de exibição por configuração de conteúdo em revisão técnica; lógica, estado e atividades preservados | R13 |
| AC38 Idioma | Português completo em interface adulta e falas; idioma indisponível não mistura frases; inglês não recebe estado pronto sem seu pacote validado | R14 R15 |
| AC39 Arte em execução | Observar contatos, silhuetas, rig, bico/boca, transições e redução de movimento em uso fora do roteiro; sem interseção, deslize ou câmera manual obrigatória | R02 R06 R09 |
| AC40 Desempenho | Medir FPS, resposta visual e áudio no aparelho mínimo candidato; buscar 30 FPS estáveis e até 100 ms na maioria dos retornos visuais; documentar limites | R06 R09 |

## Procedimento de revisão sonora

Revisor ouve vocalização sem ver o nome e confere a espécie/idade com o registro de origem e a aparência proposta. Documenta reconhecimento, conforto e ausência de sofrimento; não tratar impressão subjetiva isolada como comprovação científica. Um revisor musical confere afinação e identidade de cada nota/peça. Verificar repetição rápida e reprodução em volume moderado, sem tentar controlar o volume físico do aparelho por software.

## Matriz mínima de ambientes de teste

Safari em iPhone, Safari em iPad, navegador Android e desktop de apoio, com versões registradas. Incluir aparelho modesto representativo. Medir carregamento, memória, latência sonora, perda de contexto gráfico, aquecimento e bateria com método e tempo de observação declarados. Escolher os mínimos suportados após teste real. Emulação ajuda na navegação, mas não comprova calor, latência ou estabilidade física.

## Observação acompanhada com famílias

Depois da revisão técnica, educativa e sonora, observar brevemente se a criança inicia uma ação, percebe a consequência, repete ou troca de atividade e consegue parar com ajuda do responsável. O adulto pode interromper e não precisa fornecer vídeo, voz, nome ou outros dados da criança. Registrar dificuldades de alvo, dicas excessivas, confusão de sons e saída, sem diagnóstico ou ranking.

O trecho B só recebe aceite quando os casos aplicáveis passam, arte/áudio correspondem ao escopo, problemas críticos estão resolvidos e limitações estão declaradas. Resultados de compreensão infantil têm estado separado dos testes técnicos. Compilação, botões existentes, vídeo conceitual e documentação aprovada não comprovam uma experiência jogável pronta.
