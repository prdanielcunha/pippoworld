# Primeiro trecho jogável — relatório técnico

26/10/2026 · branch `dev/first-playable` · base `c630116`. O commit de entrega aparece no histórico Git e no PR. Prévia técnica executável; não representa aceite final de arte, áudio, desempenho físico ou compreensão infantil.

## O que funciona

Entrada por um toque, modo livre, quintal com passe assistido de uma bola, jardim com Mimi e Tico acessíveis antes da rega, seleção do regador e toque na flor, água e abertura confirmada, chocalho local, Casa da Música com Lolo, tambor e teclado C4–C5. Música acessível diretamente sem flor. Retorno contextual preserva a flor da sessão. Quatro personagens e ambientes são objetos 3D reais em Babylon.js, feitos com geometria procedural provisória; reações suaves ao toque e redução de movimento. Casa e canteiro são destinos tocáveis; acessos visuais grandes também ficam na faixa inferior.

Pausa, perda de foco e interrupção gráfica estabilizam ações, liberam notas e interrompem som. Continuar exige gesto. Concluir é livre e a nova sessão não traz carência, culpa ou punição. Área adulta com soma aleatória e confirmação, cancelamento e foco contido; holding sozinho não autoriza acesso. Preferências locais v1: quatro volumes, frequência de fala, resposta musical opcional, redução de movimento, duração e disponibilidade de jardim/música. Exclusão local e recuperação segura de dados inválidos. Tempo adulto conta apenas enquanto se joga; no limite, espera ação segura por no máximo três segundos, sem cronômetro infantil.

Web Audio é criado/ativado pelo primeiro gesto. Quatro buses independentes: voz, animais, instrumentos e ambiente. Gain com suavização, compressor e teto de 12 fontes registradas; soltura por pointer ID, liberação curta e cancelamento por saída/pausa. Multitoque de teclas com liberação independente; captura de ponteiro e cancelamento. Instrumento recebe prioridade; padrão curto opcional de Lolo aguarda 2,2 segundos e cede ao novo gesto. Modelos e áudio são substituíveis por IDs estáveis, com nomes/textos fora da lógica.

**Voz e gravações naturais estão ausentes.** O jogo não inventa nem sintetiza vocalizações animais. Tocar nesses personagens produz reação visual, sem aceite sonoro. Lolo é silencioso de propósito. Tambor, teclado e chocalho usam síntese instrumental local, explicitamente provisória. Detalhes e fontes no [inventário](RECURSOS.md).

## Abrir a prévia

No ambiente desta tarefa, `npm run dev` foi iniciado em `0.0.0.0:5173` e a resposta HTTP local foi conferida. Abra a porta **5173** na interface do ambiente; na máquina do servidor, `http://localhost:5173`. Não foi publicada URL pública nem implantação de produção. Processos de desenvolvimento não devem ser presumidos vivos depois de encerrar o ambiente.

Para reproduzir no checkout da branch:

```sh
npm ci
npm run dev
```

Toque ▶ para entrar; ⚙ abre a barreira adulta. Não precisa de conta, credenciais, banco, API ou serviço pago. Build estático com `npm run build`; `npm run preview` usa 4173.

## Verificações e evidências

- Node 24.19.0, npm 11.9.0, Chromium 154.0.8037.57, Debian/Linux, headless com WebGL/SwiftShader. Dependências e lockfile da base mantidos; `npm ci` executado.
- `npm run typecheck` e `npm run build`: passaram. Aviso conhecido: chunk principal aproximadamente 1,06 MB minificado / 256 kB gzip, acima de 500 kB. Não foi ocultado; carregamento em aparelho ainda precisa medição.
- Suíte Playwright: percursos em 390×844, 820×1180, 1180×820 e 844×390, áudio de oito alturas agendadas, sinal real via AnalyserNode, repetição, multitoque CDP, soltura independente, pausa, blur, configurações, barreira incorreta/cancelada/correta, corrupção, versões desconhecidas, recuperação e ausência de WebGL. Inclui duração com relógio controlado. **Resultado: `npm run validate` passou (tipos, build e 12 testes de fluxos). Após afastar Pippo das teclas, novo build passou e cinco testes adicionais passaram (framebuffer/câmera e quatro layouts). Total: 17 casos executados e aprovados, zero ignorados.**
- Tráfego monitorado nos percursos: somente servidor local; nenhum erro JavaScript observado nesses caminhos. Sem permissões de câmera/microfone, contas, publicidade ou telemetria automática no código.
- Capturas de telefone/tablet examinadas; a revisão encontrou pétalas deformadas por escala, corrigidas para abertura interpolada com proporções próprias. Teste de multitoque inicialmente encerrava o contato errado no protocolo CDP; cenário corrigido e reexecutado. Viewports maiores excederam os 30s da base em renderização por software; limite do executor passou a 90s, sem remover interações ou confundir isso com desempenho em dispositivo.
- Fontes DOCX extraídas e confrontadas por parágrafo com os Markdown: conteúdo integral das fontes presente, diferenças de quebra de linha de nomes/tabelas e capa/índice da preparação. Foram lidos AGENTS, README, todos os Markdown de docs e os complementos 23/24. Documentos originais permanecem intactos.

Estas são verificações **automatizadas e inspeção visual em Chromium**. Não se realizou escuta profissional, medição de latência física, Safari/iPhone/iPad, Android físico, bloqueio real de aparelho, aquecimento, bateria, validação educativa ou observação com crianças. 30 FPS/100 ms continuam metas; não resultados. Não há aceite global do trecho B enquanto faltarem seus materiais finais.

## Decisões de implementação e limites

A base TypeScript/Vite/Babylon foi aproveitada sem reinício e sem novas dependências. Estado seguro e preferências ficaram em `src/game/state.ts`; entrada/intenção e fluxos em `src/main.ts`; apresentação/fábrica substituível em `src/scene/yard.ts`; mixagem em `src/audio/mixer.ts`; identidade/recursos em `src/content/`. Interrupções cancelam tarefas em vez de guardar trajetória, nota ou fala antiga. Preferências persistem em localStorage, consequência segura em sessionStorage (recarregar a aba), e concluir limpa a sessão. Esquema desconhecido/corrompido retorna ao padrão seguro; nenhuma migração legada adicional é necessária porque a base não persistia dados.

A barreira de soma + confirmação é escolha reversível para impedir toque casual e cumpre a restrição de não usar somente segurar. Não é autenticação de identidade nem solução validada com famílias. Duração inicial sem limite evita impor padrão ainda não aprovado. Resposta de Lolo fica desligada inicialmente; fala configurável tem integração preparada, porém depende da locução. Chocalho não é transportado; suporte/guardar dedicado e aproximação narrativa de Tico seguem pendentes. Arrasto direcional da bola não foi produzido; o caminho essencial por toque funciona. Arrasto da rega está integrado como alternativa, a conferir fisicamente.

Sem service worker, cache validado, download transacional ou promessa de uso offline. Gestor de pacotes, integridade e atualização segura continuam pendentes. Não se escolheu hospedagem nem se contratou serviço. Pipeline GLB/rigs ainda deve ser validado com os modelos finais; a fábrica procedural atual fornece o ponto de substituição sem alegar importação já exercitada.

Consultas técnicas atuais (26/10/2026): [MDN AudioContext.resume](https://github.com/mdn/content/blob/main/files/en-us/web/api/audiocontext/resume/index.md) e [MDN setPointerCapture](https://github.com/mdn/content/blob/main/files/en-us/web/api/element/setpointercapture/index.md), lidas via raw oficial; versões Babylon/Vite/TypeScript mantidas e fontes anteriores registradas na base. Foi aplicada a skill cloud-environment-runtime para rede/execução e a skill verification para conferir fluxo de entrada → estado/áudio local → consequência apresentada; não existe API/backend a validar.

## Materiais e atividades seguintes

[Inventário e licenças](RECURSOS.md) e [matriz atual R01–R15/E01–E24/AC01–40](MATRIZ.md) registram evidências e pendências sem reduzir os documentos originais. Produzir/aprovar folhas de personagem, escala, modelos/rigs e animações finais; voz pt-BR e gravações naturais licenciadas de patinho, vaca e pintinho; revisar instrumentos e mixagem. Validar barreira/alvos com responsáveis, Safari em iPhone/iPad, Android e aparelho modesto, depois revisão educativa/sonora e observação com famílias.

Conteúdos C/D/E permanecem: Belinha, Bento, cuidados, alimentação/descanso, campinho, basquete, percursos, água/barco/blocos, xilofone, bateria completa, pandeiro e expansões. Não foram transformados em botões bloqueados ou removidos do plano.

## Capturas finais examinadas

- [Quintal em telefone emulado](evidencias/quintal-telefone.png).
- [Jardim após rega](evidencias/jardim-telefone.png).
- [Teclado em telefone emulado](evidencias/teclado-telefone.png).
- [Teclado em tablet emulado](evidencias/teclado-tablet.png).
