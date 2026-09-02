# PRD - Tempira

## 1. Visão geral

O **Tempira** é uma aplicação web de clima em tempo real, desenvolvida em **Vite + Vanilla + TypeScript**, cujo objetivo é permitir que o usuário informe o nome de uma cidade e receba de forma rápida e intuitiva as condições climáticas atuais daquela região.

O produto utiliza a API gratuita da OpenMeteo para:
1. Buscar as coordenadas geográficas (latitude, longitude) e fuso horário (timezone) da cidade através do serviço de geocodificação.
2. Obter os dados meteorológicos completos (temperatura, umidade, sensação térmica, vento, precipitação e código WMO) através do serviço de previsão meteorológica.

A interface segue uma experiência visual premium, centrada no usuário, com suporte a tema claro e escuro (padrão escuro respeitando o sistema), abordagem estritamente **mobile-first**, empty states claros e um container central arredondado de até 800px contendo as informações divididas entre sidebar e área principal.

---

## 2. Objetivo do produto

- Permitir que qualquer pessoa consulte o clima de qualquer cidade do mundo de forma instantânea.
- Exibir com clareza visual a temperatura atual, estado do tempo (com ícones de dia/noite), umidade, sensação térmica, vento e probabilidade de chuva.
- Oferecer uma navegação livre de atritos: sem cadastros, sem necessidade de backend próprio, com carregamento unificado e tratamento seguro de erros ("não encontrou nada").
- Disponibilizar interface moderna com tema escuro padrão cinza escuro, alternância para tema claro e layout responsivo mobile-first.

---

## 3. Aspectos Funcionais e Fluxo de Uso

### 3.1 Busca por Cidade (Área Superior)
- A área superior da aplicação é centralizada e **não possui background**.
- Contém exclusivamente o campo de entrada da cidade e o botão de busca.
- A busca é acionada por clique no botão ou pressionamento da tecla `Enter`.
- O sistema valida a entrada: se o usuário submeter texto em branco, a busca é bloqueada com aviso amigável.

### 3.2 Fluxo Unificado com Loading
- Embora a consulta envolva **duas requisições sequenciais**:
  1. `Geocoding API`: obter `latitude`, `longitude`, `country_code`, `name` e `timezone`.
  2. `Forecast API`: obter dados meteorológicos atuais (`current`), unidades (`current_units`) e previsão horária (`hourly=temperature_2m`).
- Para o usuário final, trata-se de **uma única requisição com estado de loading**.
- Durante o carregamento, a interface exibe feedback visual sem quebras de layout.

### 3.3 Tratamento de Erros e Comportamento Seguro
- **Cidade não encontrada**: Se a API de geocodificação não retornar resultados para o termo digitado, a aplicação se comporta como se nada tivesse sido encontrado, apresentando o **Empty State / Not Found State** amigável.
- **Clima indisponível**: Se a cidade for encontrada mas a requisição de clima falhar, a aplicação também se comporta como se nada tivesse sido encontrado.
- As funções utilitárias da OpenMeteo validam parâmetros obrigatórios antes de emitir as requisições HTTP; parâmetros ausentes ou inválidos retornam `null` com segurança.

### 3.4 Suporte a Temas (Claro / Escuro)
- O projeto adota **fundo cinza escuro** como identidade visual principal.
- Por padrão, a aplicação segue a preferência configurada no sistema operacional do usuário (`prefers-color-scheme`).
- A interface disponibiliza um controle (toggle) para que o usuário possa alternar manualmente entre tema claro e tema escuro a qualquer momento, persistindo a escolha no `localStorage`.

---

## 4. Estrutura de Informações e Layout (Fiel ao Brain Dump)

### 4.1 Área Superior (Busca)
- Centralizada, sem cor de fundo (background transparente).
- Campo de busca com placeholder intuitivo ("Digite o nome da cidade...").

### 4.2 Container Principal (Até 800px)
- Fica centralizado na página, com `max-width: 800px`.
- Possui **borda bem arredondada** (`border-radius: 28px` a `32px`).
- Fundo em destaque: branco no tema claro e cartão escuro profundo no tema escuro.
- Abriga internamente a **Sidebar** (à esquerda em desktop) e a **Área Principal** (à direita em desktop). Em telas menores (mobile-first), os elementos se empilham com harmonia.

### 4.3 Sidebar (Esquerda)
Apresenta as informações essenciais de síntese:
1. **Temperatura atual**: valor numérico em grande destaque acompanhado da unidade (°C).
2. **Nome da cidade e Código do País**: nome da localização e badge com o código do país (ex.: `BR`, `US`, `FR`).
3. **Dia atual**: data formatada de forma legível em português (ex.: "Terça-feira, 1 de Setembro").
4. **Dia / Noite**: indicador derivado do campo `is_day` (1 para Dia, 0 para Noite).
5. **Weather Code**: condição do tempo traduzida conforme a tabela WMO, acompanhada de ícone ilustrativo dinâmico.

### 4.4 Área Principal (Direita)
Apresenta os indicadores complementares em cartões detalhados:
1. **Umidade Relativa**: percentual com unidade extraída de `current_units` (`%`).
2. **Temperatura Aparente (Sensação Térmica)**: valor em graus com unidade (`°C`).
3. **Probabilidade de Precipitação**: percentual de chance de chuva (`%`).
4. **Vento**: velocidade (`km/h`) e direção em rosa dos ventos (ex.: `N`, `SE`, `SSO`) convertida a partir de graus (`wind_direction_10m`).

### 4.5 Empty States
- **Estado Inicial (Vazio)**: Exibido antes de qualquer pesquisa ser feita, apresentando uma ilustração moderna e mensagem orientando o usuário a pesquisar uma localidade.
- **Estado Não Encontrado**: Exibido caso a localidade não exista ou a consulta falhe, com botão ou instrução para tentar novamente.

---

## 5. Especificações Técnicas da API OpenMeteo

### 5.1 Geocodificação
- **URL**: `https://geocoding-api.open-meteo.com/v1/search?name={NOME_DA_CIDADE}&count=1&language=en&format=json`
- **Campos necessários**:
  - `name`: Nome da cidade
  - `latitude`: Latitude decimal
  - `longitude`: Longitude decimal
  - `country_code`: Código do país (2 letras)
  - `timezone`: Fuso horário IANA (ex: "America/Sao_Paulo")

### 5.2 Previsão do Clima
- **URL**: `https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&hourly=temperature_2m&current=precipitation_probability,temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,weather_code&timezone={TIMEZONE}`
- **Campos obrigatórios consumidos**:
  - `current.temperature_2m`
  - `current.relative_humidity_2m`
  - `current.apparent_temperature`
  - `current.is_day` (0 = Noite, 1 = Dia)
  - `current.wind_speed_10m`
  - `current.wind_direction_10m`
  - `current.precipitation_probability`
  - `current.precipitation`
  - `current.weather_code`
  - `current_units`: mapa com as unidades de cada medida
  - `hourly.temperature_2m`: histórico/previsão horária de temperaturas

### 5.3 Mapeamento de Códigos WMO (Weather Code)

| Código | Descrição em Português |
| :--- | :--- |
| **0** | Céu limpo |
| **1, 2, 3** | Céu predominantemente limpo, parcialmente nublado e encoberto |
| **45, 48** | Nevoeiro e nevoeiro com formação de geada |
| **51, 53, 55** | Chuvisco: intensidade leve, moderada e densa |
| **56, 57** | Chuvisco congelante: intensidade leve e densa |
| **61, 63, 65** | Chuva: intensidade leve, moderada e forte |
| **66, 67** | Chuva congelante: intensidade leve e forte |
| **71, 73, 75** | Queda de neve: intensidade leve, moderada e forte |
| **77** | Grãos de neve |
| **80, 81, 82** | Pancadas de chuva: intensidade leve, moderada e violenta |
| **85, 86** | Pancadas de neve leves e fortes |
| **95** | Trovoada: leve ou moderada |
| **96, 99** | Trovoada com granizo leve e forte |

---

## 6. Critérios de Aceitação

1. O layout segue o padrão Mobile-First e se ajusta com perfeição de 320px até desktops largos.
2. A área de busca é centralizada e não possui background.
3. O container com as informações possui borda bem arredondada, largura máxima de 800px e centralização na tela.
4. Há visualização clara de Empty State antes da primeira busca e quando uma cidade não for encontrada.
5. O tema padrão é cinza escuro, respeitando a preferência do sistema operacional, com controle funcional para alternar entre modo claro e escuro.
6. A sidebar exibe: temperatura, cidade/país, dia atual, dia/noite e weather code com ícone visual adaptado para dia ou noite.
7. A área principal exibe: umidade, temperatura aparente, chance de chuva e velocidade/direção do vento.
8. As funções de API validam parâmetros e se comportam como "nada encontrado" em caso de ausência ou falha.
