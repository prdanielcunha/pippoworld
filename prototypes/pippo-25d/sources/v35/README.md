# Referência da pegada v35

Produzida com `image_gen` integrado, em 31/10/2026, como edição da primeira figura da segunda linha de `dist/assets/music-body-v32/poses.png`. A primeira tentativa sem baquetas continuou parecendo mão aberta e foi descartada. A edição com baquetas tornou a construção da pegada explícita. Duas limpezas posteriores retiraram cabos expostos; a primeira deixou as pontas internas e foi descartada. O mestre final e a referência com baquetas permanecem separados.

- `grip-with-sticks.png`: referência da mão segurando o cabo, não carregada pelo jogo.
- `grip-master.png`: edição limpa final; o preparador usa somente braços/mãos, não sua cabeça, barriga, banco ou pés.
- Saídas, registro e hashes: `scripts/prepare-music-layers-v35.py` e `dist/assets/music-render-v35/manifest.json`.

Prompt principal da pegada:

> Precise object edit of provided Pippo character. Change both hands into unmistakable matched-grip drumming hands ACTUALLY HOLDING TWO LONG WOODEN DRUMSTICKS. This is an anatomy correction for a children's music game. CURRENT hands are wrongly open and fingers simply hanging down. Redraw them: rotate both hands to palms down, backs of hands and knuckles facing up, four fingertips curl firmly underneath each slender shaft, each thumb lies along the INNER SIDE of the index finger and visibly PINCHES the shaft at the fulcrum. The sticks emerge from the thumb/index web and pass through the curled fingers. The visible wooden shafts must clearly go THROUGH the grasp, not float in front, not poke from fingertip ends, and not hang vertically. Use a relaxed German matched grip with symmetrical short wrists extending diagonally forward/outward toward viewer. Sticks point diagonally downward/outward in image, left shaft toward lower-left, right shaft toward lower-right, matching seated drummer ready to hit snare. Show exposed stick butt behind each hand toward body and long shaft forward, with fingers naturally occluding middle. Arms are short, elbows close to body, hands at lower belly height, painted seamlessly connected to shoulders. Preserve identical yellow fluffy Pippo face, brown eyes, beak, crest, belly, webbed feet and stool, original cute 2.5D render style and proportions. Single COMPLETE full figure with smooth continuous belly and no cutlines. Transparent background, no scene or drum kit, no duplicate limbs, no text.

Prompt final de limpeza, aplicado à edição anterior que já retirara os cabos longos:

> Precise cleanup edit: REMOVE THE TWO SMALL BROWN WOODEN STUBS still visible just ABOVE and INSIDE the hands, against the cream belly. One stub at approximately x320 y1110, the other at x605 y1110, in this 887x1774 image. These are the rounded wooden ends pointing upward inward, attached to nothing. They must be gone, replaced by the same cream belly feathers behind them. There must be ZERO brown/wood pixels above the thumbs. Everything else must remain identical: keep both closed curled drumming hands and thumbs EXACTLY as drawn, preserve fingers, knuckles, wrists, arms, face, eyes, bill, feathers, silhouette, stool, feet, pose, size and framing. Do not open the fists. Do not add new objects or alter the character. Transparent background.

É referência técnica ainda sujeita a inspeção no jogo e avaliação do responsável; não registrar aceite artístico por geração ou teste automatizado.
