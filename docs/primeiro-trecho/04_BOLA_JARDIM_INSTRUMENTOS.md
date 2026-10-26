# 4 Funcionamento da bola do jardim e dos instrumentos

## Bola no quintal

ID proposto: `ball_main`. Uma bola azul grande começa entre a criança e Pippo. O caminho completo é um toque na bola: ela vai até Pippo, que a recebe e devolve à região inicial por trajetória contínua. Não depende de arrastar, apertar no tempo certo ou atingir um alvo preciso. Arrastar pode mudar direção numa faixa segura; a física ou trajetória assistida deve conservar a relação visível com o gesto.

Estados: disponível → enviada → recebida → devolvida → disponível. O instante de contato define recepção, quique e devolução. A bola não teletransporta entre asas, chão e câmera. Sons de contato são curtos, limitados e ligados ao contato real. A câmera permanece estável.

Durante um passe, novos toques têm resposta visual discreta, sem criar bolas ou enfileirar passes. Ao voltar a estar disponível, um novo toque inicia outro. Trocar de ambiente cancela a intenção e devolve a bola a um ponto alcançável; o retorno não retoma uma trajetória antiga. Arrastar para fora da área, soltar o dedo fora da tela e perder o foco recuperam a mesma bola sem punição.

Proposta de fala contextual: “A bola azul!” na primeira escolha, somente se a cor visível for realmente azul. Repetições em silêncio. Não contar passes automaticamente. Duas bolas de tamanhos diferentes, basquete, poça e rampa permanecem no planejamento futuro.

## Jardim e flor

IDs propostos: `watering_can`, `flower_main`. Há uma flor fechada, um regador grande e espaço de encontro com os animais. Toque no regador seleciona; toque na flor rega. Arrastar o regador sobre a flor é alternativa equivalente. Seleção tem destaque por forma ou contorno além da cor; tocar em outro objeto cancela sem consumo ou erro.

Estados da flor: fechada → recebendo água → aberta. Proposta inicial: uma aplicação curta válida basta para completar a abertura, permitindo perceber água e transformação sem repetição obrigatória. Se a aplicação for interrompida antes da confirmação, conservar progresso visual confirmado ou retornar ao estado anterior de modo coerente; definir o instante de confirmação no controlador. Na redução de movimento, usar uma mudança curta e clara, preservando o efeito causal.

A água atinge a flor no mesmo lugar em que a abertura se inicia. Não abrir a flor por tempo de inatividade, toque em outro animal ou simples entrada no jardim. A flor aberta permanece na sessão, inclusive ao entrar e sair da música. Regar novamente continua possível, com pequena reação de água e pétalas; não fecha a flor abruptamente para refazer o espetáculo. O adulto pode reiniciar a história em fluxo próprio.

Tico pode aproximar-se depois da abertura, mas já está acessível. Não conceder pontos, coleção, prêmio aleatório ou desbloqueio por regar. O regador não esvazia nem exige compra, espera ou reposição. Não implementar rio, barco, rampa ou ciclo de jardinagem completo para cumprir esta interação.

## Chocalho de ligação

ID proposto: `shaker_story`. A fonte coloca um chocalho junto da descoberta musical. Neste trecho, tocar produz uma amostra correta de chocalho, com movimento correspondente, sem aula ou seleção extra de instrumentos. Ele não pode tocar mugido ou melodia.

Detalhamento proposto para transporte delimitado: após tocar, um novo toque na Casa da Música leva o mesmo chocalho ao suporte visível na sala. Um toque no suporte guarda; ao retornar ao jardim, ele está no seu ponto de origem. Não existe inventário infantil ou duplicação. Se o transporte não for produzido, usar apenas a conexão visual e sonora local, registrar a diferença e manter a interação e o guardar localmente; não apresentar uma animação de levar sem estado correspondente.

O transporte é opcional conforme a fonte, que exige suporte explícito para cada objeto levado. O chocalho sonoro local é parte do roteiro preparado. A percussão completa, incluindo pandeiro, continua para o lançamento.

## Tambor

ID proposto: `drum_single`. O primeiro foco musical é um tambor único de percussão com timbre próprio, não a bateria completa de cinco peças. Um toque na membrana dispara a amostra no gesto, junto do início da resposta visual. O som não aguarda baqueta, animação ou próximo pulso de acompanhamento.

Cada novo toque válido pode produzir novo ataque mesmo durante o retorno visual. O instrumento admite multitoque onde suportado, com limite de vozes e ganho, sem saturação ou fila de animações. O número de vozes é parâmetro de teste; não fixar um limite sem ouvir repetição rápida. A animação combina ataques recentes e retorna suavemente. A baqueta ou pata de Lolo toca a superfície de modo coerente, sem obrigar uma animação completa para cada áudio.

Após pausa voluntária, Lolo pode responder com uma ou duas batidas preparadas. Proposta de ajuste: esperar pelo menos dois segundos sem toque antes da resposta; a criança que volta a tocar cancela o restante do padrão, com saída suave. Uma resposta não se encadeia em outra sozinha. Dicas desligadas impedem essa demonstração automática; tocar livremente continua completo.

## Teclado

ID proposto: `keyboard_eight`. Oito teclas contíguas em ordem crescente: Dó, Ré, Mi, Fá, Sol, Lá, Si, Dó. Proposta para produção sonora: Dó4 a Dó5, a revisar por conforto e timbre; a oitava exata é escolha reversível. Teclas têm posição, separação e relevo legíveis, com cor apenas complementar.

| Tecla da esquerda para a direita | Nota proposta | Arquivo de instrumento proposto |
| --- | --- | --- |
| 1 | Dó4 C4 | keyboard_c4 |
| 2 | Ré4 D4 | keyboard_d4 |
| 3 | Mi4 E4 | keyboard_e4 |
| 4 | Fá4 F4 | keyboard_f4 |
| 5 | Sol4 G4 | keyboard_g4 |
| 6 | Lá4 A4 | keyboard_a4 |
| 7 | Si4 B4 | keyboard_b4 |
| 8 | Dó5 C5 | keyboard_c5 |

Toque inicia a nota imediatamente. A tecla afunda e retorna ao soltar; a nota tem liberação curta para evitar corte seco. Novo toque reinicia o ataque conforme o envelope, sem prender a tecla. Arrastar de uma tecla para outra pode produzir notas sucessivas, sem ser necessário. A fronteira não dispara duas notas por um único contato ambíguo.

Multitoque permite acordes no aparelho que o suporte. Rastrear cada contato: levantar um dedo não deve encerrar notas de outros dedos. Cancelamento de gesto, saída, pausa e perda de foco liberam todas as notas. Oito teclas devem continuar grandes no telefone; ajustar enquadramento e orientação com teste, sem esconder notas atrás de navegação. Sem acompanhamento obrigatório, teoria musical, partitura ou avaliação de afinação da criança.

## Contrato de áudio e alternância

Voz, animais, instrumentos e ambiente têm volumes separados. A fala reduz ambiente; o animal destacado não compete com a fala. Toque instrumental tem prioridade sobre voz contextual e acompanhamento. Não atrasar nota ou batida para encaixá-la em grade musical. Padrões são preparados e locais, sem IA geradora na sessão. Música ambiente pode ficar desligada e o instrumento continuar audível.

Nenhum efeito de navegação imita animal. Proposta de mixagem: um animal em primeiro plano, uma fala ativa e limite medido de instrumentos; estes limites não autorizam fala e mugido simultâneos. Prever saídas curtas sem clique de corte. Medir latência em cada aparelho e distinguir atraso do arquivo, do navegador e do agendamento.

## Contrato de estados e falhas

Entrada normalizada → intenção válida → atualização de consequência → disparo coordenado de áudio e movimento → repouso ou nova intenção. Apresentação visual não modifica diretamente outra atividade. Cada brinquedo documenta entrada, interação, pausa, saída e recuperação.

Se faltar áudio natural, o animal fica explicitamente pendente e a experiência não recebe aceite sonoro. Modelos e sons provisórios podem apoiar teste técnico identificado, mas não constituem acabamento. Se faltar o instrumento ou sua amostra, não apresentar botão silencioso como interação pronta. Nenhuma troca de arquivo pode mascarar recurso errado.
