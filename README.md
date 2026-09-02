# ⛅ Tempira

Uma aplicação web moderna, elegante e de alta precisão para consulta das condições meteorológicas em tempo real de qualquer cidade do mundo. Construída em **TypeScript puro (Vanilla)** com **Vite**, seguindo uma arquitetura desacoplada, padrões de design mobile-first e integração contínua (CI/CD).

> 🚀 **Acesse a aplicação no ar:** [https://slayer-br.github.io/tempira/](https://slayer-br.github.io/tempira/)

---

## ✨ Funcionalidades

- 🔍 **Busca Inteligente de Localidades**: Converte instantaneamente o nome da cidade em coordenadas geográficas, país e fuso horário oficial.
- 🌡️ **Métricas Climáticas com Precisão Decimal (`pt-BR`)**:
  - Temperatura atual com 1 casa decimal (`°C`).
  - Sensação térmica aparente com 1 casa decimal.
  - Umidade relativa do ar (`%`).
  - Probabilidade e precipitação de chuva (`%` e `mm`).
- 🧭 **Bússola Dinâmica & Direção do Vento**:
  - Velocidade do vento com 1 casa decimal (`km/h`).
  - Agulha de bússola vetorial que **rotaciona em tempo real** no ângulo exato do vento.
  - Sigla do ponto cardeal e nome por extenso em português (ex: `Sul-Sudoeste (162°)`).
  - Classificação de intensidade da brisa baseada na escala de Beaufort (*Calmo*, *Brisa suave*, *Vento moderado*, etc.).
- ☀️/🌙 **Diferenciação Dia e Noite**: Ícones SVG dinâmicos e badges visuais que mudam de acordo com a incidência solar local (`is_day`).
- 🎨 **Suporte Completo a Temas (Claro e Escuro)**:
  - Detecção automática da preferência do sistema operacional (`prefers-color-scheme`).
  - Alternância manual rápida via botão na barra superior.
  - Persistência da preferência do usuário no `localStorage`.
- 📱 **Design Mobile-First e Responsivo**:
  - Container centralizado com bordas arredondadas e largura máxima de 800px.
  - Layout adaptável que se ajusta com perfeição de celulares compactos a telas ultrawide.
- 🛡️ **Experiência de Usuário Resiliente**:
  - Empty state inicial acolhedor e intuitivo.
  - Tratamento elegante para cidades inexistentes ou falhas de rede.
  - Indicador de carregamento suave com bloqueio temporário de requisições simultâneas.

---

## 🏛️ Arquitetura do Projeto

O projeto adota uma **arquitetura desacoplada** com separação estrita de responsabilidades:

```text
src/
├── types/                     # Contratos de dados e interfaces estritas
│   ├── geo.types.ts           # Interfaces de geolocalização e respostas da API
│   ├── weather.types.ts       # Modelos climáticos, unidades e códigos WMO
│   ├── theme.types.ts         # Tipos para alternância de tema
│   └── index.ts               # Ponto central de exportação dos contratos
│
├── utils/                     # Funções utilitárias puras (sem efeitos colaterais)
│   ├── dateFormatter.ts       # Formatação amigável de datas em pt-BR
│   ├── windCalculator.ts      # Conversão de graus em pontos cardeais da bússola
│   ├── weatherCodes.ts        # Mapeamento oficial WMO e gerador de SVGs climáticos
│   ├── domUtils.ts            # Sanitização e escape seguro contra XSS
│   └── index.ts               # Ponto central de exportação de utilitários
│
├── services/                  # Regras de negócio, integrações de rede e estado
│   ├── api/
│   │   └── openMeteoApi.ts    # Cliente HTTP puro para os endpoints da OpenMeteo
│   ├── weatherService.ts      # Orquestrador assíncrono unificado de consulta climática
│   ├── themeService.ts        # Gerenciamento reativo de tema (sistema + localStorage)
│   └── index.ts               # Ponto central de exportação dos serviços
│
├── ui/                        # Componentes e renderização do DOM
│   ├── layout.ts              # Estrutura base da aplicação e nós tipados
│   ├── stateViews.ts          # Templates de Empty State inicial, Não Encontrado e Loading
│   ├── weatherCard.ts         # Sidebar de síntese + Grid com 4 métricas principais
│   ├── feedback.ts            # Banner de mensagens temporárias e avisos
│   └── index.ts               # Ponto central de exportação da camada de interface
│
├── style.css                  # Folha de estilo global com variáveis CSS e design tokens
└── main.ts                    # Ponto de entrada (Bootstrap enxuto conectando UI aos serviços)
```
---

## 🚀 Tecnologias Utilizadas

- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática rigorosa para garantir segurança e manutenibilidade.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build moderna e servidor de desenvolvimento ultrarrápido.
- **[Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)**: CSS moderno com custom properties (variáveis CSS), flexbox, CSS grid e design tokens, sem dependência de frameworks pesados.
- **[Open-Meteo API](https://open-meteo.com/)**: API meteorológica gratuita de alta precisão (Geocoding API + Forecast API).
- **[GitHub Actions](https://github.com/features/actions)**: Pipeline de CI/CD automatizado para build e deploy contínuo no GitHub Pages.

---

## 📦 Como Executar o Projeto Localmente

Pré-requisitos
- Node.js instalado (versão 18 ou superior recomendada).
- Gerenciador de pacotes npm ou pnpm / yarn.

Passo a passo
1. Clone o repositório:

```bash
git clone https://github.com/slayer-br/tempira.git
cd tempira
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```
Acesse a aplicação no navegador em http://localhost:5173/.

4. Gerar build de produção:

```bash
npm run build
```
Os arquivos otimizados para distribuição serão gerados no diretório dist/.

5. Visualizar a build de produção:

```bash
npm run preview
```

---

## 🌐 Integrações de API
A aplicação consome dois serviços da [Open-Meteo API](https://open-meteo.com/):

1. **[Geocoding API](https://open-meteo.com/en/docs/geocoding-api)**: Converte o texto informado pelo usuário em latitude, longitude, país e timezone (America/Sao_Paulo, etc.).
2. **[Forecast API](https://open-meteo.com/en/docs)**: Retorna métricas meteorológicas instantâneas e unidades de medida com base nas coordenadas obtidas.

---

## 📄 Licença
Este projeto está sob a [Licença MIT](LICENSE).