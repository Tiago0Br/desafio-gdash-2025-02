import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type WeatherDocument = HydratedDocument<WeatherModel>

@Schema()
export class WeatherModel {
  @Prop({ _id: true })
  _id!: string

  @Prop({ required: true })
  city!: string

  @Prop({ required: true })
  temperature!: number

  @Prop({ required: true })
  humidity!: number

  @Prop({ required: true })
  windSpeed!: number

  @Prop({ required: true })
  weatherCode!: number

  @Prop({ required: true })
  rainProbability!: number

  @Prop({ required: true })
  collectedAt!: string
}

export const WeatherSchema = SchemaFactory.createForClass(WeatherModel)
