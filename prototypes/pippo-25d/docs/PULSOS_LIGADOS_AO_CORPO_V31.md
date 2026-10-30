# Pulsos ligados ao corpo — revisão 31

30/10/2026. O responsável enviou três capturas reais de iPhone rejeitando a v30: mão cortada e flutuando em frente ao personagem. Essa rejeição prevalece sobre a inspeção de desktop anterior; aprovação visual continua pendente.

## Causa corrigida

A mão girava ao redor da pegada, enquanto o braço pintado no corpo não mudava. A ponta recortada do pulso mudava de posição com a rotação e se separava do tronco. Limitar o alcance e verificar apenas a ponta da baqueta não detectava esse defeito.

Agora cada sprite possui um registro anatômico `W`, dentro de pixels opacos do pulso. Esse registro permanece fixo dentro da parte pintada do personagem, com sobreposição curta. A posição dos dedos resulta da rotação em torno desse pulso; não é mais uma mão independente perseguindo notas. O trecho curto de braço acompanha a mesma transformação rígida. Sem malha de cotovelo, estiramento do membro ou novas imagens.

Para baquetas/malhetas, a orientação é resolvida a partir do pulso e da linha até a superfície; a haste mantém o alcance independente. O apoio do pandeiro registra o pulso no extremo lateral do braço original. O chocalho usa registro inferior para segurar o cabo diante do corpo, sem levar a mão à frente da face. O teclado preserva a exceção de alcance pedida pelo responsável: notas distantes soam e acendem sem alongar o braço.

Fontes de mão/corpo permanecem byte a byte intactas. Cache e marcador: `anchored-wrist-31`; “Sobre esta versão” identifica revisão 31.

## Evidência e critérios

- O teste geométrico cobre 69 cenários em 320/390/940 pixels e amostra sete tempos de cada ataque: 483 quadros simulados. Reprojeta o pixel de registro do pulso pela transformação de desenho e verifica que continua no ponto do corpo. As 42 verificações de contato ativo e três pedais permanecem separadas; não são teste de qualidade artística.
- Novo teste `tests/wrist-registration.py`: oito registros dentro de regiões opacas das artes das mãos e 18 regiões opacas de sobreposição no corpo, abrangendo três expressões.
- `bash scripts/verify-v23.sh`: sintaxe, suítes Node e validações de arte/áudio.
- Navegador remoto: desktop e aplicativo renderizado dentro de quadro de 390 × 844, com os mesmos breakpoints de CSS do telefone. Cinco instrumentos inspecionados, com notas e ataques. A página auxiliar foi removida antes de publicar. Isso não equivale a Safari/iPhone físico nem medição de FPS/latência.

Critério vigente: pulso unido ao corpo durante repouso, ataque, levantamento e retorno, incluindo peças/notas extremas; nenhuma aprovação de uma imagem isolada substitui esse critério. O responsável ainda precisa avaliar a versão publicada no aparelho. Outros conteúdos/animações do jogo completo permanecem nas especificações anteriores.

Destino: https://pippoworld-preview.vercel.app/ .
