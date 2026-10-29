# Mundo Pippo — cópia completa da versão atual

Backup de 28/10/2026. O protótipo atual está em `prototypes/pippo-25d/`, com código, desenhos originais, máscaras, scripts, testes, documentação, fontes DOCX e evidências visuais. O código anterior na raiz foi preservado.

Versão publicada: 18. Commit original do Site: `84e68659abdf6c346eea2ef77b8270f14c2e8072`.

**Para continuar em outra conversa:** leia [o checkpoint e o prompt completo](prototypes/pippo-25d/docs/CONTINUAR_EM_NOVA_CONVERSA.md).

Nesta entrega: correção geométrica do papel refletido/quente que ainda aparecia na própria evidência da versão 17. Contornos de contato e vazios explícitos em agachar, sentar, deitar e duas vistas superiores. Comparação ampliada v17/correção e novas amostras negativas/positivas nos testes. Treze suítes aprovadas; originais intactos. A versão 17 não havia resolvido integralmente os resíduos. Caminhada continua com quatro poses.

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
