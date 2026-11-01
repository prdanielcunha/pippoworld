# Correção 37a — profundidade da pegada

01/11/2026. A v37 foi questionada pelo responsável: a baqueta desaparecia atrás da mão. A arte inteira dos braços cobria todo o cabo. A correção divide a composição: extremidade traseira atrás da palma; braços/mãos; trecho dianteiro saindo do apoio entre polegar e indicador sobre os dedos curvos. Os primeiros sete pixels normalizados do cabo dianteiro ficam sob o apoio, para não colar uma linha inteira sobre o punho. Mesma construção na bateria e xilofone. Sem alterar arte, pivôs, corpo, contatos ou sons.

Referência técnica: Yamaha, https://hub.yamaha.com/music-educators/instruments/perc/a-guide-to-proper-stick-grips/ . O apoio fica entre polegar e indicador; demais dedos envolvem o cabo; pegada simétrica com dorso para cima. Não se deve interpretar como baqueta totalmente à frente de todos os dedos.

Testes relevantes: music-rig-geometry.cjs (525 quadros,75 cenários,48 contatos,3 pedais) e hands-only-v36.cjs (21 poses de raster) passaram. Esses testes não comprovam a profundidade visual: exige inspeção no navegador e aceite do responsável. Main preservada.
