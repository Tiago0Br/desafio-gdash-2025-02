package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"worker/internal/domain"
)

const (
	maxRetries = 3
	delay      = 5 * time.Second
)

type WeatherSender struct {
	ApiUrl string
}

func NewWeatherSender(apiUrl string) *WeatherSender {
	return &WeatherSender{
		ApiUrl: apiUrl,
	}
}

func (s *WeatherSender) Send(data domain.WeatherData) error {
	if s.ApiUrl == "" {
		return fmt.Errorf("API_URL not set")
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal data: %w", err)
	}

	res, err := http.Post(s.ApiUrl+"/weather", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to request API: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode == http.StatusCreated {
		log.Printf("Message sent successfully\n")
		return nil
	}

	body, _ := io.ReadAll(res.Body)
	return fmt.Errorf("failed to send message: %s. Body: %s", res.Status, string(body))
}

func (s *WeatherSender) SendWithRetry(data domain.WeatherData) error {
	for range maxRetries {
		if err := s.Send(data); err == nil {
			return nil
		}
		fmt.Println("Failed to send message, retrying...")
		time.Sleep(delay)
	}
	return fmt.Errorf("failed to send message after %d retries", maxRetries)
}
