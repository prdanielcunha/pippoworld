# Mundo Pippo — base executável

Aplicação web inicial com TypeScript, Vite e Babylon.js. O navegador abre um estudo 3D do quintal: chão, iluminação suave, câmera fixa, patinho geométrico e bola azul. Tudo é **provisório**, sem atividades ou áudio. Mundo Pippo/Pippo World são marcas de trabalho.

## Instalar e executar

Use Node.js 24 (versão validada em `.nvmrc`) e npm 11. Não são necessárias credenciais, banco de dados ou APIs pagas.

```sh
npm ci
npm run dev
```

O servidor usa a porta 5173 e aceita conexões em `0.0.0.0`. Abra essa porta no seu ambiente de desenvolvimento. O cache npm fica em `.cache/npm`, ignorado pelo Git.

## Validar

```sh
npm run typecheck
npm run build
npm run preview
```

O build gera `dist/`; preview usa a porta 4173. Para testar renderização real, câmera fixa, pausa e ausência de WebGL:

```sh
# No ambiente cloud preparado, Chromium já está disponível:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:smoke
# Build seguido dos testes:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run validate
```

Em outra máquina, execute `npx playwright install chromium` uma vez e omita a variável acima, ou aponte-a para seu Chromium compatível. Linux pode precisar de dependências do navegador. Os testes usam renderização por software em Chromium headless; não comprovam desempenho em aparelhos físicos. Capturas ficam em `test-results/`.

## Organização e continuidade

- `src/content/pt-BR.ts`: identidade e textos substituíveis, fora da lógica.
- `src/scene/yard.ts`: cena Babylon.js sem controle manual da câmera.
- `src/main.ts`: inicialização, redimensionamento, pausa explícita e por perda de foco, descarte no HMR.
- `docs/fontes/`: especificação e prompt integrais (Markdown e DOCX).
- `docs/primeiro-trecho/`: roteiro, inventário, aceite, pendências e rastreabilidade originais.
- [Registro da base e verificações](docs/setup/BASE_INICIAL.md): decisões, versões, fontes oficiais e evidências.
- [Pendências de implementação](docs/setup/PENDENCIAS.md): escopo posterior e estado dos requisitos.

Leia `AGENTS.md` antes de desenvolver. Os documentos do pacote são referências preservadas: seus prompts históricos não ampliam o pedido atual. A tarefa presente autoriza a base executável, e as atividades serão a próxima etapa.

## Requisitos essenciais

Público principal de 24–36 meses; exploração livre, toque simples completo, câmera previsível, poucas escolhas grandes e saída livre. Pippo é companheiro e voz principal em pt-BR. Vocalizações naturais devem corresponder à espécie/idade e ter licença; Lolo não recebe som animal inventado. Instrumentos têm timbres e notas corretos; fala, animais, instrumentos e ambiente terão canais separados.

Não incluir cadastro infantil, câmera, microfone no núcleo, anúncios, rastreamento comercial, conversa aberta com IA, pontuação punitiva ou cobrança por ausência. Nomes/idiomas ficam separados dos IDs estáveis. Offline, arte final, configurações adultas e o trecho B **ainda não estão implementados**. R01–R15 e o jogo completo permanecem preservados nas fontes, sem marcação de aceite nesta base.
