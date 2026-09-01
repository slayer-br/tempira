# PRD - Climora

## 1. Visão geral

O produto é uma aplicação web de clima em tempo real, desenvolvida em Vite + Vanilla + TypeScript, cujo objetivo é permitir que o usuário informe o nome de uma cidade e receba informações meteorológicas relevantes para aquela região.

A experiência principal é simples e direta: o usuário digita a cidade, o sistema consulta a API de geolocalização da OpenMeteo para encontrar a localização correta e, em seguida, busca os dados climáticos da área para exibir as condições atuais e os principais indicadores meteorológicos.

O app deve funcionar como uma interface leve, responsiva e de fácil uso, com foco em clareza visual e rapidez de consulta.

---

## 2. Objetivo do produto

Permitir que uma pessoa:

- consulte o clima de qualquer cidade informada;
- veja rapidamente temperatura, umidade, sensação térmica, vento e precipitação;
- entenda o estado do clima da região por meio de indicadores visuais simples;
- tenha uma experiência funcional em navegador sem necessidade de backend próprio.

---

## 3. Aspectos funcionais

### 3.1 Busca por cidade

O usuário deve inserir o nome de uma cidade em um campo de texto e confirmar a busca por meio de um botão.

Fluxo esperado:

1. O usuário acessa a página.
2. Digita o nome da cidade.
3. Clica em buscar.
4. O sistema valida a entrada.
5. A aplicação consulta a API de geolocalização.
6. Se a cidade for encontrada, obtém latitude, longitude e timezone.
7. Em seguida, consulta a API de clima usando esses dados.
8. Exibe os resultados no layout principal.

### 3.2 Consulta de localização

A aplicação deve consumir o endpoint de geocodificação da OpenMeteo:

- https://geocoding-api.open-meteo.com/v1/search?name={NOME_DA_CIDADE}&count=1&language=en&format=json

A partir do retorno, o sistema deve extrair os campos essenciais:

- name
- latitude
- longitude
- country_code
- timezone

Esses dados servem como base para a consulta meteorológica.

### 3.3 Consulta de clima

Com a latitude, longitude e timezone obtidos, a aplicação consulta a API de previsão da OpenMeteo:

- https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&hourly=temperature_2m&current=precipitation_probability,temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,weather_code&timezone={TIMEZONE}

O sistema deve priorizar os seguintes dados da resposta:

- temperatura atual
- sensação térmica
- umidade relativa
- velocidade do vento
- direção do vento
- probabilidade de precipitação
- precipitação atual
- código do clima
- horário atual

### 3.4 Exibição de informações principais

A tela deve mostrar as principais informações meteorológicas da cidade consultada, como:

- temperatura atual
- sensação térmica
- umidade
- vento
- precipitação
- probabilidade de chuva
- nome da cidade / país
- horário local

### 3.5 Tratamento de estado vazio e erros

O sistema deve prever cenários de erro ou dados ausentes:

- campo vazio: bloquear a busca com mensagem clara;
- cidade não encontrada: mostrar aviso informando que a localidade não foi localizada;
- falha de rede: indicar problema de conexão ou indisponibilidade da API;
- retorno incompleto: apresentar mensagem genérica de erro e não quebrar a interface.

### 3.6 Experiência de uso

A interface deve ser simples e objetiva, voltada para consulta rápida. Não deve exigir cadastro, login ou backend próprio para funcionar.

---

## 4. Requisitos de sistema

### 4.1 Requisitos funcionais

1. O sistema deve permitir a entrada do nome da cidade.
2. O sistema deve validar o texto digitado antes da consulta.
3. O sistema deve consultar a API de geocodificação para localizar a cidade.
4. O sistema deve usar latitude, longitude e timezone da resposta da geolocalização.
5. O sistema deve consultar a API de previsão do clima.
6. O sistema deve extrair os campos relevantes da resposta.
7. O sistema deve exibir as informações climáticas com formatação legível.
8. O sistema deve tratar erros e estados vazios.
9. O sistema deve funcionar em navegador moderno.

### 4.2 Requisitos não funcionais

- desempenho: resposta esperada em poucos segundos;
- simplicidade: interface intuitiva e de baixo atrito;
- compatibilidade: navegador moderno com suporte a ES modules e fetch;
- confiabilidade: não deve travar a UI em caso de erro da API;
- acessibilidade básica: labels, textos legíveis e contraste adequado;
- responsividade: layout funcional em desktop e mobile.

### 4.3 Dependências

- Vite
- TypeScript
- Vanilla JavaScript/TypeScript para manipulação do DOM
- OpenMeteo API para geocodificação e clima

---

## 5. Detalhes técnicos

### 5.1 Stack proposta

A aplicação será implementada com:

- Vite como ferramenta de build e servidor local;
- TypeScript para tipagem e organização do código;
- CSS para estilização visual;
- fetch para integração com a API externa;
- DOM para renderização dinâmica dos dados na interface.

### 5.2 Estrutura recomendada

A estrutura esperada do projeto pode ser organizada assim:

- src/main.ts: ponto de entrada da interface e lógica principal;
- src/style.css: estilos visuais da aplicação;
- src/assets/: arquivos de imagem ou ícones;
- index.html: container principal da aplicação.

### 5.3 Fluxo de dados

1. Usuário digita cidade.
2. A função de busca monta a URL de geocodificação.
3. A API retorna opções de localização.
4. O código seleciona a primeira cidade válida.
5. A aplicação monta a URL da previsão climática com latitude, longitude e timezone.
6. A API responde com os dados do clima atual e do horário.
7. O código processa a resposta e atualiza o DOM.
8. Em caso de falha, a UI mostra uma mensagem amigável.

### 5.4 Mapeamento de campos

Exemplo de campos essenciais:

- cidade: response.results[0].name
- latitude: response.results[0].latitude
- longitude: response.results[0].longitude
- timezone: response.results[0].timezone
- país: response.results[0].country_code
- temperatura atual: response.current.temperature_2m
- sensação térmica: response.current.apparent_temperature
- umidade: response.current.relative_humidity_2m
- precipitação: response.current.precipitation
- probabilidade: response.current.precipitation_probability
- vento: response.current.wind_speed_10m
- direção do vento: response.current.wind_direction_10m
- código do clima: response.current.weather_code

### 5.5 Código do clima

A API usa um código WMO para descrever a condição meteorológica. O app deve interpretar esse código para exibir uma descrição textual como:

- ensolarado
- parcialmente nublado
- nublado
- chuva leve
- chuva forte
- neve
- tempestade
- neblina

Esse mapeamento pode ser feito em um objeto de tradução dentro do código.

### 5.6 Tratamento assíncrono

Como a busca depende de chamadas externas à API, a aplicação deve usar:

- async/await para tornar o fluxo legível;
- estado de carregamento para bloquear ações repetidas;
- validação antes de enviar a request;
- fallback para erro em caso de resposta inesperada.

### 5.7 Regras de negócio sugeridas

- se o campo de busca estiver vazio, não chamar a API;
- se a cidade não for encontrada, exibir uma mensagem apropriada;
- se houver múltiplas cidades com o mesmo nome, considerar a primeira opção retornada pela API;
- se a resposta vier sem dados relevantes, mostrar erro de dados indisponíveis;
- manter a interface estável mesmo quando o carregamento estiver em andamento.

---

## 6. Instruções visuais

### 6.1 Layout geral

A página deve ter um visual limpo e moderno, com foco em clima e informação rápida. A estrutura sugerida é:

1. Cabeçalho com nome do app: "Clima"
2. Barra de busca no topo ou centralizada
3. Área principal com card de clima atual
4. Bloco de indicadores secundários
5. Estado de carregamento e mensagens de erro

### 6.2 Estrutura visual sugerida

#### Topo

- fundo suave com gradiente leve;
- título principal em destaque;
- campo de texto com placeholder como "Digite a cidade";
- botão com texto "Buscar" ou "Consultar".

#### Card principal

- conjunto central com cidade e país;
- temperatura grande em destaque;
- descrição do clima, como "Ensolarado" ou "Chuva leve";
- linha com sensação térmica e horário atual;
- ícone ou representação visual do clima.

#### Dados complementares

Organizar em mini cards ou blocos em grid:

- Umidade
- Vento
- Probabilidade de chuva
- Precipitação

Esses dados devem ser facilmente legíveis e visualmente equilibrados.

### 6.3 Paleta sugerida

- fundo principal: azul claro / cinza muito claro;
- destaque principal: azul escuro ou roxo suave;
- texto principal: escuro, legível;
- cards: fundo branco ou semi-transparente com sombra leve;
- acentos: azul, amarelo, verde e cinza conforme o tipo de informação.

### 6.4 Tipografia

- título principal grande e forte;
- temperatura em tamanho muito maior que os demais textos;
- labels pequenos em uppercase ou de peso moderado;
- corpo de texto legível e sem excesso de informação.

### 6.5 Estados visuais

#### Carregamento

- botão com estado de carregamento ou texto alternativo;
- evitar duplicação de requisições;
- manter a interface estável enquanto a resposta chega.

#### Erro

- caixa de aviso destacada em tom vermelho ou laranja;
- mensagem breve e orientativa;
- manter o formulário visível para nova tentativa.

#### Sucesso

- atualizar a área principal com os dados da cidade consultada;
- manter um layout limpo e sem sobreposição visual.

### 6.6 Responsividade

Em telas menores, o layout deve empilhar os elementos verticalmente. O campo de busca e o card principal devem manter proporções confortáveis para leitura em mobile.

---

## 7. Critérios de aceitação

1. O usuário consegue inserir o nome de uma cidade e consultar seu clima.
2. A interface exibe os dados principais do clima atual.
3. A aplicação trata corretamente caso a cidade não exista.
4. O sistema não quebra quando a API falha ou não retorna resultados completos.
5. A página funciona em navegador moderno e responde bem em telas pequenas.
6. Os dados exibidos são consistentes com a resposta da OpenMeteo.

---

## 8. Resumo executivo

Este projeto tem como objetivo entregar uma aplicação simples, leve e funcional de consulta de clima, com foco em usabilidade e integração com a API OpenMeteo. A experiência principal é buscar por cidade, obter geolocalização, carregar o clima atual e apresentar as principais informações meteorológicas em uma interface clara e visualmente organizada.

A solução deve priorizar simplicidade, rapidez, robustez na manipulação de erros e boa experiência em qualquer navegador moderno.
