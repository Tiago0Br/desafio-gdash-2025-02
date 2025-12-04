package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	RabbitMQUser     string
	RabbitMQPassword string
	RabbitMQHost     string
	RabbitMQPort     string
	RabbitMQQueue    string
	ApiUrl           string
	ApiToken         string
}

func Load() (*Config, error) {
	_ = godotenv.Load("../.env")

	cfg := &Config{
		RabbitMQUser:     os.Getenv("RABBITMQ_USER"),
		RabbitMQPassword: os.Getenv("RABBITMQ_PASS"),
		RabbitMQHost:     os.Getenv("RABBITMQ_HOST"),
		RabbitMQPort:     os.Getenv("RABBITMQ_PORT"),
		RabbitMQQueue:    os.Getenv("RABBITMQ_QUEUE"),
		ApiUrl:           os.Getenv("VITE_API_URL"),
		ApiToken:         os.Getenv("WORKER_API_TOKEN"),
	}

	if cfg.RabbitMQUser == "" || cfg.RabbitMQPassword == "" || cfg.RabbitMQHost == "" || cfg.RabbitMQPort == "" || cfg.RabbitMQQueue == "" {
		return nil, fmt.Errorf("missing required RabbitMQ environment variables")
	}

	if cfg.ApiUrl == "" || cfg.ApiToken == "" {
		return nil, fmt.Errorf("missing required API environment variables")
	}

	return cfg, nil
}

func (c *Config) GetConnectionString() string {
	return fmt.Sprintf("amqp://%s:%s@%s:%s/", c.RabbitMQUser, c.RabbitMQPassword, c.RabbitMQHost, c.RabbitMQPort)
}
