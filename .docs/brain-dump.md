Projeto: Tempira

Este projeto vai pegar a cidade e basedo nisso, consultar o clima daquela região, exibindo as principais informações de clima, temperatura, umidade e etc.

### Aspectos Técnicos

O projeto será feito em Vite + Vanilla + TypeScript

### Informações da API que será utilizada no projeto

Usará a API OpenMeteo, com os seguintes endpoints:

#### Para conseguir a latitude, longitude e timezone, baseado no nome da cidade: https://geocoding-api.open-meteo.com/v1/search?name=&count=1&language=en&format=json

Onde {NOME_DA_CIDADE} = Nome da cidade que o usuário digitou.

Exemplo de resposta:
{"results":[{"id":3451190,"name":"Rio de Janeiro","latitude":-22.90642,"longitude":-43.18223,"elevation":12.0,"feature_code":"PPLA","country_code":"BR","admin1_id":3451189,"admin2_id":6322060,"timezone":"America/Sao_Paulo","population":6747815,"country_id":3469034,"country":"Brazil","admin1":"Rio de Janeiro","admin2":"Rio de Janeiro"}],"generationtime_ms":1.0142326}

Informações que necessitamos:

- name
- latitude
- longitude
- country_code
- timezone

#### Para conseguir as informações de clima:

https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&hourly=temperature_2m&current=precipitation_probability,temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,weather_code&timezone={TIMEZONE}

Onde: {LATITUDE} = latitude, {LONGITUDE} = longitude e {TIMEZONE} = timezone

Exemplo de resposta:
{
"latitude": -22.952549,
"longitude": -43.215027,
"generationtime_ms": 0.355839729309082,
"utc_offset_seconds": 0,
"timezone": "GMT",
"timezone_abbreviation": "GMT",
"elevation": 12,
"current_units": {
"time": "iso8601",
"interval": "seconds",
"precipitation_probability": "%",
"temperature_2m": "°C",
"relative_humidity_2m": "%",
"is_day": "",
"apparent_temperature": "°C",
"wind_speed_10m": "km/h",
"wind_direction_10m": "°",
"precipitation": "mm",
"weather_code": "wmo code"
},

"current": {
"time": "2026-09-01T20:15",
"interval": 900,
"precipitation_probability": 80,
"temperature_2m": 21.5,
"relative_humidity_2m": 97,
"is_day": 1,
"apparent_temperature": 25.4,
"wind_speed_10m": 3.6,
"wind_direction_10m": 162,
"precipitation": 0.5,
"weather_code": 80
},

"hourly_units": {
"time": "iso8601",
"temperature_2m": "°C"

},

"hourly": {
"time": [
"2026-09-01T00:00",
"2026-09-01T01:00",
"2026-09-01T02:00",
"2026-09-01T03:00",
"2026-09-01T04:00",
"2026-09-01T05:00",
"2026-09-01T06:00",
"2026-09-01T07:00",
"2026-09-01T08:00",
"2026-09-01T09:00",
"2026-09-01T10:00",
"2026-09-01T11:00",
"2026-09-01T12:00",
"2026-09-01T13:00",
"2026-09-01T14:00",
"2026-09-01T15:00",
"2026-09-01T16:00",
"2026-09-01T17:00",
"2026-09-01T18:00",
"2026-09-01T19:00",
"2026-09-01T20:00",
"2026-09-01T21:00",
"2026-09-01T22:00",
"2026-09-01T23:00",
"2026-09-02T00:00",
"2026-09-02T01:00",
"2026-09-02T02:00",
"2026-09-02T03:00",
"2026-09-02T04:00",
"2026-09-02T05:00",
"2026-09-02T06:00",
"2026-09-02T07:00",
"2026-09-02T08:00",
"2026-09-02T09:00",
"2026-09-02T10:00",
"2026-09-02T11:00",
"2026-09-02T12:00",
"2026-09-02T13:00",
"2026-09-02T14:00",
"2026-09-02T15:00",
"2026-09-02T16:00",
"2026-09-02T17:00",
"2026-09-02T18:00",
"2026-09-02T19:00",
"2026-09-02T20:00",
"2026-09-02T21:00",
"2026-09-02T22:00",
"2026-09-02T23:00",
"2026-09-03T00:00",
"2026-09-03T01:00",
"2026-09-03T02:00",
"2026-09-03T03:00",
"2026-09-03T04:00",
"2026-09-03T05:00",
"2026-09-03T06:00",
"2026-09-03T07:00",
"2026-09-03T08:00",
"2026-09-03T09:00",
"2026-09-03T10:00",
"2026-09-03T11:00",
"2026-09-03T12:00",
"2026-09-03T13:00",
"2026-09-03T14:00",
"2026-09-03T15:00",
"2026-09-03T16:00",
"2026-09-03T17:00",
"2026-09-03T18:00",
"2026-09-03T19:00",
"2026-09-03T20:00",
"2026-09-03T21:00",
"2026-09-03T22:00",
"2026-09-03T23:00",
"2026-09-04T00:00",
"2026-09-04T01:00",
"2026-09-04T02:00",
"2026-09-04T03:00",
"2026-09-04T04:00",
"2026-09-04T05:00",
"2026-09-04T06:00",
"2026-09-04T07:00",
"2026-09-04T08:00",
"2026-09-04T09:00",
"2026-09-04T10:00",
"2026-09-04T11:00",
"2026-09-04T12:00",
"2026-09-04T13:00",
"2026-09-04T14:00",
"2026-09-04T15:00",
"2026-09-04T16:00",
"2026-09-04T17:00",
"2026-09-04T18:00",
"2026-09-04T19:00",
"2026-09-04T20:00",
"2026-09-04T21:00",
"2026-09-04T22:00",
"2026-09-04T23:00",
"2026-09-05T00:00",
"2026-09-05T01:00",
"2026-09-05T02:00",
"2026-09-05T03:00",
"2026-09-05T04:00",
"2026-09-05T05:00",
"2026-09-05T06:00",
"2026-09-05T07:00",
"2026-09-05T08:00",
"2026-09-05T09:00",
"2026-09-05T10:00",
"2026-09-05T11:00",
"2026-09-05T12:00",
"2026-09-05T13:00",
"2026-09-05T14:00",
"2026-09-05T15:00",
"2026-09-05T16:00",
"2026-09-05T17:00",
"2026-09-05T18:00",
"2026-09-05T19:00",
"2026-09-05T20:00",
"2026-09-05T21:00",
"2026-09-05T22:00",
"2026-09-05T23:00",
"2026-09-06T00:00",
"2026-09-06T01:00",
"2026-09-06T02:00",
"2026-09-06T03:00",
"2026-09-06T04:00",
"2026-09-06T05:00",
"2026-09-06T06:00",
"2026-09-06T07:00",
"2026-09-06T08:00",
"2026-09-06T09:00",
"2026-09-06T10:00",
"2026-09-06T11:00",
"2026-09-06T12:00",
"2026-09-06T13:00",
"2026-09-06T14:00",
"2026-09-06T15:00",
"2026-09-06T16:00",
"2026-09-06T17:00",
"2026-09-06T18:00",
"2026-09-06T19:00",
"2026-09-06T20:00",
"2026-09-06T21:00",
"2026-09-06T22:00",
"2026-09-06T23:00",
"2026-09-07T00:00",
"2026-09-07T01:00",
"2026-09-07T02:00",
"2026-09-07T03:00",
"2026-09-07T04:00",
"2026-09-07T05:00",
"2026-09-07T06:00",
"2026-09-07T07:00",
"2026-09-07T08:00",
"2026-09-07T09:00",
"2026-09-07T10:00",
"2026-09-07T11:00",
"2026-09-07T12:00",
"2026-09-07T13:00",
"2026-09-07T14:00",
"2026-09-07T15:00",
"2026-09-07T16:00",
"2026-09-07T17:00",
"2026-09-07T18:00",
"2026-09-07T19:00",
"2026-09-07T20:00",
"2026-09-07T21:00",
"2026-09-07T22:00",
"2026-09-07T23:00"
],
"temperature_2m": [22.5, 22.5, 22.5, 22.8, 22.8, 22.7, 22.8, 23.1, 23.2, 22, 21.9, 22.6, 24.4, 25.4, 25.9, 26.4, 25.5, 23.6, 23.3, 22.3, 21.6, 21.3, 21.1, 21, 21.2, 20.3, 20.2, 20.1, 19.9, 19.9, 19.8, 19.6, 19.8, 19.8, 19.9, 20.5, 21.4, 22.2, 22.7, 22.8, 22.9, 22.6, 22.2, 21.8, 21.2, 20.4, 20, 19.6, 19.4, 19.2, 19, 18.6, 18.2, 17.9, 17.7, 17.5, 17.4, 17.3, 18.3, 19.4, 20.4, 21.6, 22.7, 23.8, 24.4, 24.6, 24.2, 23.8, 23.3, 22.3, 21.5, 20.9, 20.5, 20, 19.6, 19.3, 19.2, 18.9, 18.7, 18.5, 18.6, 18.6, 20.1, 22, 23.8, 25.9, 27.7, 27.9, 27.9, 26.4, 25.6, 24.9, 23.6, 22.7, 22.3, 22, 21.7, 21.6, 21.3, 21.2, 21, 20.9, 20.6, 20.3, 20.1, 20.2, 20.9, 21.9, 22.8, 23.4, 23.7, 23.9, 23.7, 23.2, 22.7, 22.2, 21.7, 21.3, 21.2, 21.2, 21.2, 21, 20.9, 20.7, 20.7, 20.6, 20.6, 20.6, 20.7, 20.8, 21, 21.2, 21.3, 21.1, 20.7, 20.4, 20.2, 20, 19.8, 19.4, 19, 18.6, 18.5, 18.5, 18.4, 18.3, 18.2, 18, 17.7, 17.5, 17.3, 17.2, 17.2, 17.3, 17.6, 17.8, 17.9, 18, 18.2, 18.3, 18.4, 18.5, 18.5, 18.5, 18.4, 18.3, 18.1, 18]
}
}

Informações que necessitamos da resposta:

Na resposta tenho dois itens:

- current_units contém as unidades de medida das propriedades
- current contem os valores das propriedades
- Propriedades obrigatórias:
  - temperature_2m
  - relative_humidity_2m
  - apparent_temperature
  - is_day
  - wind_speed_10m
  - wind_direction_10m
  - precipitation_probability

#### Informação importante:

Teremos um arquivo com as funções do OpenMeteo, para que o projeto não faça requisição direta a API, mas, use as funções desse arquivo.

Fluxo de pesquisa para receber o nome da cidade e receber as informações de clima:

- O usuário digita o nome da cidade
- O projeto pega o nome e isa o OpenMeteo para conseguir a latitude, longitude e timezone da cidade

- Ao conseguir as informações, o projeto usa as informações para fazer a requisição e receber as informações do clima da localização
- Caso não encontre as informações da cidade, se comporta como se não encontra-se nada

- Caso encontre as informações da cidade, ms não do clima, se comporta como se não tivesse encontrado nada

A busca envolve as 2 requisições (busca latitude/longitude/timezone + buscar clima), mas para o usuário é uma requisição só, com um loading.

As funções do OpenMeteo devem verificar se os parâmetros fora informados, caso contrário age como se os parâmetros não foram informado.

### Aspectos visuais (design e UX)

Ter Empty State.

Uma área superior centralizada que terá apenas o campo de busca da cidade

O projeto terá um sidebar a esquerda com as informações:

- Temperatura
- Nome da cidade e Código do País
- Dia atual
- dia/noite (baseado em is_day)
- Weather Code

Informações para interpretação do Weather Code:

WMO Weather interpretation codes (WW)

| Code       | Description                                      |
| ---------- | ------------------------------------------------ |
| 0          | Clear sky                                        |
| 1, 2, 3    | Mainly clear, partly cloudy, and overcast        |
| 45, 48     | Fog and depositing rime fog                      |
| 51, 53, 55 | Drizzle: Light, moderate, and dense intensity    |
| 56, 57     | Freezing Drizzle: Light and dense intensity      |
| 61, 63, 65 | Rain: Slight, moderate and heavy intensity       |
| 66, 67     | Freezing Rain: Light and heavy intensity         |
| 71, 73, 75 | Snow fall: Slight, moderate, and heavy intensity |
| 77         | Snow grains                                      |
| 80, 81, 82 | Rain showers: Slight, moderate, and violent      |
| 85, 86     | Snow showers slight and heavy                    |
| 95 \*      | Thunderstorm: Slight or moderate                 |
| 96, 99 \*  | Thunderstorm with slight and heavy hail          |

Na área principal teremos:

- Umidade
- Temperatura aparente
- Probabilidade de precipitação
- Velocidade/Direção do vento

Design Geral:

- Projeto terá fundo cinza escuro (mas quero a possibilidade de tema claro/escuro, o padrão será do sistema), não esqueça que deve usar mobile-first.
- A parte superior não tera background, mas a sidebar e a área principal, ficarão dentro de uma div com borda bem arredondada, fundo branco, centralizada e largura máxima de 800px.
