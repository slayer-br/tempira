# Tasks de implementação - Climora

Este documento organiza a execução incremental do projeto com base na PRD em [prd.md](prd.md). Ele foi estruturado em fases para facilitar a entrega por agentes de IA, mantendo a PRD como fonte de verdade dos requisitos e evitando duplicação de informação.

---

## Fase 1 - Fundação da aplicação

### Tarefa 1 - Preparar a base do projeto e estrutura inicial

- [x] Criar a estrutura inicial da aplicação em Vite + TypeScript e confirmar que o projeto roda localmente com `npm install` e `npm run dev`.
- [x] Garantir que a página inicial carregue o container principal da app em `index.html` e que o entry principal esteja em `src/main.ts`.
- [x] Validar que os arquivos principais existam e que a aplicação não apresente erros de build.

Critério de aprovação:

- [x] `npm run build` conclui com sucesso.
- [x] `npm run dev` inicia a aplicação sem erros de runtime iniciais.
- [x] A estrutura base está pronta para receber a interface e a lógica do app.

Referência PRD: [prd.md](prd.md) - Visão geral, stack tecnológica e estrutura recomendada.

### Tarefa 2 - Montar a interface inicial da busca de cidade

- [x] Criar o layout base da tela com título do projeto, campo de busca e botão de consulta.
- [x] Definir o estado visual inicial do formulário para vazio, carregamento e erro.
- [x] Garantir que o layout seja responsivo e legível em desktop e mobile.

Critério de aprovação:

- [x] A tela exibe um campo para digitar a cidade e um botão de busca visível.
- [x] O layout se adapta a telas menores sem quebrar a composição.
- [x] A interface está alinhada com as instruções visuais do PRD.

Referência PRD: [prd.md](prd.md) - Instruções visuais e requisitos funcionais.

---

## Fase 2 - Integração com dados climáticos

### Tarefa 3 - Implementar a lógica de busca por cidade

- [x] Criar a função responsável por montar a URL da API de geocodificação.
- [x] Fazer a requisição à OpenMeteo usando o nome da cidade digitado.
- [x] Validar se o campo foi preenchido antes de executar a busca.
- [x] Extrair os dados relevantes da resposta: `name`, `latitude`, `longitude`, `country_code` e `timezone`.
- [x] Tratar o caso de cidade não encontrada.

Critério de aprovação:

- [x] A busca não é executada com texto vazio.
- [x] Quando a cidade existe, os dados corretos da localização são extraídos.
- [x] Quando a cidade não existe, a aplicação mostra uma mensagem clara e não quebra a UI.

Referência PRD: [prd.md](prd.md) - Busca por cidade, consulta de localização e tratamento de erros.

### Tarefa 4 - Implementar a consulta do clima

- [x] Criar a função que monta a URL da API de previsão usando latitude, longitude e timezone.
- [x] Fazer a requisição na API de clima da OpenMeteo.
- [x] Extrair os campos principais da resposta: temperatura, sensação térmica, umidade, vento, precipitação, probabilidade de chuva e código do clima.
- [x] Incluir o horário atual e o status de dia/noite quando disponível.

Critério de aprovação:

- [x] A aplicação consulta a API de clima somente após a localização ser resolvida corretamente.
- [x] Os dados exibidos correspondem aos campos relevantes da resposta da API.
- [x] A lógica funciona mesmo quando a resposta for parcial ou incompleta.

Referência PRD: [prd.md](prd.md) - Consulta de clima, fluxo de dados e mapeamento de campos.

### Tarefa 5 - Traduzir o código de clima para texto legível

- [x] Definir um objeto ou função para transformar `weather_code` em texto legível.
- [x] Mapear os principais estados climáticos, como sol, nublado, chuva, tempestade, neve e neblina.
- [x] Exibir a descrição do clima na interface principal.

Critério de aprovação:

- [x] Cada código conhecido da API recebe uma descrição correta e amigável para o usuário.
- [x] A descrição aparece na tela junto com a temperatura e demais informações.
- [x] Códigos desconhecidos recebem tratamento seguro e não quebram a UI.

Referência PRD: [prd.md](prd.md) - Código do clima e regras de negócio sugeridas.

---

## Fase 3 - Experiência visual do clima

### Tarefa 6 - Renderizar o card principal de clima

- [ ] Exibir o nome da cidade e do país na área principal.
- [ ] Mostrar a temperatura atual em destaque.
- [ ] Mostrar a descrição do clima, sensação térmica e horário local.
- [ ] Incluir algum elemento visual representando o clima, como ícone, emoji ou estilo gráfico.

Critério de aprovação:

- O card principal apresenta as informações mais relevantes de forma legível e visualmente organizada.
- A temperatura é destacada como dado principal da tela.
- O layout segue a proposta visual descrita no PRD.

Referência PRD: [prd.md](prd.md) - Exibição de informações principais e instruções visuais.

### Tarefa 7 - Exibir os indicadores complementares do clima

- [ ] Criar os cards secundários para umidade, vento, precipitação e probabilidade de chuva.
- [ ] Garantir que os valores fiquem legíveis e bem organizados visualmente.
- [ ] Ajustar tamanho e disposição para manter um layout equilibrado.

Critério de aprovação:

- Os indicadores aparecem em conjunto com o card principal sem empilhar elementos de forma confusa.
- Cada card mostra um valor correto e acompanhado de rótulo apropriado.
- O layout mantém boa leitura em desktop e mobile.

Referência PRD: [prd.md](prd.md) - Dados complementares e estrutura visual sugerida.

### Tarefa 8 - Aplicar a estilização final da interface

- [ ] Definir a paleta de cores, espaçamento e tipografia da aplicação.
- [ ] Ajustar o visual do formulário, do card principal e dos indicadores secundários.
- [ ] Garantir contraste adequado, consistência visual e responsividade.

Critério de aprovação:

- A interface está visualmente coerente com o design sugerido pela PRD.
- Texto, bordas, fundos e botões têm boa legibilidade.
- O layout preserva a usabilidade em telas menores.

Referência PRD: [prd.md](prd.md) - Instruções visuais e requisitos não funcionais.

---

## Fase 4 - Robustez, UX e validação

### Tarefa 9 - Implementar estados de carregamento e erro

- [ ] Adicionar estado de carregamento durante a busca.
- [ ] Desabilitar ou controlar ações repetidas enquanto a requisição estiver em andamento.
- [ ] Exibir mensagens de erro quando a cidade não existir, a API falhar ou os dados chegarem incompletos.

Critério de aprovação:

- O usuário percebe claramente quando a busca está em andamento.
- Erros são exibidos com mensagem clara e sem quebrar a interface.
- A aplicação permanece estável em cenários de falha.

Referência PRD: [prd.md](prd.md) - Tratamento de erro, experiência de uso e estados visuais.

### Tarefa 10 - Validar o funcionamento completo do app

- [ ] Rodar a aplicação em ambiente local.
- [ ] Testar o fluxo principal: cidade válida, cidade inválida e falha de API.
- [ ] Verificar o build final com `npm run build`.
- [ ] Revisar a consistência entre a implementação e a PRD.

Critério de aprovação:

- O fluxo principal funciona corretamente em navegador.
- Todos os cenários críticos da PRD foram cobertos.
- O projeto compila e não apresenta erros de build.

Referência PRD: [prd.md](prd.md) - Critérios de aceitação e requisitos funcionais.

---

## Checklist geral por fase

### Fase 1 - Fundação da aplicação

- [x] Tarefa 1
- [x] Tarefa 2

### Fase 2 - Integração com dados climáticos

- [x] Tarefa 3
- [x] Tarefa 4
- [x] Tarefa 5

### Fase 3 - Experiência visual do clima

- [ ] Tarefa 6
- [ ] Tarefa 7
- [ ] Tarefa 8

### Fase 4 - Robustez, UX e validação

- [ ] Tarefa 9
- [ ] Tarefa 10
