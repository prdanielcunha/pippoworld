# 9 Rastreabilidade e preservação dos requisitos

## Matriz R01 a R15

Origem R01 a R12: especificação, seção 21. Origem R13 a R15: complemento 23. A etapa B é parcial dentro do universo completo, mas cada interação nela incluída precisa atender integralmente às regras aplicáveis. Estado de todas as linhas: **documentado, não implementado, não verificado em aparelho, não validado em uso**. Dependências gerais: recursos aprovados do inventário, implementação futura e matriz física de testes.

| ID e requisito preservado | Material operacional e dependência específica | Evidência futura de aceite |
| --- | --- | --- |
| R01 Modo livre como entrada | 01, 02 e 04; destinos sem bloqueio de história | AC01 AC02 AC19 AC27 AC29 |
| R02 Pippo companheiro e voz principal | 03, 05 e 06; modelo, animação e locução | AC11 AC29 AC39 |
| R03 Nomes e espécies associados | 03 e 05; nomes e desenhos revisados | AC11 a AC14; Belinha em C |
| R04 Vocalizações naturais corretas | 03 e 06; origem, licença, espécie/idade e revisão | AC11 a AC15 AC30 AC36; Belinha em C |
| R05 Instrumentos com sons próprios | 04 e 06; amostras/notas e revisão musical | AC20 AC23 a AC28 AC30 AC36; restantes em C e etapas previstas |
| R06 Toque simples em ações essenciais | 02 a 04; alvos e entrada tolerante | AC01 AC05 AC15 AC16 AC21 a AC25 AC40 |
| R07 Troca livre de atividades | 01 a 04; estado confirmado e cancelamento | AC02 a AC04 AC07 AC18 AC22 AC26 AC28 AC33 |
| R08 Ensino ligado à ação visível | 01, 04 e 05; roteiro contextual | AC03 AC12 AC17 AC20 AC21 AC24 AC27 |
| R09 Pausa e configurações adultas | 02, 05 e 08; barreira, preferências, recuperação | AC06 a AC09 AC26 AC33 AC39 |
| R10 Ausência de cobrança por ausência | 01 e 08; sem medidores punitivos | AC09 AC10 AC33; cuidados futuros mantêm a regra |
| R11 Pacotes offline verificáveis | 02, 06 e 08; dependências, integridade e cache válido | AC31 AC32 AC34 |
| R12 Privacidade e recursos revisados | 02, 06 e 08; permissões, tráfego e direitos | AC08 AC32 AC35 AC36 |
| R13 Marca e textos substituíveis | 00, 05 e 06; IDs neutros e conteúdo separado | AC37 |
| R14 Idioma respeitado na interface falas e pacotes | 05 e 06; idioma adulto e cobertura validada | AC38 |
| R15 Português completo outros idiomas só validados | 05 e 08; revisão de texto e áudio pt-BR | AC38; inglês pendente para E |

R01 a R15 são prioritários e transversais. Um caso de teste pode cobrir mais de um requisito, mas não autoriza concluir o requisito para os conteúdos futuros ainda ausentes. O arquivo 07 define resultados observáveis; o executor acrescentará responsáveis, implementação, evidências e defeitos a esta matriz no repositório.

## Cobertura das seções da especificação

Esta matriz inclui exigências descritas em prosa. A fonte integral acompanha o pacote; resumos aqui não substituem suas regras e exemplos. “B” significa aplicação no trecho, não comprovação de entrega do jogo. “Futuro” mantém o requisito para a etapa adequada.

| Origem | Obrigações e conteúdo preservados | Destino e etapa |
| --- | --- | --- |
| E01 Visão | Exploração, companheiro, continuidade, consequência e saída; sem promessa cognitiva | 00, 01 e 08; B e completo |
| E02 Princípios | Toque completo, arrastar opcional, poucas escolhas, alvos sem sobreposição, câmera previsível, sem tempo/reflexo, participação adulta e limites educativos | 01, 02, 04 e 07; B |
| E03 Mundo | Todos os ambientes e conexões; entrada pelo quintal, retorno consistente, uma transição, transporte explícito, flor persistente e nova sessão acolhedora | 01, 02, 04 e 08; B e futuro |
| E04 Personagens | Pippo, Mimi, Tico, Lolo, Belinha, Bento; espécies, silhuetas, sons corretos, gestos, humor sem dor | 03, 06 e 08; B, C e D |
| E05 Comunicação | Voz principal natural pt-BR, frases curtas, silêncio, sem falsa compreensão; microfone apenas expansão sem escuta contínua | 03, 05 e 08; B e E |
| E06 Modo livre | Sem missão inicial; explorar, descobrir e convite no mundo; estados, cancelamento, ajuda única, adaptação sem rótulos e brincadeira conjunta | 01 a 05 e 07; B |
| E07 Cuidados | Banho, alimentos adequados, acessórios, guardar/descansar, sem fome/doença/culpa ou compras | 08 e fonte integral; C/D e sequência pendente |
| E08 Bola e percursos | Passe, cesta assistida, trajetória coerente, túnel/rampa, blocos/ponte, barco/água, variações e linguagem espacial | 04, 07 e 08; B, C e D |
| E09 Animais | Gravação real e idade certa, sem sofrimento, licença e revisão, nome/espécie, comparação sem erro e repetição sem coro | 03, 05, 06 e 08; B e C |
| E10 Música | Bateria de cinco peças, teclado de oito notas, xilofone de cinco barras, três percussões, prioridade do toque, multitoque, alternância e ambiente opcional | 04 a 08; B e futuro |
| E11 Aprendizagem | Animais, palavras, cores, tamanhos, pequenas quantidades, espaço, causa/efeito, música, rotinas; progressão opcional e revisão educativa | 01, 04, 07 e 08; B e futuro |
| E12 Histórias | Jardim musical com chocalho, bola e poça, som do campinho, palmas conjuntas, abandono e reinício sem prêmio | 01, 04, 05 e 08; B parcial e futuro |
| E13 Telas adultas | Primeiro ajuste, quatro volumes, frequência, movimento, duração, atividades, recursos, dados locais, ajuda/privacidade, barreira e saída tolerante | 01, 02, 05, 07 e 08; B |
| E14 Arte | Identidade própria 3D, paleta, folhas, escala, expressões, rigs, câmera/recortes e modelos reais | 02, 03, 06 e 07; B e futuro |
| E15 Animação | Perceber/agir/repousar, olhar programado, contato, transição, cancelamento e revisão fora do roteiro | 03, 04, 06 e 07; B |
| E16 Áudio | Quatro canais, prioridade, arquivo preparado, primeiro gesto, retomada, som sem espera de animação, sem distorção | 04 a 07; B |
| E17 Arquitetura | TypeScript/Babylon/Web Audio/glTF propostos e teste antes de fixar; entrada, interação, mundo, personagens, áudio, atividades, conteúdo, persistência, adulto | 00, 04, 06 e 08; implementação posterior |
| E18 Dados e offline | Preferências locais, estados seguros versionados, migração, integridade, atualização segura, cache removido, privacidade sem diagnóstico enviado | 02, 06 a 08; B |
| E19 Etapas | A concepção e teste; B trecho; C primeiro lançamento; D expansão; E opcionais; limites, custos e escopo inicial | 00, 06 e 08; completo |
| E20 Validação | Técnica/educativa/uso separadas, famílias sem gravação obrigatória, metas 30 FPS/100 ms, aparelhos e medições | 07 e 08; B e completo |
| E21 Requisitos | R01 a R12, pendências, riscos e pronto somente jogável com evidência | 07 a 09; B e completo |
| E22 Fontes e entregáveis | Produto, arte, animação, áudio, engenharia e validação; referências sem alegar eficácia | 00, 06, 07 e fontes integrais |
| E23 Marca e localização | Marca provisória, pesquisa inconclusiva, nomes fora da lógica, IDs neutros, pt-BR, pacotes e R13 a R15 | 00, 05, 06 e 08; B e E |
| E24 Organização | Chat decide, Work prepara, Codex desenvolve; mudança datada; documento não é código; não inferir estado do repo ou cotas | 00, 08, 09 e fontes integrais |

## Cobertura do prompt de execução

| Bloco do segundo anexo | Tratamento neste pacote |
| --- | --- |
| Prompt Work e continuidade | Materiais editáveis concretos; versão, origem, revisão e fontes integrais; sem implementar ou publicar |
| Auditoria e matriz | R01 a R15 e todas as seções preservadas; inspeção de repositório fica para o trabalho autorizado de desenvolvimento |
| Produto infância marca e autonomia | 00 a 05 e 08; escolhas reversíveis identificadas; sem custo ou mudança central implícita |
| Animais música arte e aprendizagem | 03 a 08; inventário e aceite próprios; futuro preservado |
| Engenharia estado offline e privacidade | 02, 04 e 06 a 08; contratos documentais, sem alegar código ou teste |
| Etapas e melhorias | 08; problema, solução, benefício, custo e teste para mudança |
| Testes documentação e conclusão | 07 a 09; nenhuma aprovação inventada; evidências e limitações exigidas |
| Primeira ação do prompt mestre | Leitura dos anexos cumprida; auditoria/técnica não iniciadas porque o pedido atual proíbe implementação |

## Conflitos e esclarecimentos

Não foi necessário remover requisito dos anexos. A leitura adotada separa obrigatoriedade do jogo completo da ordem de produção. O roteiro linear da história vira percurso opcional; Tico aparece na encenação após a flor, mas não fica bloqueado antes. O chocalho local preserva a história; o transporte continua condicionado a suporte explícito. Tambor único no trecho não substitui bateria completa no plano. Nome e inglês não recebem aprovação comercial ou linguística por constarem como nomes de trabalho.

Novas decisões aprovadas devem atualizar requisitos, roteiro, inventário e casos afetados em conjunto. O executor deve expandir a matriz quando encontrar detalhes de implementação ou orientações locais; não reduzir o conjunto original aos únicos 15 IDs resumidos.
