# WeatherStack Frontend

Aplicação web moderna desenvolvida com React.js, TypeScript e Vite, que oferece uma interface intuitiva para visualização de dados climáticos em tempo real e gerenciamento de usuários. Utiliza TailwindCSS para estilização e componentes do shadcn/ui para uma experiência de usuário consistente e elegante.

## 🚀 Tecnologias

### Core
- **[React](https://react.dev/)** 19.2+ - Biblioteca JavaScript para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** 5.9+ - Superset JavaScript com tipagem estática
- **[Vite](https://vite.dev/)** 7.2+ - Build tool e dev server ultrarrápido

### Styling
- **[TailwindCSS](https://tailwindcss.com/)** 4.1+ - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI reutilizáveis e acessíveis
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de UI headless
- **[Lucide React](https://lucide.dev/)** - Ícones SVG elegantes

### State Management & Data Fetching
- **[TanStack Query](https://tanstack.com/query/)** - Gerenciamento de estado assíncrono
- **[React Hook Form](https://react-hook-form.com/)** - Formulários performáticos
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first

### Routing & HTTP
- **[React Router DOM](https://reactrouter.com/)** - Roteamento client-side
- **[Axios](https://axios-http.com/)** - Cliente HTTP

### Charts & Data Visualization
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos para React

## 🎨 Funcionalidades

### 🌡️ Dashboard

A página principal oferece uma visão completa dos dados climáticos:

- **KPIs em tempo real**
  - Temperatura atual
  - Umidade relativa
  - Velocidade do vento
  - Probabilidade de chuva

- **Gráfico histórico**
  - Visualização temporal da temperatura
  - Dados das últimas 24 horas
  - Gráfico de linha interativo com Recharts

- **Insights de IA**
  - Análise inteligente dos dados climáticos
  - Recomendações personalizadas
  - Powered by Google Generative AI

- **Exportação de dados**
  - Download em formato CSV
  - Download em formato Excel (XLSX)
  - Dados completos do histórico

### 👥 Gerenciamento de Usuários

Página dedicada para administração de usuários:

- **Listagem de usuários**
  - Tabela paginada
  - Informações detalhadas (nome, email, data de criação)
  - Ações rápidas por usuário

- **Criar novo usuário**
  - Modal com formulário validado
  - Campos: nome, email e senha
  - Validação em tempo real com Zod

- **Atualizar usuário**
  - Página dedicada para edição
  - Atualização de nome, email e senha
  - Validação de dados

- **Deletar usuário**
  - Dialog de confirmação
  - Proteção contra exclusão acidental

### 🔐 Autenticação

Sistema completo de autenticação:

- **Login**
  - Autenticação via email e senha
  - Persistência de token JWT
  - Redirecionamento automático

- **Registro**
  - Criação de nova conta
  - Validação de campos
  - Login automático após registro

- **Proteção de rotas**
  - Context API para gerenciamento de autenticação
  - Redirecionamento para login se não autenticado
  - Interceptor Axios para token JWT

### 🎨 Interface do Usuário

- **Layout responsivo**
  - Mobile-first design
  - Adaptação automática para diferentes telas

- **Notificações**
  - Toast messages com Sonner
  - Feedback visual para todas as ações

## 🏗️ Estrutura do Projeto

```
frontend/
├── public/                          # Arquivos estáticos
├── src/
│   ├── components/                  # Componentes React
│   │   ├── auth/                   # Componentes de autenticação
│   │   ├── dashboard/              # Componentes do dashboard
│   │   ├── users/                  # Componentes de usuários
│   │   ├── ui/                     # Componentes shadcn/ui
│   │   └── header.tsx              # Header da aplicação
│   ├── contexts/                    # Context API
│   │   └── auth-context.tsx        # Contexto de autenticação
│   ├── hooks/                       # Custom hooks
│   │   └── use-auth.ts             # Hook de autenticação
│   ├── http/                        # Serviços HTTP
│   │   ├── interceptors/           # Interceptors Axios
│   ├── layouts/                     # Layouts
│   │   └── app-layout.tsx          # Layout principal
│   ├── lib/                         # Bibliotecas e configurações
│   │   ├── axios.ts                # Configuração Axios
│   │   ├── local-storage.ts        # Helpers de localStorage
│   │   ├── query-client.ts         # Configuração TanStack Query
│   │   └── utils.ts                # Utilitários gerais
│   ├── pages/                       # Páginas da aplicação
│   │   ├── auth.tsx                # Página de autenticação
│   │   ├── dashboard.tsx           # Página do dashboard
│   │   ├── not-found.tsx           # Página 404
│   │   ├── update-user.tsx         # Página de atualização
│   │   └── users.tsx               # Página de usuários
│   ├── types/                       # TypeScript types
│   │   └── index.ts                # Types globais
│   ├── utils/                       # Funções utilitárias
│   ├── app.tsx                      # Componente raiz
│   ├── env.ts                       # Validação de variáveis de ambiente
│   ├── index.css                    # Estilos globais
│   ├── main.tsx                     # Entry point
│   └── routes.tsx                   # Configuração de rotas
├── components.json                  # Configuração shadcn/ui
├── biome.json                       # Configuração Biome (lint/format)
├── index.html                       # HTML template
├── package.json                     # Dependências
├── tsconfig.json                    # Configuração TypeScript
├── vite.config.ts                   # Configuração Vite
├── Dockerfile                       # Imagem Docker
└── nginx.conf                       # Configuração Nginx para produção
```

## 🔒 Autenticação e Segurança

### JWT Token

- Token armazenado no localStorage
- Enviado automaticamente em todas as requisições via interceptor
- Validação de expiração
- Logout automático em caso de token inválido

## 📝 Boas Práticas

- **TypeScript strict mode** ativado
- **Path aliases** (`@/`) para imports limpos
- **Componentes reutilizáveis** e modulares
- **Hooks customizados** para lógica compartilhada
- **Error boundaries** para tratamento de erros
- **Loading states** em todas as operações assíncronas
- **Feedback visual** para ações do usuário
- **Acessibilidade** (ARIA labels, keyboard navigation)
- **Código formatado** com Biome