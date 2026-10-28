# Mundo Pippo — cópia completa da versão atual

Backup de 28/10/2026. O protótipo atual está em `prototypes/pippo-25d/`, com código, desenhos originais, máscaras, scripts, testes, documentação, fontes DOCX e evidências visuais. O código anterior na raiz foi preservado.

Versão publicada: 15. Commit original do Site: `bf62b80b0b7d7cd45eb9fdd5abbc43a583d35be7`.

**Para continuar em outra conversa:** leia [o checkpoint e o prompt completo](prototypes/pippo-25d/docs/CONTINUAR_EM_NOVA_CONVERSA.md).

Nesta entrega: giros partem da vista realmente exibida, continuar no mesmo sentido dispensa giro e mudar a distância preserva o giro em andamento. Correções da versão 14 preservadas: toque pela silhueta, repouso persistente, piscadas e respiração. Não foram geradas imagens novas. A caminhada continua com quatro poses e não está concluída. Onze suítes Node aprovadas e comparação visual feita antes da publicação. Evidências e roteiro de reprodução na pasta atual.

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
