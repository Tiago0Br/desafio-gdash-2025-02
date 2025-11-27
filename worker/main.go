package main

import (
	"log"

	"worker/internal/config"
	"worker/internal/queue"
	"worker/internal/service"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %s", err)
	}

	sender := service.NewWeatherSender(cfg.ApiUrl)
	consumer := queue.NewRabbitMQConsumer(cfg, sender)

	log.Println("Starting worker...")
	if err := consumer.Start(); err != nil {
		log.Fatalf("Worker failed: %s", err)
	}
}
