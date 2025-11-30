import { GoogleGenAI } from '@google/genai'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as ExcelJS from 'exceljs'
import { Parser } from 'json2csv'
import { Model } from 'mongoose'
import { EnvService } from '@/infra/env/env.service'
import { Weather } from './schemas/weather.schema'

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel('Weather') private weatherModel: Model<Weather>,
    private envService: EnvService
  ) {}

  async create(weather: Weather) {
    const createdWeather = new this.weatherModel(weather)
    return createdWeather.save()
  }

  async findAll(limit = 20, offset = 0) {
    return this.weatherModel.find().skip(offset).limit(limit).exec()
  }

  async findAndExportCsv(limit: number) {
    const data = await this.weatherModel
      .find()
      .sort({ collectedAt: -1 })
      .limit(limit)
      .lean()
      .exec()

    const fields = [
      'city',
      'temperature',
      'humidity',
      'windSpeed',
      'weatherCode',
      'rainProbability',
      'collectedAt'
    ]

    const json2csvParser = new Parser({ fields })
    const csv = json2csvParser.parse(data)

    return csv
  }

  async findAndExportXlsx(limit: number) {
    const data = await this.weatherModel
      .find()
      .sort({ collectedAt: -1 })
      .limit(limit)
      .lean()
      .exec()

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Weather Logs')

    worksheet.columns = [
      { header: 'City', key: 'city', width: 32 },
      { header: 'Temperature', key: 'temperature', width: 16 },
      { header: 'Humidity', key: 'humidity', width: 16 },
      { header: 'Wind Speed', key: 'windSpeed', width: 16 },
      { header: 'Weather Code', key: 'weatherCode', width: 16 },
      { header: 'Rain Probability', key: 'rainProbability', width: 16 },
      { header: 'Collected At', key: 'collectedAt', width: 32 }
    ]

    worksheet.addRows(data)

    worksheet.getRow(1).font = { bold: true }

    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }

  private async getWeeklyStats() {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const stats = await this.weatherModel.aggregate([
      {
        $match: {
          collectedAt: { $gte: sevenDaysAgo.toISOString() }
        }
      },
      {
        $group: {
          _id: null,
          avgTemp: { $avg: '$temperature' },
          maxTemp: { $max: '$temperature' },
          minTemp: { $min: '$temperature' },
          avgHum: { $avg: '$humidity' },
          maxWind: { $max: '$windSpeed' },
          avgRainProb: { $avg: '$rainProbability' }
        }
      }
    ])

    return stats.length > 0 ? stats[0] : null
  }

  async generateAiInsights() {
    const current = await this.weatherModel
      .findOne()
      .sort({ collectedAt: -1 })
      .exec()

    const weeklyStats = await this.getWeeklyStats()

    const defaultMessage = 'Dados insuficientes para gerar análise.'

    if (!current || !weeklyStats) {
      return defaultMessage
    }

    const prompt = `
      Atue como um analista de dados climáticos e saúde.
      Analise os dados abaixo da cidade de ${current.city}.

      DADOS HISTÓRICOS (Últimos 7 dias):
      - Média Temperatura: ${weeklyStats.avgTemp.toFixed(1)}°C
      - Mínima da semana: ${weeklyStats.minTemp}°C / Máxima: ${weeklyStats.maxTemp}°C
      - Média Umidade: ${weeklyStats.avgHum.toFixed(1)}%

      DADO ATUAL (Agora):
      - Temperatura: ${current.temperature}°C
      - Umidade: ${current.humidity}%
      - Chuva: ${current.rainProbability}%

      Gere um resumo curto contendo:
      1. Uma comparação rápida do clima atual com a média da semana (ex: se está mais quente ou frio que o normal).
      2. Uma recomendação prática de saúde baseada nas condições atuais (foco em hidratação, proteção UV, respiratório ou exercícios físicos).

      Regras:
      - Seja breve e objetivo (sem saudações);
      - Use os dados que foram fornecidos;
      - Seja educado, formal, mas mantenha uma linguagem que seja acessível (sem jargões ou termos técnicos).
    `

    const genAI = new GoogleGenAI({
      apiKey: this.envService.get('GENAI_API_KEY')
    })

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ text: prompt }]
    })

    let result = response.text

    if (!result) {
      result = defaultMessage
    }

    return result
  }
}
