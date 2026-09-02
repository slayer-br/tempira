# Tasks de implementação - Tempira

Este documento organiza a execução incremental do projeto com base na PRD em [prd.md](prd.md) e nos requisitos originais de [brain-dump.md](brain-dump.md).

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

---

### Tarefa 2 - Montar a interface inicial da busca de cidade
- [x] Criar o layout base da tela com título do projeto, campo de busca e botão de consulta.
- [x] Definir o estado visual inicial do formulário para vazio, carregamento e erro.
- [x] Garantir que o layout seja responsivo e legível em desktop e mobile.

Critério de aprovação:
- [x] A tela exibe um campo para digitar a cidade e um botão de busca visível.
- [x] O layout se adapta a telas menores sem quebrar a composição.

---

## Fase 2 - Integração com dados climáticos

### Tarefa 3 - Implementar a lógica de busca por cidade
- [x] Criar a função responsável por montar a URL da API de geocodificação.
- [x] Fazer a requisição à OpenMeteo usando o nome da cidade digitado.
- [x] Validar se o campo foi preenchido antes de executar a busca.
- [x] Extrair os dados relevantes da resposta: `name`, `latitude`, `longitude`, `country_code` e `timezone`.
- [x] Tratar o caso de cidade não encontrada.

---

### Tarefa 4 - Implementar a consulta do clima
- [x] Criar a função que monta a URL da API de previsão usando latitude, longitude e timezone.
- [x] Fazer a requisição na API de clima da OpenMeteo.
- [x] Extrair os campos principais da resposta: temperatura, sensação térmica, umidade, vento, precipitação, probabilidade de chuva e código do clima.

---

### Tarefa 5 - Traduzir o código de clima para texto legível
- [x] Definir um objeto ou função para transformar `weather_code` em texto legível.
- [x] Mapear os principais estados climáticos com base na tabela WMO.

---

## Fase 3 - Experiência visual do clima

### Tarefa 6 - Renderizar o card principal de clima
- [x] Exibir o nome da cidade e do país na área principal.
- [x] Mostrar a temperatura atual em destaque.
- [x] Mostrar a descrição do clima, sensação térmica e horário local.

---

### Tarefa 7 - Exibir os indicadores complementares do clima
- [x] Criar os cards secundários para umidade, vento, precipitação e probabilidade de chuva.
- [x] Garantir que os valores fiquem legíveis.

---

### Tarefa 8 - Aplicar a estilização inicial da interface
- [x] Definir a paleta preliminar de cores, espaçamento e tipografia da aplicação.

---

## Fase 4 - Robustez inicial e UX

### Tarefa 9 - Implementar estados de carregamento e erro iniciais
- [x] Adicionar estado de carregamento durante a busca.
- [x] Exibir mensagens de erro quando a cidade não existir.

---

### Tarefa 10 - Validar o funcionamento básico
- [x] Testar o fluxo principal: cidade válida e cidade inválida.
- [x] Verificar o build inicial com `npm run build`.

---

## Fase 5 - Alinhamento Estrito com Brain-Dump & Refinamento Premium

### Tarefa 11 - Completude da API OpenMeteo conforme Brain-Dump
- [x] Incluir `hourly=temperature_2m` no endpoint de previsão climática.
- [x] Capturar e processar `current_units` dinamicamente para aplicar as unidades de medida oficiais da API (`temperature_2m`, `relative_humidity_2m`, `wind_speed_10m`, `precipitation_probability`).
- [x] Validar parâmetros rigorosamente em `openmeteo.ts`, retornando `null` de forma segura caso algum parâmetro obrigatório falte.
- [x] Garantir que erros de geocodificação ou clima acionem o estado de "nada encontrado" sem expor falhas cruas de rede na interface.

Critério de aprovação:
- [x] As requisições batem com as URLs especificadas no brain-dump.
- [x] Unidades de medida refletem os valores de `current_units`.

---

### Tarefa 12 - Arquitetura Mobile-First & Sistema de Temas
- [x] Reestruturar `src/style.css` com abordagem puramente Mobile-First (regras base para telas pequenas e `@media (min-width: ...)` para desktop).
- [x] Aplicar fundo cinza escuro conforme diretriz do brain dump, com contraste refinado.
- [x] Implementar suporte a tema claro e escuro, respeitando o padrão do sistema via `prefers-color-scheme`.
- [x] Criar botão de alternância manual de tema (toggle) no topo e salvar preferência no `localStorage`.
- [x] Importar tipografia moderna (`Plus Jakarta Sans`) no `index.html`.

Critério de aprovação:
- [x] O layout funciona fluidamente em telas pequenas e escala para telas maiores.
- [x] O tema escuro padrão cinza escuro tem excelente contraste e o tema claro alterna com suavidade.
- [x] A escolha do usuário é mantida após recarregar a página.

---

### Tarefa 13 - Container Arredondado de 800px & Empty States
- [x] Centralizar a área de busca no topo e remover qualquer fundo (sem background).
- [x] Encapsular a Sidebar e a Área Principal em um container unificado com `max-width: 800px` e bordas bem arredondadas (`border-radius: 28px`).
- [x] Criar componente de **Empty State Inicial**: mensagem convidativa com ilustração para guiar a primeira consulta.
- [x] Criar componente de **Empty State Não Encontrado**: visual elegante quando a localidade não existir ou a API não retornar dados.
- [x] Implementar Skeleton/Loading Screen suave e centralizado no container durante a busca unificada.

Critério de aprovação:
- [x] A tela inicial não exibe traços vazios (`--`), mas sim um Empty State atraente.
- [x] A busca inválida exibe o Empty State de não encontrado.
- [x] O container respeita a largura máxima de 800px e possui bordas bem arredondadas.

---

### Tarefa 14 - Ícones Dinâmicos de Clima e Diferenciação Dia/Noite
- [x] Criar módulo `src/weather-icons.ts` contendo ícones em SVG vetorial de alta qualidade para todos os códigos WMO da tabela do brain dump.
- [x] Distinguir graficamente condições de Dia e Noite com base em `is_day` (ex: sol radiante vs lua clara para código 0, nuvens diurnas vs nuvens noturnas para códigos 1-3).
- [x] Exibir o badge/indicador visual de Dia ou Noite na Sidebar com estilo elegante.

Critério de aprovação:
- [x] Cada condição climática renderiza seu ícone vetorial correspondente.
- [x] A condição de dia e noite é representada graficamente e por texto legível.

---

### Tarefa 15 - Validação Completa e Testes no Navegador
- [x] Testar fluxo completo com `browser_subagent` no navegador: busca válida (ex: "São Paulo"), busca inválida (ex: "LocalInexistente123"), alternância de tema e redimensionamento de janela.
- [x] Executar `npm run build` para garantir conformidade total de tipos e empacotamento sem erros.
