import type { WeatherData } from '@/http/get-weather-data'
import dayjs from 'dayjs'

export interface FormattedWeatherData {
  temperature: string
  temperatureInsight: string | null
  humidity: string
  humidityInsight: string | null
  windSpeed: string
  windSpeedInsight: string | null
  rainProbability: string
  rainInsight: string
  createdAt: string
}

interface TemperatureHistoryData {
  time: string
  temp: number
}

export function getCurrentWeatherData(
  weatherData: WeatherData[]
): FormattedWeatherData {
  const data = weatherData[0]

  return {
    temperature: `${data.temperature}°C`,
    temperatureInsight: getInsight(weatherData, 'temperature'),
    humidity: `${data.humidity}%`,
    humidityInsight: getInsight(weatherData, 'humidity'),
    windSpeed: `${data.windSpeed} km/h`,
    windSpeedInsight: getInsight(weatherData, 'windSpeed'),
    rainProbability: `${data.rainProbability}%`,
    rainInsight: getRainInsight(data.rainProbability),
    createdAt: dayjs(data.createdAt)
      .subtract(3, 'hour')
      .format('DD/MM/YYYY HH:mm')
  }
}

export function getTemperatureHistoryData(
  data: WeatherData[]
): TemperatureHistoryData[] {
  const lastRecords = data.slice(0, 7).reverse()

  return lastRecords.map((item, index) => {
    const previousDate = lastRecords[index - 1]
      ? dayjs(lastRecords[index - 1].createdAt)
          .subtract(3, 'hour')
          .format('DD/MM')
      : null
    const currentDate = dayjs(item.createdAt)
      .subtract(3, 'hour')
      .format('DD/MM')

    const withDate = previousDate !== null && previousDate !== currentDate

    return {
      time: dayjs(item.createdAt)
        .subtract(3, 'hour')
        .format(withDate ? 'DD/MM HH:mm' : 'HH:mm'),
      temp: item.temperature
    }
  })
}

function getRainInsight(rainProbability: number): string {
  if (rainProbability < 30) {
    return 'Probabilidade baixa'
  } else if (rainProbability < 60) {
    return 'Probabilidade média'
  } else if (rainProbability < 90) {
    return 'Probabilidade alta'
  } else {
    return 'Probabilidade muito alta'
  }
}

function getInsight(
  weatherData: WeatherData[],
  field: 'humidity' | 'windSpeed' | 'temperature'
): string | null {
  const currentValue = weatherData[0][field]
  const previousValue = weatherData[1][field]

  if (!currentValue || !previousValue) {
    return null
  }

  let percentage: number
  let description: string

  if (currentValue > previousValue) {
    percentage = Math.round(
      ((currentValue - previousValue) / currentValue) * 100
    )
    description = `+${percentage}% em relação ao último registro`
  } else if (currentValue < previousValue) {
    percentage = Math.round(
      ((previousValue - currentValue) / previousValue) * 100
    )
    description = `-${percentage}% em relação ao último registro`
  } else {
    description = 'Igual ao último registro'
  }

  return description
}
