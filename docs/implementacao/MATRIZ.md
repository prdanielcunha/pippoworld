# Matriz de implementação — complemento à matriz original 09

Data: 26/10/2026. Estado do trecho B, sem alterar [R01–R15, E01–E24 ou etapas C/D/E](../primeiro-trecho/09_RASTREABILIDADE_REQUISITOS.md). Prioridade dos R permanece central. Evidência técnica em Chromium Linux com WebGL por software e viewports emulados; nenhuma validação física ou com famílias. Nenhum requisito global recebeu aceite final.

| Requisito / origem | Estado e implementação | Evidência e pendência |
| --- | --- | --- |
| R01, E01/E06/E12 | Implementado modo livre, entrada por gesto, música antes da flor, Tico livre | `scene.spec.ts`, quatro viewports, três percursos. Histórias completas futuras preservadas |
| R02, E04/E05/E14/E15 | Parcial: Pippo 3D nas três cenas e reação/recepção; voz preparada | Capturas e fluxos; voz, rig, gestos de fala e arte final pendentes |
| R03, E04/E09 | Parcial: quatro espécies distintas, nomes em conteúdo/nomes acessíveis | Capturas. Apresentações faladas e revisão de reconhecimento pendentes; Belinha em C |
| R04, E09/E16 | Integração de gravações preparada, sem sintetizar animais; Lolo deliberadamente silencioso | `resources.ts`, `mixer.ts`, inventário. Gravações naturais ausentes: AC11–13/15 não têm aceite sonoro |
| R05, E10/E16 | Tambor, oito notas C4–C5 e chocalho local com síntese musical identificada | `audio.spec.ts`: frequências agendadas, sinal real por AnalyserNode, ataques/liberação e pausa; `scene.spec.ts`: multitoque CDP. Revisão auditiva/musical em aparelho pendente. Bateria/xilofone/percussão C preservados |
| R06, E02/E08/E10 | Caminho por toque para ações essenciais; rega por seleção+flor, arrasto da rega opcional; instrumentos com cancelamento por contato | Percursos automatizados. Alvos comuns ≥64 CSS px; teclas ≥44. Câmera sem controles. Bordas/gestos do Safari e compreensão infantil pendentes |
| R07, E03/E06/E17/E18 | Trocas cancelam notas, passe, rega e resposta de Lolo; bola volta disponível; flor confirmada preservada | `scene.spec.ts`, `state.spec.ts`, `lifecycle.spec.ts`. Movimentos interrompidos não persistem. Transporte do chocalho não implementado |
| R08, E11/E12 | Água na flor e abertura causal; bola vai/volta; tecla abaixa ao contato | Estado e captura. Comentários falados, revisão educativa e aproximação narrativa de Tico pendentes |
| R09, E13/E16/E18 | Pausa/perda de foco/contexto, retomada por gesto, quatro volumes, fala/dicas, movimento, duração, atividades, exclusão local | Barreira de soma aleatória + confirmação; teste resposta errada/cancelar/salvar/reabrir. Barreira é proposta a validar, não certificada. Áudio de voz/animais não disponível para amostras |
| R10, E07/E13 | Conclusão livre, estado acolhedor, sem carência/culpa; limite adulto com até 3s para estabilizar ação | Teste de conclusão e relógio controlado. Cuidados futuros não removidos |
| R11, E18 | **Pendente**: sem service worker/pacotes íntegros/offline | Nenhum selo offline. AC31/32/34 pendentes; adulto informado; recursos incompletos não declarados disponíveis |
| R12, E13/E18/E22 | Sem contas, APIs pagas, permissões, anúncios ou tráfego externo em execução | Rede monitorada nos percursos; [inventário](RECURSOS.md). Revisão jurídica/licenças finais/distribuição ainda pendente |
| R13, E23 | Textos/nomes isolados em pt-BR.ts; IDs neutros; manifesto separado | Inspeção de código; não foi feita pesquisa/liberação comercial de marca |
| R14/R15, E23 | Interface pt-BR; nenhum idioma incompleto oferecido | Voz pt-BR pendente, logo idioma completo **não** recebe aceite de lançamento. Inglês continua E |
| E07/E08/E10/E19 | Futuro preservado integralmente nos documentos 08/F01 | Belinha, Bento, cuidados, basquete, percursos, xilofone, bateria, outras percussões, água/roupas e opcionais continuam planejados |
| E14/E15/E20 | 3D verdadeiro e animação procedural provisória; responsividade em quatro viewports | Capturas examinadas. Sem arte final, rigs/GLB ou validação 30 FPS/100ms em aparelho |
| E17/E22/E24 | Base aproveitada; estado, entrada, áudio, conteúdo e apresentação separados; fontes intactas | Branch de desenvolvimento, testes, documentação e PR. Decisões/limites no relatório |

## Casos AC01–AC40: cobertura e limites

| Casos da fonte 07 | Evidência nesta entrega | Estado real |
| --- | --- | --- |
| AC01–04 | Percursos livres `scene.spec.ts` e navegação sem filas | Verificado tecnicamente para cenas já locais; carregamento remoto/offline não exercitado |
| AC05 | Quatro viewports e alvos projetados; `layout.spec.ts` confirma teclas ≥44 px e áreas disjuntas no foco de teclado; `base.spec.ts` verifica framebuffer/câmera fixa; capturas | Parcial, sem varredura exaustiva de bordas/aparelho |
| AC06–07 | Pausa no passe, nota/multitoque, rega; blur e retomada; estados unitários | Parcial: sem gravação animal nem bloqueio físico do aparelho |
| AC08–09 | Barreira com soma, erro/cancelamento, persistência de volumes/movimento/atividades, configuração | Técnico; proteção em uso com famílias e todas as amostras ainda pendentes |
| AC10 | Concluir imediatamente e limite por tempo ativo com tolerância curta | Técnico, sem despedida gravada |
| AC11–13 | Modelos/reação visual e Tico antes da flor | Áudio natural/apresentação pendentes; não aceitos |
| AC14 | Lolo com reação silenciosa e tambor em foco | Técnico visual; animação final pendente |
| AC15 | Política de uma gravação em primeiro plano implementada | Não exercitada com áudio animal real; pendente |
| AC16–18 | Seleção, água, abertura confirmada, cancelamento e persistência | Técnico por toque/estado; arrasto implementado, validação física pendente |
| AC19 | Tico disponível antes da rega | Técnico visual; piado pendente |
| AC20 | Chocalho sintetizado local e reação | Parcial: sem transporte; guardar próprio e amostra final pendentes |
| AC21–22 | Passe único contínuo e cancelamento/recuperação | Técnico; refinamento de contato/animação e arrasto direcional da bola pendentes |
| AC23–26 | Timbres sintetizados, alturas, sinal, multitoque com liberação independente e pausa | Técnico Chromium; revisão sonora, glissando físico e latência pendentes |
| AC27 | Lolo responde depois de 2,2s, uma vez por gesto; novo toque cancela padrão | Implementado; cobertura dedicada e revisão gestual ainda pendentes |
| AC28–29 | Troca de instrumento, fala/dicas opcionais; sem narração automática acumulada | Técnico; voz ausente, logo silêncio não comprova política com locução final |
| AC30 | Quatro buses, ganho, compressor, limite de vozes e prioridade do toque | Parcial: sinal instrumental exercitado; mixagem com gravações finais pendente |
| AC31–32 | Offline completo/incompleto | Não implementado, não anunciado |
| AC33 | Versões inválidas/corrupção e recuperação de estado seguro | Técnico; esquema v1 rejeita versões desconhecidas, sem migração destrutiva |
| AC34 | Atualização de pacote | Pendente, sem gestor offline |
| AC35 | Rede local e inspeção de recursos/permissões | Técnico; revisão de distribuição ainda pendente |
| AC36 | Inventário/licenças e ausências registradas | Parcial, final depende de gravações e arte revisadas |
| AC37 | Conteúdo e IDs separados | Inspeção técnica; troca comercial/localizada final pendente |
| AC38 | Interface pt-BR, idioma único | Parcial, banco de voz ausente |
| AC39 | Capturas e interações fora do roteiro | Provisório, sem rig final e sem aceite artístico |
| AC40 | Execução Chromium com renderização por software | Metas físicas não medidas. FPS/latência, memória, aquecimento e bateria pendentes |
