# WeatherStack

> Desafio para o processo seletivo GDASH 2025/02

Sistema completo de monitoramento e análise de dados climáticos com pipeline de dados em tempo real, API REST, inteligência artificial e interface web moderna.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Endpoints da API](#-endpoints-da-api)
- [Checklist de Desenvolvimento](#-checklist-de-desenvolvimento)
- [Autor](#-autor)

---

## 🌟 Sobre o Projeto

**WeatherStack** é uma aplicação full-stack desenvolvida como parte do processo seletivo da **GDASH**. O sistema implementa um pipeline completo de coleta, processamento e visualização de dados climáticos em tempo real, utilizando mensageria, persistência em banco de dados NoSQL, inteligência artificial generativa e uma interface web moderna e responsiva.

### Objetivos

- Coletar dados climáticos de APIs públicas de forma automatizada
- Processar dados através de uma fila de mensagens para garantir escalabilidade
- Armazenar e disponibilizar dados através de uma API REST robusta
- Gerar insights inteligentes utilizando IA generativa
- Apresentar dados de forma visual e intuitiva através de um dashboard web
- Implementar autenticação e gerenciamento de usuários

---

## 🏗 Arquitetura

O WeatherStack é composto por 4 microsserviços principais que trabalham de forma integrada:

```
┌─────────────────┐
│   Collector     │ (Python)
│   (Python)      │
│                 │
│ - Coleta dados  │
│   OpenMeteo API │
│ - Envia para    │
│   RabbitMQ      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   RabbitMQ      │
│   (Message      │
│    Broker)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Worker        │ (Go)
│   (Go)          │
│                 │
│ - Consome fila  │
│ - Envia para    │
│   API REST      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌─────────────────┐
│   API           │◄─────┤   MongoDB       │
│   (NestJS)      │      │   (Database)    │
│                 │      └─────────────────┘
│ - REST API      │
│ - Auth JWT      │      ┌─────────────────┐
│ - AI Insights   │◄─────┤   Google AI     │
│ - Export CSV    │      │   (Gemini)      │
└────────┬────────┘      └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Frontend      │ (React)
│   (React +      │
│    Vite)        │
│                 │
│ - Dashboard     │
│ - Auth/CRUD     │
│ - AI Insights   │
└─────────────────┘
```

### Fluxo de Dados

1. **Coleta**: O coletor Python consulta a API OpenMeteo periodicamente
2. **Mensageria**: Dados são publicados em uma fila RabbitMQ
3. **Processamento**: Worker Go consome mensagens e envia para a API
4. **Persistência**: API NestJS armazena dados no MongoDB
5. **Análise**: API integra com Google AI para gerar insights
6. **Visualização**: Frontend React consome a API e exibe os dados

---

## 🚀 Tecnologias

### Backend

- **Collector** (Python 3.12+)
  - `pika` - Cliente RabbitMQ
  - `requests` - Cliente HTTP
  - `python-dotenv` - Variáveis de ambiente

- **Worker** (Go 1.21+)
  - `amqp` - Cliente RabbitMQ
  - `net/http` - Cliente HTTP nativo

- **API** (Node.js 20+ / TypeScript)
  - **NestJS** - Framework backend
  - **Prisma** - ORM para MongoDB
  - **JWT** - Autenticação
  - **Google Generative AI** - IA generativa
  - **ExcelJS** - Exportação XLSX
  - **csv-writer** - Exportação CSV
  - **Biome** - Linter e formatter

### Frontend

- **React 18+** - Biblioteca UI
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **React Query** - Cache e sincronização de dados
- **Recharts** - Gráficos e visualizações

### Infraestrutura

- **Docker & Docker Compose** - Containerização
- **RabbitMQ** - Message broker
- **MongoDB** - Banco de dados NoSQL
- **Nginx** - Servidor web para frontend

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker](https://docs.docker.com/get-docker/) (versão 20.10 ou superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versão 2.0 ou superior)
- [Make](https://www.gnu.org/software/make/) (opcional, para comandos facilitados)

### Chaves de API Necessárias

- **Google AI API Key**: Obtenha em [Google AI Studio](https://aistudio.google.com/app/api-keys)

---

## 🔧 Instalação e Execução

### 1. Clone o Repositório

```bash
git clone https://github.com/GDASH-io/desafio-gdash-2025-02.git
cd desafio-gdash-2025-02
```

### 2. Configure as Variáveis de Ambiente

Crie o arquivo `.env` na raíz do projeto:

```bash
cp .env.example .env
```

```bash
# MongoDB Connection
MONGO_USER=
MONGO_PASSWORD=
MONGO_PORT=
MONGO_HOST="weather_mongo"

# RabbitMQ Connection
RABBITMQ_HOST="weather_broker"
RABBITMQ_USER=
RABBITMQ_PASS=
RABBITMQ_PORT=
RABBITMQ_QUEUE="weather_data"

# Configuration for searching for weather information.
COLLECTION_INTERVAL="3600" # 1 hour
REGION_LAT=
REGION_LON=

# Worker configuration
API_URL="http://api:3000"

# API Configuration
JWT_PRIVATE_KEY=    # Base64
JWT_PUBLIC_KEY=     # Base64
GENAI_API_KEY=
WORKER_API_TOKEN=
DEFAULT_USER_EMAIL= # Optional
DEFAULT_USER_PASSWORD= # Optional

# Frontend Configuration
VITE_API_URL=
VITE_REGION_NAME=
```

### 3. Inicie a Aplicação

#### Usando Docker Compose (Recomendado)

```bash
# Sobe todos os serviços
docker-compose up -d

# Ou usando Make
make up
```

### 4. Acesse a Aplicação

- **Frontend**: [http://localhost:5173](http://localhost:80)
- **API**: [http://localhost:3000](http://localhost:3000)
- **RabbitMQ Management**: [http://localhost:15672](http://localhost:15672)
- **MongoDB**: `mongodb://localhost:27017`

### 5. Primeira Execução

1. Acesse o frontend em [http://localhost:5173](http://localhost:5173)
2. Crie uma conta ou use o usuário default
3. Faça login
4. Acesse o dashboard para visualizar os dados climáticos

---

## 📁 Estrutura do Projeto

```
desafio-gdash/
├── api/                      # API REST (NestJS + TypeScript)
│   ├── src/
│   │   ├── core/            # Utilitários e tipos base
│   │   ├── domain/          # Lógica de negócio (DDD)
│   │   │   ├── users/       # Domínio de usuários
│   │   │   └── weather/     # Domínio de clima
│   │   └── infra/           # Infraestrutura
│   │       ├── ai/          # Integração Google AI
│   │       ├── auth/        # Autenticação JWT
│   │       ├── cryptography/# Hash e encriptação
│   │       ├── database/    # Prisma + MongoDB
│   │       └── http/        # Controllers e DTOs
│   └── package.json
│
├── collector/               # Coletor Python
│   ├── main.py             # Script principal
│   ├── services/           # Serviços de coleta
│   │   ├── weather_service.py
│   │   └── rabbitmq_service.py
│   └── requirements.txt
│
├── worker/                  # Worker Go
│   ├── main.go             # Entry point
│   └── internal/           # Pacotes internos
│       ├── config/         # Configurações
│       ├── domain/         # Modelos
│       ├── queue/          # RabbitMQ client
│       └── service/        # Lógica de envio
│
├── frontend/                # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── auth/       # Login/Registro
│   │   │   ├── dashboard/  # Dashboard clima
│   │   │   ├── users/      # CRUD usuários
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── contexts/       # Context API
│   │   ├── hooks/          # Custom hooks
│   │   ├── http/           # Requisições API
│   │   ├── pages/          # Páginas
│   │   └── utils/          # Utilitários
│   └── package.json
│
└── docker-compose.yml       # Orquestração de containers
```

---

## ✨ Funcionalidades

### 🌤 Dashboard de Clima

- **Visualização em tempo real** de dados climáticos
- **Gráficos interativos** com temperatura, umidade, precipitação
- **Dados históricos** com filtros de data
- **Atualização automática** via polling

### 🤖 Insights de IA

- **Análise inteligente** dos dados climáticos usando Google Gemini
- **Recomendações personalizadas** baseadas nas condições atuais
- **Tendências e previsões** geradas por IA

### 📊 Exportação de Dados

- **CSV**: Download de dados tabulares
- **XLSX**: Planilhas Excel formatadas
- **Filtros customizáveis** por período

### 👥 Gerenciamento de Usuários

- **Autenticação JWT** segura
- **CRUD completo** de usuários
- **Roles e permissões** (preparado para expansão)
- **Perfil de usuário** editável

### 📡 Coleta Automatizada

- **Agendamento inteligente** de coletas
- **Retry automático** em caso de falhas
- **Logging detalhado** de operações
- **Múltiplas localizações** (configurável)

---

## 🔌 Endpoints da API

### Autenticação

- POST /auth

### Usuários

- GET /users
- POST /users
- PUT /users
- DELETE /users

### Dados Climáticos

- POST /weather
- GET /weather/logs
- GET /weather/export/csv
- GET /weather/export/xlsx

---

## ✅ Checklist de Desenvolvimento

- [X] Python coleta dados de clima (Open-Meteo ou OpenWeather)  
- [X] Python envia dados para a fila  
- [X] Worker Go consome a fila e envia para a API NestJS  
- [X] API NestJS:
  - [X] Armazena logs de clima em MongoDB  
  - [X] Exponde endpoints para listar dados  
  - [X] Gera/retorna insights de IA (endpoint próprio)  
  - [X] Exporta dados em CSV/XLSX  
  - [X] Implementa CRUD de usuários + autenticação  
  - [ ] (Opcional) Integração com API pública paginada  
- [X] Frontend React + Vite + Tailwind + shadcn/ui:
  - [X] Dashboard de clima com dados reais  
  - [X] Exibição de insights de IA  
  - [X] CRUD de usuários + login  
  - [ ] (Opcional) Página consumindo API pública paginada  
- [X] Docker Compose sobe todos os serviços  
- [X] Código em TypeScript (backend e frontend)  
- [X] Vídeo explicativo (máx. 5 minutos)  
- [X] Pull Request via branch com seu nome completo  
- [X] README completo com instruções de execução  
- [X] Logs e tratamento de erros básicos em cada serviço  

---

## 👨‍💻 Autor

Desenvolvido por **Tiago Tavares Lopes** como parte do processo seletivo da GDASH 2025/02.

## 🎥 Vídeo de Demonstração

[https://youtu.be/tKMcNFqb0ww](https://youtu.be/tKMcNFqb0ww) - Link do vídeo

---

**WeatherStack** - Sistema completo de monitoramento climático com IA 🌤️🤖