# WeatherStack API

API REST desenvolvida com NestJS, TypeScript e Node.js para gerenciamento de usuários e dados climáticos. A aplicação oferece funcionalidades completas de autenticação, armazenamento de logs meteorológicos e exportação de dados em múltiplos formatos.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB
- **[JWT](https://jwt.io/)** - Autenticação via JSON Web Tokens
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Hashing de senhas
- **[ExcelJS](https://github.com/exceljs/exceljs)** - Geração de planilhas Excel
- **[json2csv](https://github.com/zemirco/json2csv)** - Conversão de JSON para CSV
- **[Google Generative AI](https://ai.google.dev/)** - Insights de IA sobre dados climáticos
- **[Zod](https://zod.dev/)** - Validação de schemas

## 🏗️ Arquitetura

A aplicação segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, organizada nas seguintes camadas:

### Estrutura de Diretórios

```
src/
├── core/                    # Tipos e utilitários base
│   ├── entities/           # Classes base de entidades
│   ├── types/              # Tipos genéricos
│   └── date/               # Utilitários de data
├── domain/                 # Camada de domínio
│   ├── users/             # Domínio de usuários
│   │   ├── entities/      # Entidades de usuário
│   │   ├── repositories/  # Interfaces de repositórios
│   │   ├── use-cases/     # Casos de uso
│   │   ├── cryptography/  # Interfaces de criptografia
│   │   └── errors/        # Erros de domínio
│   |── weather/           # Domínio de dados climáticos
│   |   ├── entities/      # Entidades de weather
│   |   ├── repositories/  # Interfaces de repositórios
│   |   ├── use-cases/     # Casos de uso
│   |   ├── reporter/      # Interfaces de exportação
│   |   ├── ai/            # Interfaces de IA
│   |   └── errors/        # Erros de domínio
│   └── star-wars/         # Domínio de Star Wars
│       ├── entities/      # Entidades
│       ├── providers/     # API externa que fornecerá as informações
│       ├── use-cases/     # Casos de uso
│       └── errors/        # Erros de domínio
└── infra/                 # Camada de infraestrutura
    ├── http/              # Camada HTTP (controllers)
    ├── database/          # Implementação do banco de dados
    ├── auth/              # Autenticação e autorização
    ├── cryptography/      # Implementação de criptografia
    ├── ai/                # Implementação de IA
    ├── reporter/          # Implementação de exportação
    ├── env/               # Configuração de ambiente
    |── date/              # Implementação de utilitários de data
    └── provider/          # Provedores externos, como outras APIs
```

### Princípios

- **Separation of Concerns**: Cada camada tem sua responsabilidade bem definida
- **Dependency Inversion**: Dependências apontam para abstrações, não implementações
- **Single Responsibility**: Cada classe tem uma única razão para mudar
- **Use Cases**: Toda lógica de negócio está encapsulada em casos de uso

## 📝 Scripts Disponíveis

```bash
pnpm build          # Compilar o projeto
pnpm start          # Iniciar em modo produção
pnpm start:dev      # Iniciar em modo desenvolvimento
pnpm start:debug    # Iniciar em modo debug
pnpm lint           # Executar linter (Biome)
pnpm format         # Formatar código (Biome)
```

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- Autenticação via JWT com chaves RSA
- Validação de dados de entrada com Zod
- Headers de segurança configurados
- CORS habilitado e configurável