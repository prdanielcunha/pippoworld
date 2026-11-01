# Junções e bateria — revisão 37

31/10/2026. As capturas reais rejeitaram a v36: recorte reto no punho direito de teclado/pandeiro e braço do chocalho saindo do corpo com aspecto mecânico. O teste anterior de conectividade alfa não excluía fragmentos de contorno nem movimento indevido de outras partes do braço. Não declarar v36 aprovada.

## Construção e movimento

Novas extrações com `image_gen` preservam braços completos, mas eliminam pedaços de barriga/asa das bordas das mãos. Fonte e prompts em `sources/v37/`. O mestre do chocalho v36 é preservado. A barriga, cabeça original, banco e pés não foram regenerados.

O ombro e a parte superior do braço permanecem fixos. O pulso usa uma partição suave da mesma superfície pintada, com sobreposição de penas na junção; mão/cabo/chocalho compartilham uma transformação rígida. Não se move o ombro para alcançar a nota. O movimento agora usa o valor contínuo do relógio do gesto, sem arredondamento em nove poses, e seis operações de desenho em vez da malha de triângulos. Uma única passagem desenha os braços, removendo a sobreposição que colocava um segundo recorte sobre o punho. Nenhum `getImageData/putImageData` foi introduzido no preparo visual do navegador. Corpo e expressão permanecem separados, sem balanço do tronco.

## Referência e configuração musical

A foto anexada foi usada como referência de execução/disposição, sem copiar o fotógrafo, a pessoa ou a fotografia para o jogo. Referências técnicas primárias consultadas:

- Yamaha, pegadas: https://hub.yamaha.com/music-educators/instruments/perc/a-guide-to-proper-stick-grips/ — pegada simétrica, apoio polegar/indicador, outros dedos envolvendo o cabo e trabalho de pulso/dedos.
- Yamaha, estrutura: https://www.yamaha.com/en/musical_instrument_guide/drums/mechanism/ — bumbo, caixa, dois toms e surdo; configuração pode variar.
- Yamaha, posição básica: https://www.yamaha.com/en/musical_instrument_guide/drums/play/ — mão direita no chimbal, esquerda na caixa, pé direito no bumbo.

O jogo é visto de frente: o lado direito do músico aparece à esquerda da tela. Corrigidos o cruzamento da mão direita até o chimbal e o pé original acionando o bumbo. O kit tem cinco tambores e dois pratos selecionáveis (chimbal e prato de acento). Toms ficam acima do bumbo, surdo no chão, caixa rasa ao lado, com suportes reposicionados. Sete alvos mantêm som imediato, multitoque e resposta interrompível.

Dois novos sons são gravações acústicas próprias de tom agudo/surdo, CC0, menegass/Freesound via Sonic Pi. FLACs originais, hashes e processamento preservados; sem alterar afinação de uma amostra para fingir outra peça. Os 26 sons anteriores permanecem intactos. Manifesto agora tem 28 gravações e sete mapeamentos de bateria.

## Verificações e limites

Preparação reproduzível: `prepare-music-layers-v37.py`, `prepare-extra-toms-v37.py`. PNGs são escritos atomicamente e validados por CRC/hash; o teste exige barriga realmente opaca, evitando uma comparação enganosa entre regiões transparentes. Cabeças originais e corpo estável entre expressões conferidos. Pedal registrado na pata original correta.

`bash scripts/verify-v23.sh`: regressões de entrada/pausa/saída, áudio e recursos; 525 quadros/75 cenários/48 contatos e três pedais. O teste real de raster verifica a junção e os pixels centrais da barriga. `review-wrists-v37.cjs` exporta o ciclo de 2,4 segundos do chocalho a partir do renderer, em 60 quadros/s de exportação; isso não mede FPS físico. Vídeo em `evidence/v37/shaker-wrist-cycle.mp4`.

O aceite visual continua pendente do responsável. Testes em Chrome remoto e raster não substituem Safari/iPhone físico, latência, revisão sonora/educativa ou teste com famílias. Main não é promovida; nova prévia e código ficam na branch da revisão.
