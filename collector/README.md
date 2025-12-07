# WeatherStack Collector

Coletor de dados climáticos desenvolvido em Python que consome a API do Open-Meteo, coleta informações meteorológicas em tempo real e publica os dados em uma fila RabbitMQ para processamento posterior.

## 🚀 Tecnologias

- **[Python](https://www.python.org/)** 3.12+ - Linguagem de programação
- **[uv](https://github.com/astral-sh/uv)** - Gerenciador de pacotes Python ultrarrápido
- **[Open-Meteo API](https://open-meteo.com/)** - API gratuita de dados meteorológicos
- **[RabbitMQ](https://www.rabbitmq.com/)** - Message broker para filas de mensagens
- **[Pika](https://pika.readthedocs.io/)** - Cliente Python para RabbitMQ
- **[Schedule](https://schedule.readthedocs.io/)** - Agendamento de tarefas em Python
- **[Requests](https://requests.readthedocs.io/)** - Cliente HTTP para Python
- **[python-dotenv](https://github.com/theskumar/python-dotenv)** - Gerenciamento de variáveis de ambiente

## 📊 Funcionamento

O coletor segue o seguinte fluxo de operação:

1. **Inicialização**: Carrega as configurações do arquivo `.env`
2. **Coleta de dados**: Faz requisição HTTP para a API do Open-Meteo com as coordenadas configuradas
3. **Processamento**: Extrai os dados meteorológicos relevantes da resposta
4. **Publicação**: Envia os dados processados para a fila RabbitMQ
5. **Agendamento**: Aguarda o intervalo configurado e repete o processo

### Dados coletados

O coletor obtém os seguintes dados meteorológicos:

- **Temperatura** (`temperature_2m`): Temperatura atual em °C
- **Umidade** (`relative_humidity_2m`): Umidade relativa do ar em %
- **Velocidade do vento** (`wind_speed_10m`): Velocidade do vento em km/h
- **Probabilidade de chuva** (`precipitation_probability`): Probabilidade de precipitação em %
- **Timestamp**: Data e hora da coleta no formato ISO 8601

### Estrutura dos dados publicados

```json
{
  "temperature": 25.5,
  "humidity": 70,
  "wind_speed": 12.5,
  "rain_probability": 30,
  "collected_at": "2024-12-07T10:00:00"
}
```

## 🏗️ Estrutura do Projeto

```
collector/
├── main.py                      # Ponto de entrada da aplicação
├── config.py                    # Configurações e variáveis de ambiente
├── pyproject.toml              # Dependências e metadados do projeto
├── .env                        # Variáveis de ambiente (não versionado)
├── Dockerfile                  # Imagem Docker
└── services/
    ├── __init__.py
    ├── weather_service.py      # Serviço de coleta de dados do Open-Meteo
    └── rabbitmq_service.py     # Serviço de publicação no RabbitMQ
```

## 📦 Dependências

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| pika | >=1.3.2 | Cliente Python para RabbitMQ |
| python-dotenv | >=1.2.1 | Carregamento de variáveis de ambiente |
| requests | >=2.32.5 | Biblioteca HTTP para Python |
| schedule | >=1.2.2 | Agendador de tarefas |

## 🔍 Detalhes de Implementação

### Weather Service

O `weather_service.py` é responsável por:

- Fazer requisições HTTP para a API Open-Meteo
- Processar a resposta JSON
- Extrair dados meteorológicos relevantes
- Calcular a probabilidade de chuva com base nos dados horários
- Retornar um payload estruturado

### RabbitMQ Service

O `rabbitmq_service.py` implementa:

- Classe `RabbitMQPublisher` com context manager
- Conexão persistente com RabbitMQ usando credenciais
- Declaração de fila durável
- Publicação de mensagens com delivery mode persistente
- Tratamento de erros e logging
- Gerenciamento automático de conexões (conectar/desconectar)

### Sistema de Agendamento

Utiliza a biblioteca `schedule` para:

- Executar a coleta no intervalo configurado
- Executar a primeira coleta imediatamente ao iniciar
- Manter o processo em execução contínua
- Gerenciar o loop de eventos

## 🔒 Boas Práticas

- **Variáveis de ambiente**: Todas as configurações sensíveis são carregadas via `.env`
- **Validação**: O código valida a presença de coordenadas geográficas antes de iniciar
- **Context managers**: Uso de `with` para garantir o fechamento de conexões
- **Logging estruturado**: Logs detalhados para monitoramento e debugging
- **Tratamento de erros**: Exceções são capturadas e logadas adequadamente
- **Type hints**: Uso de tipagem para melhor manutenibilidade
- **Mensagens duráveis**: RabbitMQ configurado com filas e mensagens persistentes

## 🔧 Configuração da API Open-Meteo

A URL da API é construída dinamicamente com base nas coordenadas configuradas:

```
https://api.open-meteo.com/v1/forecast
  ?latitude={LAT}
  &longitude={LON}
  &current=temperature_2m,relative_humidity_2m,wind_speed_10m
  &hourly=precipitation_probability
```

### Exemplos de coordenadas

| Cidade | Latitude | Longitude |
|--------|----------|-----------|
| São Paulo | -23.5505 | -46.6333 |
| Rio de Janeiro | -22.9068 | -43.1729 |
| Brasília | -15.7975 | -47.8919 |
| Porto Alegre | -30.0346 | -51.2177 |
| Salvador | -12.9714 | -38.5014 |

## 🔄 Ajustando o Intervalo de Coleta

O intervalo de coleta pode ser ajustado via variável de ambiente `COLLECTION_INTERVAL` (em segundos):

```env
COLLECTION_INTERVAL=1800   # 30 minutos
COLLECTION_INTERVAL=3600   # 1 hora (padrão)
COLLECTION_INTERVAL=7200   # 2 horas
COLLECTION_INTERVAL=86400  # 24 horas
```

## 🐛 Troubleshooting

### Erro de conexão com RabbitMQ

```
Error connecting to RabbitMQ: [Errno 111] Connection refused
```

**Solução**: Verifique se o RabbitMQ está em execução e se as credenciais estão corretas.

### Coordenadas não definidas

```
AssertionError: REGION_LAT is not defined
```

**Solução**: Certifique-se de que as variáveis `REGION_LAT` e `REGION_LON` estão definidas no arquivo `.env`.

### Erro na API Open-Meteo

```
Error fetching weather data: 400 Client Error
```

**Solução**: Verifique se as coordenadas são válidas (latitude: -90 a 90, longitude: -180 a 180).

## 🔗 Links Úteis

- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
