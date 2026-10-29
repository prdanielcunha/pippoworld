# Integração do pacote de recortes v2 — 29/10/2026

Fonte enviada e autorizada por Daniel: `Pippo-Recortes-Limpos-v2.zip`.
SHA-256 do ZIP: `af89c6a1a1789b8f4a654dede6d1b6e104629c9c67862f953631bd2d3cb4fa39`.
Identidade persistente da fonte: `libfile_a0ff5074a2288191ad60de1a1459310a`. O ZIP contém 61 PNGs em cada uma de três variantes. O ZIP completo fica preservado no arquivo anexado; os recursos efetivamente usados estão integralmente nos atlas do GitHub e Site. Variantes 4×/borda firme e recortes de rosto/corpo soltos não são carregados no jogo.

| Variante | Avaliação | Decisão |
| --- | --- | --- |
| Normal nativa | Bordas suaves, vãos das penas abertos, sem manchas cinzas da exportação anterior, salto sem recorte retangular, devolução sem faixa entre os pés | Usar |
| Borda firme | Alpha mais apertado e menor transição semitransparente; pode reduzir delicadeza das penas, não houve ganho que justificasse substituir todas as imagens | Preservar como alternativa no ZIP |
| 4× | Ampliação do mesmo desenho; 16× a área em pixels, sem detalhe novo; só a pasta PNG pesa cerca de 30 MB contra 3,3 MB da normal | Não carregar em dispositivos móveis |

48 imagens completas usadas: 36 ações/vistas e 12 expressões montadas. Os 12 rostos e corpo solto são recursos auxiliares, não 13 ações ausentes. Os atlas finais somam 2.902.576 bytes, com uma margem transparente entre células. Compressão PNG sem perda; cada região decodificada tem exatamente o RGBA do PNG fornecido. `sprites.json` registra arquivo de origem, SHA-256 do PNG, SHA-256 dos pixels, coordenadas e dimensões. Nenhuma imagem foi gerada.

## Comportamento preservado

`canonical-art.js` recorta os atlas para canvas nativo em cache uma vez por figura. Alpha do arquivo é usado no carinho. Não faz erosão/descontaminação/recoloração nem compõe uma segunda cabeça. Posições das expressões mantêm canvas 400×400 e origem (200,390), as demais mantêm `w+4`, `h+4` e âncoras históricas. O algoritmo de giros, movimento, pausa, bola, música e jardim não foi modificado. Há uma sombra de contato suave desenhada pelo cenário; ela é separada do recorte e não representa papel branco.

## Verificação e reprodução

1. Extrair o ZIP autorizado fora de `dist/` e executar `python3 scripts/import-clean-cutouts.py /caminho/extraido`. Os dois atlas são conferidos pixel a pixel durante a importação.
2. Executar as 14 suítes indicadas no registro da versão. `clean-cutouts.cjs` valida os recursos novos e o carregador real; `reference-matte.cjs` e amostras antigas são apenas regressão do histórico preservado.
3. Executar `python3 scripts/review-clean-cutouts.py`. Abrir `/__clean-review.html` na prévia suportada. Comparar oito pares e conferir as 48 figuras. O ensaio renderiza ambas as versões na mesma geometria; o fundo expõe o recorte. O forçamento de vista existe somente no ensaio.
4. Executar `python3 scripts/review-clean-cutouts.py --clean` antes de publicar. Páginas temporárias não são produto.

A inspeção visual mostrou melhora dos resíduos; não comprova perfeição em todos os tamanhos ou telas. A resolução original continua aproximadamente 200×300 por pose. Persistem quatro fases da caminhada, giros por vistas e transições discretas. O pacote não acrescenta quadros intermediários. Todos os planos de atividades e validação com famílias permanecem nos demais documentos.
