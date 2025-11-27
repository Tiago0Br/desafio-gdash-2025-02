package domain

type WeatherData struct {
	City            string  `json:"city"`
	Temperature     float64 `json:"temperature"`
	Humidity        float64 `json:"humidity"`
	WindSpeed       float64 `json:"wind_speed"`
	WeatherCode     float64 `json:"weather_code"`
	RainProbability float64 `json:"rain_probability"`
	CollectedAt     string  `json:"collectedAt"`
}
