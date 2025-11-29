package queue

import (
	"encoding/json"
	"log"

	"worker/internal/config"
	"worker/internal/domain"
	"worker/internal/service"

	amqp "github.com/rabbitmq/amqp091-go"
)

type RabbitMQConsumer struct {
	Config *config.Config
	Sender *service.WeatherSender
}

func NewRabbitMQConsumer(cfg *config.Config, sender *service.WeatherSender) *RabbitMQConsumer {
	return &RabbitMQConsumer{
		Config: cfg,
		Sender: sender,
	}
}

func (r *RabbitMQConsumer) Start() error {
	connectionString := r.Config.GetConnectionString()
	connection, err := amqp.Dial(connectionString)
	if err != nil {
		return err
	}
	defer connection.Close()

	ch, err := connection.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		r.Config.RabbitMQQueue,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	messages, err := ch.Consume(
		q.Name,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	forever := make(chan struct{})

	go func() {
		for d := range messages {
			log.Printf("Received a message: %s\n", d.Body)

			var data domain.WeatherData
			if err := json.Unmarshal(d.Body, &data); err != nil {
				log.Printf("Failed to unmarshal message: %s\n", err)
				d.Nack(false, false)
				continue
			}

			if err := r.Sender.SendWithRetry(data); err != nil {
				log.Printf("Error sending data: %s\n", err)
				d.Nack(false, false)
			} else {
				d.Ack(false)
			}
		}
	}()

	log.Println(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever

	return nil
}
