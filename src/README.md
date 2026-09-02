# ⛅ Climora

Uma aplicação web moderna, elegante e de alta precisão para consulta das condições meteorológicas em tempo real de qualquer cidade do mundo. Construída em **TypeScript puro (Vanilla)** com **Vite**, seguindo uma arquitetura desacoplada e padrões modernos de design mobile-first.

---

## ✨ Funcionalidades

- 🔍 **Busca Inteligente de Localidades**: Converte o nome da cidade em coordenadas geográficas e fuso horário oficial de forma instantânea.
- 🌡️ **Informações Climáticas em Tempo Real**:
  - Temperatura atual com unidade oficial da API (`°C`).
  - Sensação térmica aparente.
  - Umidade relativa do ar (`%`).
  - Probabilidade e precipitação de chuva (`%` e `mm`).
  - Velocidade e direção do vento convertida para 16 pontos cardeais em português (ex: `N`, `SSO`, `SE`).
- ☀️/🌙 **Diferenciação Dia e Noite**: Ícones SVG dinâmicos e badges visuais que mudam de acordo com a incidência solar local (`is_day`).
- 🎨 **Suporte Completo a Temas (Claro e Escuro)**:
  - Detecção automática da preferência do sistema operacional (`prefers-color-scheme`).
  - Alternância manual rápida via botão na barra superior.
  - Persistência da preferência do usuário no `localStorage`.
- 📱 **Design Mobile-First e Responsivo**:
  - Container centralizado com bordas arredondadas e largura máxima de 800px.
  - Layout adaptável que se ajusta com perfeição de celulares a telas ultrawide.
- 🛡️ **Experiência de Usuário Resiliente**:
  - Empty state inicial acolhedor e intuitivo.
  - Tratamento elegante para cidades inexistentes ou sem dados.
  - Indicador de carregamento (spinner) suave com bloqueio temporário de requisições simultâneas.

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

🚀 Tecnologias Utilizadas

- TypeScript: Tipagem estática rigorosa para garantir segurança e previsibilidade.
- Vite: Ferramenta de build moderna e servidor de desenvolvimento ultrarrápido.
- Vanilla CSS: CSS moderno com custom properties (variáveis CSS), flexbox, CSS grid e design tokens, sem dependência de frameworks externos.
- Open-Meteo API: API meteorológica de código aberto e alta precisão (Geocoding API + Forecast API).

📦 Como Executar o Projeto Localmente

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

🌐 Integrações de API
A aplicação consome dois serviços da Open-Meteo:

Geocoding API: Converte o texto informado pelo usuário em latitude, longitude, país e timezone (America/Sao_Paulo, etc.).
Forecast API: Retorna métricas meteorológicas instantâneas e unidades de medida com base nas coordenadas obtidas.

📄 Licença
Este projeto está sob a licença MIT.