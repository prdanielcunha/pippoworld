# Mundo Pippo — primeiro trecho jogável

Prévia de desenvolvimento em TypeScript, Vite e Babylon.js, aproveitando a base existente. Entrada pelo modo livre; quintal com Pippo e bola; jardim com Mimi, Tico, regador, flor e chocalho; Casa da Música com Lolo, tambor e teclado de oito notas. Toque simples, câmera fixa, pausa, retorno e ajustes adultos com barreira de soma/confirmar.

**Arte 3D e animações são provisórias. Voz e gravações naturais dos animais ainda estão pendentes; não são substituídas por efeitos inventados.** Instrumentos usam síntese musical local identificada. A demonstração publicada é um protótipo; pacote offline e validação em aparelhos físicos continuam pendentes.

## Prévia para teste real

[Abra a demonstração no Safari do iPhone](https://mundo-pippo-avaliacao-20261027.balmythyme13.chatgpt.site). Acesso privado para a mesma conta do ChatGPT do responsável; não exige conta infantil. Versão do jogo `1e052f1`, identificada como protótipo em avaliação. [Revisão, limites da verificação e roteiro no iPhone](docs/implementacao/REVISAO_E_TESTE_IPHONE.md). Publicação confirmada pelo Sites; a checagem HTTP externa foi bloqueada pelo proxy do executor.

## Abrir localmente

Node 24 e npm 11, sem credenciais, serviços ou APIs pagas:

```sh
npm ci
npm run dev
```

Abra `http://localhost:5173` na máquina do servidor, ou a porta **5173** encaminhada pelo ambiente de desenvolvimento. O servidor aceita `0.0.0.0`. Um toque em ▶ começa e ativa o áudio. Para ajustar, abra ⚙, resolva a soma e confirme. A pausa permite continuar ou concluir livremente. O endereço localhost serve apenas ao desenvolvimento; use o link da demonstração acima para o iPhone.

## Verificar

```sh
npm run typecheck
npm run build
node scripts/verify-build.mjs
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:smoke
# build e suíte completa:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run validate
```

Build em `dist/`; `npm run preview` usa a porta 4173. Fora do ambiente cloud, instale o Chromium com `npx playwright install chromium` ou informe caminho compatível. Os testes abrem um servidor local e precisam de permissão para servidor/navegador. Capturas ficam em `test-results/`. Tempo por teste inclui WebGL por software, por isso limite de 90 segundos; isso não é uma meta de desempenho do jogo.

WebKit tem projeto separado (`npm run test:webkit`); o workflow de revisão instala os navegadores nos runners GitHub. Resultados desta revisão: 23 testes Chromium e 22 WebKit, com um caso CDP ignorado apenas no WebKit. Isso não substitui Safari/iPhone/iPad físicos.

## Implementação e continuidade

- [Inventário para levar ao Work](docs/implementacao/INVENTARIO_PRODUCAO_WORK.md) e [CSV](docs/implementacao/inventario-producao.csv).
- [Relatório técnico e verificações](docs/implementacao/RELATORIO.md).
- [Matriz atual R01–R15, prosa E01–E24 e AC01–AC40](docs/implementacao/MATRIZ.md).
- [Inventário, licenças e materiais finais](docs/implementacao/RECURSOS.md).
- [Matriz original e escopo preservado](docs/primeiro-trecho/09_RASTREABILIDADE_REQUISITOS.md).
- [Registro histórico da base](docs/setup/BASE_INICIAL.md) e [pendências daquela etapa](docs/setup/PENDENCIAS.md).

`src/game/state.ts` guarda consequências/estado seguro e preferências v1; `src/main.ts` normaliza entrada e coordena fluxos; `src/scene/yard.ts` apresenta modelos/objetos 3D; `src/audio/mixer.ts` separa quatro canais e notas/contatos; `src/content/` guarda nomes, idioma e integração de recursos. Nenhuma dependência adicionada. O núcleo do jogo não chama APIs externas. Dados apenas locais, sem anúncios, contas infantis, câmera, microfone, diagnóstico automático ou compras.

Leia `AGENTS.md` e os documentos antes de continuar. As fontes originais e as atividades futuras C/D/E permanecem preservadas. A versão final exige modelos/rigs, locução pt-BR, gravações naturais licenciadas, revisão educativa/sonora e testes Safari iPhone/iPad, Android e famílias. Emulação e compilação não comprovam essas validações.
