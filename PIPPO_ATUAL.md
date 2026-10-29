# Mundo Pippo — cópia completa da versão atual

Backup de 29/10/2026. O protótipo atual está em `prototypes/pippo-25d/`, com código, desenhos originais, máscaras, scripts, testes, documentação, fontes DOCX e evidências visuais. O código anterior na raiz foi preservado.

Versão publicada: 19. Commit original do Site: `19d16d63d7f61a400845b11a8239042b3db925e0`.

**Para continuar em outra conversa:** leia [o checkpoint e o prompt completo](prototypes/pippo-25d/docs/CONTINUAR_EM_NOVA_CONVERSA.md).

Nesta entrega: integração do pacote Pippo-Recortes-Limpos-v2.zip enviado por Daniel. 36 poses completas e 12 expressões com corpo, empacotadas sem mudar pixels. Variante normal nativa selecionada após comparação com borda firme e 4×. O jogo não reaplica máscara de papel nem remonta o pescoço. Quatorze suítes aprovadas e comparação visual v18/nova no Chromium remoto. Caminhada permanece com quatro poses. Veja `docs/RECORTES_V19.md` dentro do protótipo.

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
