import { Entity } from '@/core/entities/entity'

export interface WeatherProps {
  temperature: number
  humidity: number
  windSpeed: number
  rainProbability: number
  collectedAt: string
}

export class Weather extends Entity<WeatherProps> {
  get temperature() {
    return this.props.temperature
  }

  get humidity() {
    return this.props.humidity
  }

  get windSpeed() {
    return this.props.windSpeed
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
