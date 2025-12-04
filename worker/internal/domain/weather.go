package domain

type WeatherData struct {
	Temperature     float64 `json:"temperature"`
	Humidity        float64 `json:"humidity"`
	WindSpeed       float64 `json:"wind_speed"`
	RainProbability float64 `json:"rain_probability"`
	CollectedAt     string  `json:"collected_at"`
}
