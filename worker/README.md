# WeatherStack Worker

Worker desenvolvido em Go responsável por consumir mensagens da fila RabbitMQ contendo dados climáticos e enviá-las para a API REST do WeatherStack. Implementa um sistema robusto de processamento assíncrono com retry automático e tratamento de erros.

## 🚀 Tecnologias

- **[Go](https://go.dev/)** 1.25+ - Linguagem de programação
- **[RabbitMQ](https://www.rabbitmq.com/)** - Message broker
- **[amqp091-go](https://github.com/rabbitmq/amqp091-go)** - Cliente oficial RabbitMQ para Go
- **[godotenv](https://github.com/joho/godotenv)** - Carregamento de variáveis de ambiente

## 📊 Funcionamento

O worker segue o seguinte fluxo de operação:

1. **Inicialização**: Carrega configurações do arquivo `.env`
2. **Conexão**: Estabelece conexão com o RabbitMQ
3. **Consumo**: Escuta mensagens da fila configurada
4. **Deserialização**: Converte a mensagem JSON em struct Go
5. **Envio**: Envia os dados para a API REST via HTTP POST
6. **Retry**: Em caso de falha, tenta reenviar até 3 vezes com intervalo de 5 segundos
7. **Confirmação**: 
   - **ACK**: Mensagem processada com sucesso
   - **NACK**: Falha no processamento (mensagem não é recolocada na fila)

### Diagrama de Fluxo

```
RabbitMQ Queue → Worker Consumer → Deserialize JSON → HTTP POST → API REST
                                                              ↓
                                                         Retry (3x)
                                                              ↓
                                                      ACK/NACK Message
```

## 🏗️ Arquitetura

O worker segue princípios de **Clean Architecture**, com separação clara de responsabilidades:

### Estrutura de Diretórios

```
worker/
├── main.go                          # Ponto de entrada da aplicação
├── go.mod                           # Dependências do módulo
├── go.sum                           # Checksums das dependências
├── Dockerfile                       # Imagem Docker
├── .env                             # Variáveis de ambiente (não versionado)
└── internal/
    ├── config/
    │   └── config.go               # Configurações e carregamento de env
    ├── domain/
    │   └── weather.go              # Entidade de domínio
    ├── queue/
    │   └── rabbitmq.go             # Consumer RabbitMQ
    └── service/
        └── sender.go               # Serviço de envio HTTP
```

### Componentes

#### Config (`internal/config/config.go`)

Responsável por:
- Carregar variáveis de ambiente
- Validar configurações obrigatórias
- Gerar string de conexão RabbitMQ
- Fornecer configuração para toda a aplicação

#### Domain (`internal/domain/weather.go`)

Define a estrutura de dados:
```go
type WeatherData struct {
    Temperature     float64 `json:"temperature"`
    Humidity        float64 `json:"humidity"`
    WindSpeed       float64 `json:"wind_speed"`
    RainProbability float64 `json:"rain_probability"`
    CollectedAt     string  `json:"collected_at"`
}
```

#### Queue (`internal/queue/rabbitmq.go`)

Implementa o consumidor RabbitMQ:
- Conexão com broker
- Declaração de fila durável
- Consumo de mensagens
- Deserialização de JSON
- Gerenciamento de ACK/NACK
- Processamento assíncrono via goroutine

#### Service (`internal/service/sender.go`)

Serviço de envio HTTP:
- Serialização de dados para JSON
- Requisição HTTP POST para API
- Autenticação via header `x-api-key`
- Timeout de 10 segundos
- Sistema de retry automático (3 tentativas)
- Delay de 5 segundos entre retries
- Logging de operações

## 📡 API REST Integration

### Endpoint

```
POST /api/weather
```

### Headers

```
Content-Type: application/json
x-api-key: {WORKER_API_TOKEN}
```

### Body

```json
{
  "temperature": 25.5,
  "humidity": 70,
  "wind_speed": 12.5,
  "rain_probability": 30,
  "collected_at": "2024-12-07T10:00:00"
}
```

### Resposta Esperada

- **201 Created**: Dados salvos com sucesso
- **4xx/5xx**: Erro no processamento (aciona retry)

## 🔄 Sistema de Retry

O worker implementa um sistema robusto de retry:

```go
const (
    maxRetries = 3                 // Número máximo de tentativas
    delay      = 5 * time.Second   // Intervalo entre tentativas
)
```

### Comportamento

1. **Primeira tentativa**: Envia imediatamente
2. **Falha**: Aguarda 5 segundos e tenta novamente
3. **Segunda falha**: Aguarda mais 5 segundos
4. **Terceira falha**: Registra erro e envia NACK
5. **Sucesso em qualquer tentativa**: Envia ACK

## 🔒 Segurança e Boas Práticas

- **Autenticação**: Token de API via header customizado
- **Timeouts**: Timeout de 10 segundos para requisições HTTP
- **Graceful degradation**: NACK em falhas para evitar perda de dados
- **Validação**: Validação de variáveis de ambiente na inicialização
- **Logging estruturado**: Logs detalhados para monitoramento
- **Defer statements**: Garantia de fechamento de recursos
- **Error wrapping**: Contexto detalhado em mensagens de erro
- **Clean Architecture**: Separação clara de responsabilidades
- **Type safety**: Uso de structs tipadas para dados

## 📦 Dependências

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| github.com/rabbitmq/amqp091-go | v1.10.0 | Cliente oficial RabbitMQ |
| github.com/joho/godotenv | v1.5.1 | Carregamento de .env |

## 🐛 Troubleshooting

### Erro de conexão com RabbitMQ

```
Failed to connect to RabbitMQ: dial tcp: connect: connection refused
```

**Solução**: 
- Verifique se o RabbitMQ está em execução
- Confirme as credenciais no `.env`
- Teste a conexão: `telnet localhost 5672`

### Erro de autenticação na API

```
failed to send message: 401 Unauthorized
```

**Solução**: 
- Verifique se o `WORKER_API_TOKEN` está correto
- Confirme se o token está cadastrado na API
- Verifique se o header `x-api-key` está sendo enviado

### Variáveis de ambiente não encontradas

```
missing required RabbitMQ environment variables
```

**Solução**: 
- Crie o arquivo `.env` na raiz do projeto
- Verifique se todas as variáveis obrigatórias estão definidas
- Reinicie o worker após criar/editar o `.env`

### Timeout ao enviar para API

```
failed to request API: context deadline exceeded
```

**Solução**: 
- Verifique se a API está em execução
- Aumente o timeout se necessário (padrão: 10s)
- Verifique a conectividade de rede

### Mensagens não são processadas

**Verificações**:
1. Confirme que a fila tem mensagens: RabbitMQ Management UI
2. Verifique os logs do worker
3. Confirme que o nome da fila está correto
4. Verifique se há erros de deserialização JSON

### Métricas recomendadas

- Número de mensagens processadas
- Taxa de sucesso/falha
- Tempo médio de processamento
- Número de retries por mensagem
- Tamanho da fila RabbitMQ

## 🚀 Performance

O worker em Go oferece:

- **Alta performance**: Goroutines para processamento concorrente
- **Baixo consumo de memória**: Footprint mínimo do Go
- **Resiliência**: Sistema de retry e tratamento de erros
- **Escalabilidade**: Fácil de escalar horizontalmente
- **Rapidez**: Compilado para código nativo
