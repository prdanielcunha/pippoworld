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
