# Mundo Pippo — primeiro trecho jogável

Prévia de desenvolvimento em TypeScript, Vite e Babylon.js, aproveitando a base existente. Entrada pelo modo livre; quintal com Pippo e bola; jardim com Mimi, Tico, regador, flor e chocalho; Casa da Música com Lolo, tambor e teclado de oito notas. Toque simples, câmera fixa, pausa, retorno e ajustes adultos com barreira de soma/confirmar.

**Arte 3D e animações são provisórias. Voz e gravações naturais dos animais ainda estão pendentes; não são substituídas por efeitos inventados.** Instrumentos usam síntese musical local identificada. Não há pacote offline completo, publicação em produção ou validação em aparelhos físicos.

## Abrir

Node 24 e npm 11, sem credenciais, serviços ou APIs pagas:

```sh
npm ci
npm run dev
```

Abra `http://localhost:5173` na máquina do servidor, ou a porta **5173** encaminhada pelo ambiente de desenvolvimento. O servidor aceita `0.0.0.0`. Um toque em ▶ começa e ativa o áudio. Para ajustar, abra ⚙, resolva a soma e confirme. A pausa permite continuar ou concluir livremente. Esta tarefa mantém uma prévia local; não há URL pública publicada.

## Verificar

```sh
npm run typecheck
npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:smoke
# build e suíte completa:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run validate
```

Build em `dist/`; `npm run preview` usa a porta 4173. Fora do ambiente cloud, instale o Chromium com `npx playwright install chromium` ou informe caminho compatível. Os testes abrem um servidor local e precisam de permissão para servidor/navegador. Capturas ficam em `test-results/`. Tempo por teste inclui WebGL por software, por isso limite de 90 segundos; isso não é uma meta de desempenho do jogo.

## Implementação e continuidade

- [Relatório técnico e verificações](docs/implementacao/RELATORIO.md).
- [Matriz atual R01–R15, prosa E01–E24 e AC01–AC40](docs/implementacao/MATRIZ.md).
- [Inventário, licenças e materiais finais](docs/implementacao/RECURSOS.md).
- [Matriz original e escopo preservado](docs/primeiro-trecho/09_RASTREABILIDADE_REQUISITOS.md).
- [Registro histórico da base](docs/setup/BASE_INICIAL.md) e [pendências daquela etapa](docs/setup/PENDENCIAS.md).

`src/game/state.ts` guarda consequências/estado seguro e preferências v1; `src/main.ts` normaliza entrada e coordena fluxos; `src/scene/yard.ts` apresenta modelos/objetos 3D; `src/audio/mixer.ts` separa quatro canais e notas/contatos; `src/content/` guarda nomes, idioma e integração de recursos. Nenhuma dependência adicionada ou serviço externo em runtime. Dados apenas locais, sem anúncios, contas infantis, câmera, microfone, diagnóstico automático ou compras.

Leia `AGENTS.md` e os documentos antes de continuar. As fontes originais e as atividades futuras C/D/E permanecem preservadas. A versão final exige modelos/rigs, locução pt-BR, gravações naturais licenciadas, revisão educativa/sonora e testes Safari iPhone/iPad, Android e famílias. Emulação e compilação não comprovam essas validações.
