# Correção da composição musical — v24

Pedido: corrigir o pé recortado e as asas/mãos apontados na captura de iPhone da v23; revisar todos os instrumentos.

- Retirado o sprite adicional do pé que aparecia isolado na frente do bumbo. Mantidos os pés da figura completa atrás da bateria. Pedal deslocado para o centro do bumbo. A animação de perna acionando o pedal ainda precisa de arte própria; não fingir contato anatômico concluído.
- Repouso da bateria: asa esquerda no tom e direita no chimbal. Chimbal usa a asa direita, prato a esquerda; notas simultâneas continuam com asas independentes.
- Encaixe das baquetas corrigido para o interior real da pega pintada; repouso mais próximo das superfícies.
- Teclado mais estreito em telas largas e xilofone ajustado ao alcance. Posições de repouso afastadas do centro, sem obrigar as duas asas a cruzarem o corpo.
- Chocalho menor, mais baixo e deslocado para fora do rosto; pandeiro revisado no mesmo enquadramento.
- Altura da cena limitada pela largura no celular, evitando distâncias exageradas entre personagem e instrumento em telas altas.
- Cache da página atualizado para `music-composition-24`. Arte, sons reais e demais brincadeiras preservados.

## Evidências

Auditoria em navegador: 69 contatos nas larguras de iframe 320, 390 e 940 px, sem falhas geométricas ou ponta transparente. Registro em `evidence/v24-contact-audit.json`. A auditoria mede o contato no início do som, não certifica naturalidade anatômica nem desempenho físico.

Revisão visual em navegador dos cinco instrumentos, incluindo extremos do teclado/xilofone, repouso e chimbal/prato. Suítes de regressão Node e verificações de recursos passaram. iPhone físico e animação contínua final permanecem pendentes. O movimento ainda utiliza recortes articulados e pode exigir novas poses; não declarar acabamento final aprovado pelo responsável.

Nenhuma nova imagem foi gerada. A divisão experimental da asa em dois segmentos foi rejeitada na revisão local e não foi integrada.
