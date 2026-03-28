import requests
import logging
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

def get_weather_data(api_url: str) -> Optional[Dict[str, Any]]:
  """Fetch weather data from Open-Meteo API"""
  try:
    logger.info(f"Fetching weather data from {api_url}")
    response = requests.get(api_url)
    response.raise_for_status()
    data = response.json()

    current = data.get('current', {})
    hourly = data.get('hourly', {})

    current_time_iso = current.get('time')

    rain_probability = 0
    if current_time_iso in hourly.get('time', []):
      index = hourly['time'].index(current_time_iso)
      rain_probability = hourly['precipitation_probability'][index]

    payload = {
      "temperature": current.get('temperature_2m'),
      "humidity": current.get('relative_humidity_2m'),
      "wind_speed": current.get('wind_speed_10m'),
      "rain_probability": rain_probability,
      "collected_at": current_time_iso
    }
    
    logger.info("Weather data fetched successfully")
    return payload
  except Exception as e:
    logger.error(f"Error fetching weather data: {e}")
    return None
