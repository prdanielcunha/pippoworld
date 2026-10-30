# Mãos aprovadas — revisão 27, 30/10/2026

## Decisão do responsável
O responsável rejeitou a aparência publicada da v26 e reafirmou a **segunda imagem anexada** como referência obrigatória: mãos amarelas com volume e textura de penas, abertas e fechadas. A descrição genérica “mãos compactas” não autoriza trocar essa arte por curvas, círculos ou contornos vetoriais.

O contexto recebido desta conversa registra a aprovação anterior de mãozinhas bonitas e proporcionais e de baquetas mais longas para alcançar superfícies distantes. Não temos uma transcrição literal de toda a conversa anterior. Este documento registra a decisão atual explícita e a fonte exata para evitar perda de continuidade.

## Fonte e implementação
- `dist/assets/hands-approved-v27/hands.png`: PNG original reenviado, idêntico byte a byte; SHA-256 e origem em `source.json`.
- `dist/music-rig.js`: carrega a folha junto com o corpo. Recortes preparados uma vez em Canvas; alpha suavizado no encaixe do pulso e do ombro. Mão inteira com escala uniforme e fixa, apenas rotação limitada. Antebraço com textura da mesma referência e comprimento articulado. Corpo e rosto anteriores preservados.
- Teclado e pandeiro usam as duas mãos abertas; bateria e xilofone usam as duas fechadas; chocalho usa aberta em repouso e fechada no cabo. Baquetas mantêm a extensão até a superfície, independente do tamanho da mão.
- O comparador do jogo agora inclui a folha aprovada.
- Não há fallback para as mãos geométricas rejeitadas. Se a fonte falhar, o preparo informa falha pelo fluxo existente, permitindo tentar novamente.

## Verificação nesta revisão
- Sintaxe JavaScript e diff conferidos.
- `node tests/music-rig-geometry.cjs`: 69 cenários em larguras 320/390/940, 66 contatos ativos e três verificações do pedal.
- `node tests/music-anatomy.cjs`: alcance e pedal preservados, hash da folha aprovada e presença do recurso no carregamento real. O carregamento do teste foi ajustado para VM porque o package.json da raiz usa ESM, mas os scripts do protótipo são clássicos.
- Inspeção visual no navegador remoto: teclado e bateria em desktop; teclado, xilofone, chocalho e pandeiro em frame de largura 390 px. Conferidos repouso e toque; isso não substitui Safari/iPhone físico, FPS real ou aceite visual final do responsável.

## Critérios de aceite afetados
AC musicais: a origem visual das mãos deve ser esta folha, sem palmas que aumentam por distância ao alvo; poses abertas/fechadas coerentes com tecla, pele e cabo. Manter contato musical, multitoque e cancelamentos anteriores. A bateria mantém o pedal v26, cuja anatomia/posição final continua exigindo revisão própria; esta entrega não afirma tê-lo redesenhado.

## Publicação
O endereço reportado nesta tarefa é `https://pippoworld-preview.vercel.app/`, projeto Vercel `pippoworld-preview`, equipe `team_qtUDx2cqVcgfKlO5T17JdqJP`. Publicar o commit desta revisão nesse projeto. O antigo ChatGPT Site tem publicação e histórico separados; não declarar que foi atualizado sem operação própria.
