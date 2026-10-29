# Música v21 — instrumentos na cena e gravações acústicas

29/10/2026. Implementação da etapa B da estratégia; não é conclusão do jogo.

## Entrega

Cinco estações dentro da cena: teclado com oito notas de piano C4–C5, bateria de cinco peças, xilofone C5–C6, maraca e pandeiro brasileiro. Pippo fica atrás dos instrumentos, com expressão de atenção e reação discreta da figura inteira. Ainda não há braços/asinhas batendo ou dedilhando: isso precisa de arte consistente e não deve usar membros separados rejeitados.

Web Audio API nativa reproduz 26 excertos locais (796.510 bytes MP3), com fontes independentes por toque e limite de 24 vozes. Compressor, barramentos e ganho controlam a soma. TouchEvents acompanha cada identificador, libera um dedo sem interromper os demais, permite deslizar e evita duplicação por PointerEvents. Mouse, caneta e teclas 1–8 continuam disponíveis. Falha de carregamento apresenta tentativa de novo; não imita gravações com sintetizador. Pausa, saída e aba oculta limpam toques e respostas.

## Pesquisa, fontes e decisão

- Iowa MIS: https://theremin.music.uiowa.edu/MIS.html — autorização explícita para qualquer projeto sem restrições, incluindo desenvolvedores. Piano Jeffrey Cash e xilofone Andrew Thierauf: MISpiano.html e MISxylophone.html no mesmo domínio. Notas naturais selecionadas corretamente de sequências cromáticas; nenhuma nota foi transposta.
- Bateria acústica de menegass, CC0, distribuída pelo Sonic Pi: https://github.com/sonic-pi-net/sonic-pi/blob/dev/etc/samples/README.md . Cinco peças independentes; não usar chimbal como pandeiro.
- Maracas acústicas de Sam Gossner / Versilian Studios, CC0-1.0: https://github.com/sgossner/VSCO-2-CE . Três ataques alternados preservam variação dos grãos.
- Pandeiro brasileiro de MeanRaccoon, CC0: https://freesound.org/people/MeanRaccoon/sounds/844751/ . Dois golpes isolados, com pele e platinelas, da coleção gravada em Zoom H2. Não é um loop de samba acionado em cada toque.
- Philharmonia foi investigada e rejeitada: a autorização de composição não permite redistribuir seus samples como instrumento virtual.
- Motor: https://www.w3.org/TR/webaudio-1.0/ . AudioBufferSourceNode por ataque, sem dependência pesada nem cobrança, conforme especificação já aprovada. Não há servidor de áudio nem API paga.

`dist/assets/audio/manifest.json` registra URL, autor, licença, SHA256 original, início/fim e SHA256 de cada MP3. `scripts/prepare-recorded-audio.py CACHE` reproduz a preparação; sem sources.json baixa as fontes do manifesto e verifica seus hashes. Dependências locais: Python, numpy, scipy, ffmpeg. Os originais de aproximadamente 56 MB ficam em cache, não são baixados pela criança. Créditos acessíveis em `dist/credits.html`.

Tratamento limitado a mono, recorte, normalização de pico, fade de ataque de 1 ms e cauda curta, MP3. Sem síntese, EQ, pitch shifting ou reverb. São amostras educativas curtas, não um simulador de articulações completo. Pandeiro sustentado/rolo, variações de técnica e maraca contínua de movimento permanecem futuros.

## Verificação e limites

Testes do motor: acordes, desbloqueio assíncrono, soltura independente, 24 vozes, caudas de bateria, alternância de maracas, falha de rede e interrupção. Testes de atividades: identificadores de TouchEvents independentes, glissando, cancelamento e deduplicação. Navegador: ensaio programático com oito dedos no teclado e dois na bateria, liberação e pausa. Não equivale a dedos físicos no Safari/iPhone. Mixagem offline verifica amplitude de 24 gravações sobrepostas. Verificar auditivamente no aparelho real e ajustar sensação/latência com Daniel ainda é necessário; não declarar escuta física realizada.

As artes e atlas de Pippo da v20 não foram modificados. Testes de rosto, recorte, bola, silhueta e movimento continuam obrigatórios. O andar permanece com quatro poses e sem aceite de fluidez.

## Próximas etapas completas

1. A: preservar identidade; intermediários de caminhada, giro e chegada com comparação visual antes de publicar.
2. B: animar o gesto de tocar com artes aprovadas; testar áudio e multitouch físicos no iPhone; ampliar técnicas reais de percussão sem sons falsos.
3. C: ligar acessos do mundo a atividades e amigos, mantendo jardim e retorno livre. Criar encontros sem instrução por texto obrigatória.
4. D/E: manter cuidados, bola/basquete, percursos, blocos, água/barquinho e histórias opcionais previstos nos registros. Nada foi excluído.

Resultado da mixagem offline após ajuste de margem final: pico 0,70191, RMS 0,08428, 24 golpes simultâneos, quatro segundos, volume máximo 0,8. Testes de oito toques foram repetidos após o ajuste. Todos os 15 conjuntos de regressão e a validação dos 26 arquivos passaram. Capturas em evidence/v21-*.jpg; layout estreito de 390 px conferido em iframe, sem equivalência a aparelho físico.
