import { Entity } from '@/core/entities/entity'

export interface WeatherProps {
  city: string
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  rainProbability: number
  collectedAt: string
}

export class Weather extends Entity<WeatherProps> {
  get city() {
    return this.props.city
  }

  get temperature() {
    return this.props.temperature
  }

  get humidity() {
    return this.props.humidity
  }

  get windSpeed() {
    return this.props.windSpeed
  }

  get weatherCode() {
    return this.props.weatherCode
  }

  get rainProbability() {
    return this.props.rainProbability
  }

  get collectedAt() {
    return this.props.collectedAt
  }

  static create(props: WeatherProps, id?: string) {
    return new Weather(props, id)
  }
}
