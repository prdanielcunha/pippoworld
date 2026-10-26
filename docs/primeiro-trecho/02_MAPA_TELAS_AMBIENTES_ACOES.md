# 2 Mapa de telas ambientes acessos e ações

## Mapa lógico

Entrada leva ao quintal. Do quintal há acesso ao jardim e à Casa da Música. Jardim e Casa da Música têm ligação direta em ambos os sentidos. O retorno preserva essa topologia: música → jardim quando veio do jardim; música → quintal quando veio do quintal. Os destinos principais permanecem reconhecíveis e estáveis, sem exigir que a criança entenda uma pilha de telas.

Detalhamento proposto: a Casa da Música apresenta duas saídas visuais distintas, porta do jardim e porta do quintal, mais retorno consistente ao lugar de origem. Em telefone, o enquadramento evita exibir três saídas concorrentes: manter uma saída contextual e um retorno; os dois destinos continuam alcançáveis em no máximo duas transições. Validar a compreensão antes de fixar o desenho.

## Telas e enquadramentos do trecho B

| ID | Elementos e ações principais | Acessos e retorno |
| --- | --- | --- |
| entry | Pippo; começar por toque; acesso adulto protegido | Começar → yard; adulto → adult_settings |
| yard | Pippo e bola; ouvir pato, enviar e receber | Jardim → garden; casa musical → music_house; pausa |
| garden | Flor e regador em foco; Mimi e Tico por encontros | Música → music_house; retorno → yard; pausa |
| animal_focus | Animal escolhido grande, reação e vocalização | Voltar ao mesmo jardim, selecionar outro alvo ou sair |
| garden_flower | Regador e flor; regar, cancelar, repetir | Retorno ao jardim sem perder consequência confirmada |
| music_house | Lolo e escolhas grandes de tambor e teclado | Instrumento → enquadramento de atividade; jardim ou quintal |
| drum_focus | Tambor grande; Lolo ao lado; Pippo sem obstruir | Trocar para teclado ou voltar à sala; saída sempre alcançável |
| keyboard_focus | Oito teclas contíguas; tocar uma ou várias | Trocar para tambor ou voltar à sala; saída fora das teclas |
| pause | Cena estável; continuar; concluir; acesso adulto | Continuar na atividade segura; concluir → farewell |
| adult_gate | Barreira de acesso com validação pendente | Autorizar → controles; cancelar → pausa ou entrada |
| adult_settings | Volumes, idioma, dicas, movimento, duração, atividades | Testar amostras, salvar e retornar |
| adult_resources | Pacotes, estado offline, espaço e remoção de dados | Ajuda, privacidade e suporte apenas aqui ou em fluxo adulto |
| farewell | Despedida única e cena tranquila | Retorna à entrada sem reiniciar ou convidar automaticamente |

`animal_focus`, `garden_flower`, `drum_focus` e `keyboard_focus` são enquadramentos ou estados, não mundos novos. Transição e recuperação são estados do fluxo, sem telas técnicas para a criança. O cantinho tranquilo da visão completa não se confunde com a pausa; permanece acesso opcional adulto a produzir em etapa posterior.

## Distribuição dos alvos

No quintal, três escolhas infantis em destaque: Pippo, bola e jardim. A Casa da Música fica reconhecível em segundo plano e é acessível por toque, sem se transformar em quinto ou sexto brinquedo chamativo. No jardim, o foco muda entre conjunto flor e regador, encontro com um amigo e ligação musical. Mimi e Tico não vocalizam automaticamente ao mesmo tempo.

Três ou quatro escolhas por enquadramento são a referência inicial da fonte, sujeita à observação real. Se um telefone não comportar isso, ampliar o objeto escolhido por enquadramento automático previsível. Nunca reduzir um alvo essencial a um ponto minúsculo. Alvos ampliados têm áreas disjuntas; zonas ambíguas não selecionam um animal arbitrariamente. Forma, posição e contraste complementam cor.

Pausa e retorno ficam fora da faixa mais usada dos instrumentos e respeitam recortes, bordas e gestos do sistema. A criança não controla câmera ou joystick. A troca de orientação, se oferecida, conserva visibilidade e área sensível; orientação preferencial e suporte completo serão decididos após teste. Nenhuma ação depende de ler rótulos.

## Ações e estados compartilhados

| Estado | Entrada e consequência | Nova ação ou interrupção |
| --- | --- | --- |
| Exploração | Alvos e reações disponíveis | Selecionar objeto, amigo ou destino |
| Seleção | Objeto destacado e destino válido legível | Usar; cancelar por toque livre; escolher outro objeto |
| Execução | Som e movimento coerentes; consequência confirmada no instante definido | Aceitar ação compatível; substituir intenção; sair |
| Convite | Uma sugestão opcional, sem fila | Ignorar, agir diferente ou aceitar |
| Transição | Um destino ativo; carregamento controlado | Toques não duplicam navegação; falha retorna com segurança |
| Pausa | Som e movimento parados; entrada suspensa | Continuar em estado seguro ou concluir |
| Recuperação | Estado confirmado recuperado ou reinicialização acolhedora | Retomar com gesto se necessário; ajuda adulta para recursos |

Trocar de cena encerra assinaturas, tarefas, sons e convites sem sentido no destino. Uma intenção antiga não pode mover Pippo depois de retomar. Não bloquear a saída para terminar uma animação longa.

## Fronteiras entre estado de sessão e persistência

- Na sessão: flor aberta/progresso confirmado, posição recuperável da bola, cena atual e seleção válida. Uma troca de ambiente não reinicia a flor.
- Entre sessões: idioma, volumes, frequência de falas e convites, redução de movimento, atividades permitidas, pacotes e preferência opcional de instrumento.
- Após interrupção: recuperar apenas consequências seguras, com versão de dados. Trajetórias, notas sustentadas e convites pendentes não persistem.
- Nova sessão e corrupção: configuração acolhedora e recuperação sem castigo; migração ou retorno seguro quando não for possível recuperar dados.

## Área adulta e offline

Separar pausa de autorização adulta. Pausar é imediato; chegar a links, permissões e configurações protegidas exige a barreira definida. Segurar um botão sozinho não atende à proteção da fonte. Código e sequência orientada são candidatos, não mecanismo certificado.

Um pacote B pode depender de subpacotes de cenas, áudio comum e voz pt-BR. A lista adulta mostra o conjunto inteiro como pronto somente depois de validar dependências e integridade. Download interrompido conserva o último pacote válido. Não ativar atualização no meio da brincadeira. Cache removido, falta de espaço e arquivo ausente exigem explicação adulta e recuperação, sem promessa de offline baseada apenas na instalação.

## Ambientes futuros preservados

Casa e cuidados, campinho completo, cesta, blocos, banho, túnel, rampa, água, barquinho e cantinho tranquilo continuam no mapa completo das fontes. Não criar atalhos falsos nem caminhos visualmente convidativos sem destino neste trecho. Ao ampliar, manter as conexões originais: casa e quintal com campinho, jardim e música; campinho com quintal e jardim; jardim com campinho e música; música com jardim e quintal.
