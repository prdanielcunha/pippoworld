# Inventário executado e licenças — trecho B

26/10/2026. Nenhum arquivo de áudio animal ou voz foi encontrado na base. Não se adquiriu material de origem incerta. O trecho é uma prévia técnica com som instrumental, ainda sem aceite sonoro dos encontros. As fontes originais em `docs/fontes/` e o inventário de produção continuam preservados.

| IDs / versão | Origem / autor / licença | Integração e pendência |
| --- | --- | --- |
| duck_main, cow_friend, chick_friend, rabbit_friend / procedural-v1 | Geometria original produzida nesta implementação; fonte editável `src/scene/yard.ts`; nenhum modelo, textura ou animação de terceiros | Objetos 3D reais em Babylon, silhuetas provisórias. Sem rig final. Substituir fábrica por modelos GLB, mantendo IDs, alvos e contrato de apresentação. Não há modelo final aprovado nem pipeline GLB validado nesta etapa |
| yard, garden, music_house; ball_main, watering_can, flower_main, drum_single, keyboard_eight, shaker_story / procedural-v1 | Mesma fábrica original; sem arquivo artístico externo | Chão, vegetação, cerca, casa, interior, instrumentos e objetos 3D reais. Materiais simples e animação procedural; contatos e escala precisam de direção de arte final |
| keyboard_eight / synth-v1 | Síntese original local em `src/audio/mixer.ts`, onda triangular; sem amostra externa | C4 D4 E4 F4 G4 A4 B4 C5, 261,625565–523,251131 Hz. Timbre eletrônico provisório; revisão musical e conforto físico pendentes |
| drum_single / synth-v1 | Síntese original de modos de membrana, sem gravação externa | Timbre de tambor eletrônico provisório; parciais 1 / 1,59 / 2,14, ataque imediato; não apresentado como gravação acústica |
| shaker_story / synth-v1 | Ruído determinístico filtrado, envelope local original | Chocalho sintetizado provisório, movimento ligado ao toque; substituir por amostra final revisada se necessário. Local; sem transporte entre cenas |
| animal.duck.main | **Ausente**. Origem, autor, licença, arquivo, tamanho e hash ainda indisponíveis | Pato filhote, espécie/idade visual ainda a aprovar (D01/D04). Não usar pato adulto nem alterar pitch para simular filhote |
| animal.cow.main | **Ausente**, mesmos campos pendentes | Gravação natural de vaca adulta (Bos taurus), limpa, licenciada e revisada |
| animal.chick.main | **Ausente**, mesmos campos pendentes | Gravação natural de pintinho (Gallus gallus domesticus), sem canto de galo ou ave genérica |
| animal.rabbit | Ausência **intencional**, sem arquivo | Lolo responde com gesto, sem som animal inventado |
| voice.pt-BR | **Ausente**. Falas originais do arquivo 05 preservadas | Selecionar voz e permissão de uso, gravar e revisar todas as chaves usadas; pronúncia e nomes aprovados. `resources.ts` prepara gatilhos usados sem URLs falsas; completar banco 05 antes do aceite de voz |
| ambience | Silêncio deliberado nesta prévia | Canal separado implementado; fundo opcional só depois de produzir material revisado |
| Ícones de navegação | Caracteres Unicode; desenhos dependem da fonte/emoji do sistema do aparelho | Provisórios. Substituir por ícones próprios/licenciados com aparência consistente e testar compreensão |

Os recursos procedurais não incorporam material artístico externo. Esta entrega não muda a licença global do repositório nem concede licença sobre materiais futuros. A licença de distribuição do código/arte originais deve ser definida pelo titular antes do lançamento. Não há recurso externo de arte/áudio sem licença sendo distribuído.

Dependências mantidas, versões verificadas no `node_modules` e no lockfile: Babylon.js 9.32.0 (Apache-2.0), Vite 8.3.5 (MIT), TypeScript 7.0.2 (Apache-2.0), Playwright Test 1.64.1 (Apache-2.0). Manter avisos/licenças aplicáveis na distribuição; arte e gravações finais precisam de sua própria autorização. Nenhuma dependência adicionada.

Para integrar gravações: armazenar fonte original e distribuída; registrar autor, URL de origem, licença/atribuição e restrições, espécie/idade, tamanho e SHA-256; preencher URLs **locais** em `src/content/resources.ts` somente com origem/licença revisadas. `Mixer.prepare()` decodifica antes do uso; `recorded()` nunca sintetiza substituição. Publicar áudio só após revisão de reconhecimento e ausência de sofrimento. URLs nulas representam pendência, não recursos completos nem offline pronto.
