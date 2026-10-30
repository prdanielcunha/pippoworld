## Estado vigente — revisão 31, pulso preso ao corpo

V30 rejeitada por capturas reais de iPhone: mão recortada/flutuando. Registro anatômico de pulso agora fixo na arte do corpo; a mão gira a partir dele, preservando braço curto e alcance pelas baquetas. Sem novas imagens. Critérios e evidências em `prototypes/pippo-25d/docs/PULSOS_LIGADOS_AO_CORPO_V31.md`. 483 quadros geométricos amostrados, oito registros de mão e 18 regiões de corpo verificados. Inspeção remota em 390 × 844; aceite em iPhone físico pendente. Link: https://pippoworld-preview.vercel.app/ .

## Estado vigente — revisão 30, pegadas redesenhadas

30/10/2026. O responsável rejeitou a tentativa v29 durante a inspeção. Nova arte de pegadas específicas em `dist/assets/grips-v30/hands.png`, integrada em bateria, xilofone e chocalho. Mãos abertas maiores em teclado/pandeiro, pulso curto, sem cotovelo e sem esticar membros. Alcance das peças ajustado pelas baquetas. V29 não foi publicada; manter seu registro apenas como tentativa. Documento atual: `prototypes/pippo-25d/docs/PEGADAS_REDESENHADAS_V30.md`. Destino: https://pippoworld-preview.vercel.app/ . Teste físico e aceite visual seguem pendentes.

## Revisão prioritária 29 — mão e pequeno trecho de braço

30/10/2026. O responsável rejeitou as dobras da v28. A orientação vigente é mão compacta com pulso curto, sem cotovelo deformado, mesmo sem alcançar as teclas extremas. O renderer v29 reutiliza as mãos originais v27 em transformação rígida; baquetas/malhetas ajustam alcance, giram na pegada e têm dedos sobre o cabo. Aplicado aos cinco instrumentos; pés/banco/pedal v28 preservados. Testes técnicos e inspeção de navegador aprovados; iPhone físico e aceite visual pendentes. Leia `prototypes/pippo-25d/docs/MAOS_CURTAS_E_PEGADA_V29.md`. Não restaurar malha v28. Destino: https://pippoworld-preview.vercel.app/ .

## Revisão prioritária 28 — braços dobrados e pé original da bateria

30/10/2026. Proposta de braços curtos e dobrados aprovada pelo responsável. Atlas integrado com mãos abertas/fechadas aplicado aos cinco instrumentos, ossos com comprimento fixo e cache por pose. Bateria reutiliza o pé/tornozelo pintado original, com pedal registrado e camada atrás das peças; removida a perna procedural. Referência, fonte e hashes em `dist/assets/music-anatomy-v28/`; detalhes e limites em `docs/BRACOS_E_PEDAL_V28.md` no protótipo. Não restaurar o braço reto da v27. Validação técnica concluída; sem teste físico no iPhone nem aceite da animação pelo responsável. Destino: `https://pippoworld-preview.vercel.app/`.

## Atualização prioritária — mãos aprovadas, revisão 27, 30/10/2026

A v26 foi rejeitada visualmente pelo responsável: desenhava mãos geométricas em vez de usar a imagem aprovada. A v27 integra **a própria folha PNG reenviada**, preservada byte a byte, em `dist/assets/hands-approved-v27/`: abertas para teclado/pandeiro e fechadas para baquetas/malhetas/chocalho. Não substituir por curvas amarelas nem restaurar o renderer rejeitado. Decisão, origem, implementação e limites em `docs/MAOS_APROVADAS_V27.md` dentro do protótipo. Destino desta tarefa: `https://pippoworld-preview.vercel.app/`; antigo Site separado. Sem teste físico no iPhone ou aceite final do responsável.

## Atualização anatômica — revisão 26, 30/10/2026

A partir da v25, nova construção de mãozinhas compactas, sem deformar as asas pela distância ao alvo, alcance limitado para pegada de baquetas e malhetas, pandeiro com mãos pequenas e pé conectado ao pedal lateral do bumbo. Arquivos: `dist/music-anatomy.js`, `dist/music-rig.js`, `tests/music-anatomy.cjs`, `docs/ANATOMIA_E_BATERIA_V26.md`. Esta revisão registra implementação no GitHub, mas não equivale a aceite visual do jogo, teste em iPhone físico ou publicação do Site. Ver critérios pendentes no documento v26.

## Estado atual — versão 25, 30/10/2026

Esta seção prevalece sobre o histórico abaixo. Fonte do Site: `3b3ae2028677012c2534986e3b24190403a31a87`. Publicação confirmada em https://pippo-prova-25d-20261027.ocasalcunha.chatgpt.site .

Versões 23 e 24 recuperadas integralmente na pasta atual, incluindo rig, fases de caminhada, fontes e evidências que faltavam no backup. V25 melhora retorno das asas até repouso, soltura silenciosa e recuperação de teclas sustentadas em acordes. Código, artes, fontes, testes e documentos atuais sincronizados com hashes Git conferidos. Leia `prototypes/pippo-25d/docs/RETORNO_MUSICAL_V25.md` e o checkpoint de continuidade. Perna acionando pedal, anatomia final das asas e teste físico no iPhone continuam pendentes. Sem aceite final do jogo.

# Mundo Pippo — cópia completa da versão atual

Backup de 29/10/2026. O protótipo atual está em `prototypes/pippo-25d/`, com código, desenhos originais, máscaras, scripts, testes, documentação, fontes DOCX e evidências visuais. O código anterior na raiz foi preservado.

Versão publicada: 22. Commit original do Site: `9c9419430ebc835657f67757c3142892f8e1e88b`.

**Para continuar em outra conversa:** leia [o checkpoint e o prompt completo](prototypes/pippo-25d/docs/CONTINUAR_EM_NOVA_CONVERSA.md).

Nesta entrega: bateria compacta com posições/hardware refinados, Pippo sentado com baquetas, poses completas de tocar teclado, xilofone, maraca e pandeiro; regador nas asas, água até a terra e flor gradual. Sete folhas novas com 16 poses derivadas da referência, WebP sem perdas e RGBA integral preservado. Atlas aprovados do quintal e 26 sons reais da v21 mantidos. Corrigida rolagem interna do cenário ao focar peças; rega usa tempo ativo para não atrasar com poucos quadros. Dezesseis suítes, duas validações de recursos e ensaios no navegador aprovados. Movimento ainda por poses-chave; sentada/gestos contínuos, quatro poses de caminhada e teste físico de Safari/iPhone seguem pendentes. Ver `docs/POLIMENTO_V22.md` e `docs/ESTRATEGIA.md`.

Jogo: https://pippo-prova-25d-20261027.balmythyme13.chatgpt.site/

## Executar a versão atual

Na pasta `prototypes/pippo-25d`, servir `dist/` com qualquer servidor HTTP estático. Exemplo: `python3 -m http.server 8000 --directory dist`. Abrir http://localhost:8000/. Não requer serviços pagos nem geração de imagens. Os testes Node estão em `tests/`; a análise de máscaras requer Python, Pillow, NumPy e SciPy.

## Recuperar todo o histórico original

O pacote em duas partes `backups/pippo-25d-historico-2026-10-28.bundle.part01` e `.part02` guarda todos os commits e referências Git do Site até a versão 13; as entregas posteriores estão nos commits da main e na pasta atual, além dos arquivos abertos nesta pasta. Primeiro reconstruir com `python3 backups/restaurar-historico.py` (confere SHA-256 automaticamente). Depois verificar com `git bundle verify backups/pippo-25d-historico-2026-10-28.bundle`. Recuperar com `git clone backups/pippo-25d-historico-2026-10-28.bundle pippo-restaurado`.

`backups/pippo-25d-manifest-2026-10-28.json` registra o checkpoint da versão 13. `backups/pippo-25d-manifest-atual.json` identifica os arquivos da fonte atual e seu commit.

## Limites conhecidos

O protótipo é 2,5D. Caminhada usa quatro poses aprovadas; não é animação 3D contínua. Safari em iPhone físico, áudio definitivo e atividades futuras seguem pendentes conforme `docs/ESTADO_PRODUCAO.md`. Artes antigas rejeitadas são conservadas como histórico e não voltam a ser usadas automaticamente.

Este backup é uma fotografia desta versão. Alterações futuras também precisam ser enviadas ao GitHub; o deploy do Site não faz essa sincronização automaticamente.

## Entrega 15 — 28/10/2026

Publicada no mesmo Site, com público preservado. Comparação visual com a versão 14 em 24 capturas determinísticas. Código, testes, documentos, evidências e script do ensaio copiados separadamente para este repositório. Próxima prioridade: intermediários consistentes da caminhada; giros por vistas ainda não são rotação contínua. Veja `docs/ESTADO_PRODUCAO.md` dentro do protótipo.

## Entrega 16 — 28/10/2026

Velocidade contínua ao mudar destino e no redimensionamento. Evidência e ensaio reproduzível em `prototypes/pippo-25d/`; documentação dos prompts e motivos de rejeição em `docs/ENSAIO_CAMINHADA_16.md` nessa pasta. Não repetir atlas semelhantes como se fossem animação concluída. Próxima prioridade: uma fase de passagem/avanço com apoio anatomicamente correto antes de multiplicar o ciclo. Publicação no mesmo Site e backup GitHub são operações separadas.

## Entrega 17 — 28/10/2026

Corrige os resíduos claros da captura do responsável. Máscaras/cache: `paper-matte-17`. Ensaio reproduzível: `python3 scripts/review-contours.py` dentro do protótipo. Evidências, teste de 49 recortes e comparação do filtro anterior preservados. Publicação no mesmo Site; backup separado no GitHub. As folhas originais continuam byte a byte idênticas. Sem afirmar reteste físico no iPhone.

## Entrega 18 — 28/10/2026

O responsável identificou resíduos na própria imagem entregue. Corrigidos os limites e vazios de cinco poses por coordenadas da folha original, com preservação de olhos/face creme, bico e pés. Cache/máscara `contact-contours-18`. Evidência `evidence/pippo-residuos-comparacao-v18.jpg`; reprodução por `scripts/review-residuals.py`. Publicação no mesmo Site e backup separado no GitHub. Não usar quantidade de testes como prova de perfeição visual ou reteste físico no iPhone.


## Entrega 19 — 29/10/2026

Recortes v2 em dois atlas PNG, carregamento e alpha para carinho derivados dos arquivos transparentes enviados. Expressões completas preservam pescoço e bochechas sem uma segunda composição. Código, atlas, origem/hashes, importador, teste novo e cinco evidências copiados separadamente para o GitHub. Todos os documentos e atividades anteriores preservados. Originais em `assets/canon/` intactos. Arquivo ZIP completo e variantes auxiliares permanecem no anexo original; os 48 recursos usados estão integralmente nos atlas e podem ser extraídos sem perda.


## Entrega 20 — 29/10/2026

Recuperação de regiões legítimas da face que tinham ficado transparentes. Recortes v2 mantidos no restante, incluindo as quatro poses de andar. Importador, origem dos pixels, teste específico, fixtures de preservação, evidências e documentos atualizados. Publicação no mesmo Site e backup GitHub separados. Sem reteste em iPhone físico.

## Entrega 22 — 29/10/2026

Polimento de instrumentos, atuação e jardim. Arte e áudio preservados, novas folhas e prompts salvos, estratégia integral mantida. Publicação e cópia no GitHub feitas separadamente. Novas poses aguardam avaliação visual do responsável; não declarar animação contínua ou aceite final.
