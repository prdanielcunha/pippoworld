# Contato musical, caminhada e entrada no banco — v23

29/10/2026. Continuação da v22 motivada pelas quatro capturas do responsável: golpes fora das superfícies, baquetas encobertas e gesto preso em repetições rápidas. Esta rodada não encerra as atividades futuras do jogo.

## Comportamento entregue

- Cada ataque de áudio aciona um golpe próprio; em áudio suspenso, a reação acompanha o início real do sample após o desbloqueio. Ataques cancelados não geram gestos atrasados. Com som desligado, permanece o retorno visual.
- As duas asas são articuladas e as pontas dos instrumentos usam a geometria real das teclas/peças no layout. Malheta toca a lâmina; baqueta toca pele ou arco do prato, afastada do poste. Uma camada transparente acima dos instrumentos impede a baqueta de sumir atrás da caixa. Bumbo aciona pé/pedal, nunca baqueta.
- Pandeiro sustenta uma asa e recebe golpes da outra; maraca acompanha ataques e deslocamentos de toque, mouse ou caneta. Repetição rápida reinicia contato/retorno sem fila nem trava de 300 ms. Amplitude e duração respondem aos intervalos tocados. Silêncio permite descanso.
- Teclado mantém notas independentes e segura a asa enquanto a nota está pressionada. Duas notas simultâneas, inclusive vizinhas, têm asas independentes. Mais de duas notas conservam áudio/teclas independentes, mas o dedilhado detalhado por pena continua simplificado; não simular oito braços.
- Três expressões inteiras: atenção, concentração e alegria. Sem montar olhos, bochechas ou pescoço separados; sem sobrepor dois rostos em transição. Pequeno balanço corporal acompanha a intensidade. Não há interpretação de emoções da criança.
- A resposta de três sons preserva os intervalos da frase da criança, em vez de notas fixas de 340 ms. Interrupção tem prioridade e não conserva uma frase antiga para outra resposta.
- Instrumentos limitam largura pelo tamanho do personagem em telas largas, preservando alcance plausível. Em telas estreitas continuam grandes para toque.
- Entrada opcional de 1,6 s: aproximação andando, volta para frente, abaixamento e sentada. Um toque a interrompe imediatamente para tocar. Pausa congela o tempo; saída cancela; movimento reduzido vai direto ao estado pronto. As teclas são liberadas quando som e arte estão prontos; falhas oferecem nova tentativa.

## Caminhada e preservação da identidade

Quatro poses originais preservadas, acrescidas de quatro fases de passagem/avanço produzidas com referência ao perfil original de bico fechado e olho pequeno. O primeiro ensaio de sentada foi rejeitado por pernas longas/coxas humanas; a correção de tornozelos curtos é a única integrada. Fontes finais e prompts em `sources/v23/` e `PROMPTS_V23.md`.

A caminhada usa 32 amostras de uma malha aplicada à figura completa. Cabeça, bochechas e pescoço não são recortados nem deformados; a malha atua abaixo da barriga. Apenas uma figura é desenhada por amostra, evitando pés duplicados por crossfade. Os alvos matemáticos têm apoio fixo, mas a deformação aplicada é limitada a 12 px horizontais e 8 px verticais na base de 400 px para não esticar a anatomia. Portanto, o teste da lei de apoio não comprova ausência absoluta de deslizamento na arte renderizada. Parada interpola até apoio mais próximo em 240 ms, sem trocar bruscamente a figura inteira. Destinos, velocidade herdada, giros por vistas e cancelamentos originais permanecem.

32 amostras não significam 32 desenhos novos, rotação 3D nem rig 3D completo. O torso ainda pode variar ligeiramente entre fontes pintadas e giros mantêm vistas discretas. A sentada interpola verticalmente três figuras completas; não é uma simulação biomecânica. O aceite visual final pertence ao responsável.

## Arquivos e recursos

- `music-performance.js`: relógio ativo, asas independentes, pé, retorno, andamento e intensidade.
- `music-rig.js`: registro de asas pintadas, contatos DOM, instrumentos em canvas, camada de frente e expressão inteira.
- `gait-motion.js` / `gait-art.js`: alvos de apoio, malha limitada da figura inteira, preparação e parada.
- `station-motion.js` / `station-art.js`: aproximação, giro, sentada e interrupção.
- As 26 gravações e suas licenças permanecem inalteradas. Referência técnica da bateria: https://www.yamaha.com/en/musical_instrument_guide/drums/play/ e /drums/mechanism/ . Vista da plateia: mão direita do músico aparece à esquerda; chimbal pode usar mão cruzada; pé direito no bumbo.
- PNGs gerados conservados fora do diretório publicado; WebP sem perdas preserva todos os bytes RGBA. Manifesto em `assets/music-rig-v23/manifest.json` registra hashes e pontos opacos reais de articulação. Os atlas aprovados v20 e os originais continuam byte a byte idênticos.
- Sem serviços pagos, microfone, câmera, cadastro ou nova dependência de runtime. Cache de caminhada: 256 px em janela estreita e 400 px em larga; preparado em lotes de duas amostras por frame. Valores de memória são inventário, não benchmark físico.

## Verificação

19 suítes Node, sintaxe de todos os JS, validação de 26 gravações, sete folhas v22 e quatro folhas v23. Novos casos: 80 ataques rápidos, contato/retorno por ataque, pé separado, mãos cruzadas, duas notas vizinhas, nota segura/solta, andamento, cancelamento e frase irregular de 120/210 ms. Preparação do áudio só aciona o callback visual quando um sample realmente inicia.

Ensaio no Chromium remoto: 69 contatos em larguras de iframe 320, 390 e 940 px, medindo distância ao alvo e alpha real da camada desenhada. Inclui oito notas de cada instrumento melódico, cinco peças da bateria, maraca e pandeiro. Conferência de duas notas distantes, sequência rápida/expressão alegre, entrada no banco interrompida por tecla real e galeria das fases da caminhada. As capturas e o JSON ficam em `evidence/`. Reproduzir a página de ensaio copiando `scripts/review-musical-v23.html` para `dist/__music-review.html`; removê-la antes de publicar. `scripts/verify-v23.sh` executa a verificação técnica.

## Ainda requer aparelho real

Não foram realizados Safari/iPhone físico, revisão auditiva por alto-falante do aparelho, benchmark de FPS/latência nem observação educativa com a criança. O navegador remoto e eventos programáticos não substituem isso. Ver `TESTE_IPHONE_V23.md`. Também não há aceite visual do responsável para as novas artes. Não declarar funcionamento perfeito ou encerramento do jogo completo.

