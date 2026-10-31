# Cores e contornos musicais — revisão 33

31/10/2026. Captura do responsável rejeita a v32: cabeça azul com faixas na face e recortes angulares sob as mãos. A inspeção em Chrome não detectou o defeito observado no iPhone. V32 não possui aceite visual.

A preparação v32 copiava canvases e depois lia/regravava seus pixels para extrair o pé. O azul não foi reproduzido em aparelho nesta execução: a relação com o caminho de readback é hipótese, não diagnóstico físico confirmado. A correção elimina esse caminho do renderer musical. Cabeça/expressões, corpo inferior e pé agora são PNGs derivados deterministicamente do mestre original v23. Nenhuma geração, recoloração ou troca de canais é aplicada. O RGBA integral das três faces é conferido contra o PNG original. Máscara de toque preparada por intervalos de alpha, sem getImageData/putImageData no preparo visual. A geometria de 483 quadros executa com essas APIs proibidas no simulador.

A sobreposição v32 usava polígonos largos que atravessavam dedos e incluíam barriga/pés. As máscaras dianteiras agora seguem os contornos dos dedos no espaço da arte; a cor vem da mesma superfície do torso. Torso e máscara são deformados pelo mesmo campo e registro. Cache continua limitado. A composição inferior conserva barriga original sob a mistura para evitar uma faixa transparente antes do banco.

Fontes v23 e v32 intactas. Derivações, hashes e alpha em dist/assets/music-render-v33/. Reproduzir: python3 scripts/prepare-music-layers-v33.py; escreve somente a pasta derivada. Testes: tests/prepared-music-layers.py. Safari/iPhone físico ainda precisa de reteste. Acabamento final, pegadas e atividades futuras permanecem pendentes.
