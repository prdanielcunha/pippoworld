# Retorno musical e continuidade — v25

30/10/2026. Continuação da composição musical v24, recuperada do Site no commit 05c83f6ec6e908fe25be1b7f661fe39d64b22ee5.

- Retorno dos golpes termina no repouso, em vez de manter 68% da elevação do ataque indefinidamente. Teclado, xilofone, bateria e pandeiro usam retorno contínuo até sua altura de espera.
- Soltar uma tecla sustentada inicia retorno silencioso a partir do contato, sem gerar outro ataque de som.
- Em acordes com mais de duas notas, soltar a nota mais recente devolve a asa à nota ainda segurada que compartilhava aquela asa. O áudio continua independente; não são desenhadas asas adicionais.
- Preservados contato imediato, repetição rápida, duas asas independentes, multitoque, pausa, saída, arte, sons e a retirada do pé sobreposto da v24.
- Corrigida a descrição pública do bumbo: o pedal reage ao toque; a perna ainda não tem animação própria de acionamento. Não restaurar o pé isolado nem inventar conexão de perna.

## Verificação

Executado scripts/verify-v23.sh: todas as suítes Node, sintaxe JS, verificação dos sons/recursos e diff passaram. Casos novos cobrem acorde com três notas, retorno à nota sustentada, soltura sem ataque extra e repouso final. Revisão visual no navegador remoto: teclado e bateria/chimbal após o toque. Não é ensaio em iPhone físico, medição de FPS ou aceite final da anatomia.

## Pendências mantidas

Pose adequada da perna acionando o pedal; anatomia e naturalidade final das asas; teste Safari/iPhone físico e todas as atividades futuras da estratégia. A v25 é uma etapa de resposta musical e recuperação do backup, não encerramento do jogo.
