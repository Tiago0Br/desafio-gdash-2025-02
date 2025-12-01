import { Weather } from '@/domain/weather/entities/weather'
import { WeatherWeeklyStats } from '@/domain/weather/repositories/weather-repository'

interface GetWeatherInsightsPromptParams {
  mostRecentLog: Weather
  weeklyStats: WeatherWeeklyStats | null
}

export function getWeatherInsightsPrompt({
  mostRecentLog,
  weeklyStats
}: GetWeatherInsightsPromptParams) {
  return `
      Atue como um analista de dados climáticos e saúde.
      Analise os dados abaixo da cidade de ${mostRecentLog.city}.

      ${
        weeklyStats
          ? `
      DADOS HISTÓRICOS (Últimos 7 dias):
      - Média Temperatura: ${weeklyStats.avgTemperature.toFixed(1)}°C
      - Mínima da semana: ${weeklyStats.minTemperature}°C / Máxima: ${weeklyStats.maxTemperature}°C
      - Média Umidade: ${weeklyStats.avgHumidity.toFixed(1)}%
      `
          : ''
      }

      DADO ATUAL (Agora):
      - Temperatura: ${mostRecentLog.temperature}°C
      - Umidade: ${mostRecentLog.humidity}%
      - Chuva: ${mostRecentLog.rainProbability}%

      Gere um resumo curto contendo:
      ${weeklyStats ? '- Uma comparação rápida do clima atual com a média dos últimos 7 dias (ex: se está mais quente ou frio que o normal).\n' : ''}
      - Uma recomendação prática de saúde baseada nas condições atuais (foco em hidratação, proteção UV, respiratório ou exercícios físicos).

      Regras:
      - Seja breve e objetivo (sem saudações);
      - Use os dados que foram fornecidos;
      - Seja educado, formal, mas mantenha uma linguagem que seja acessível (sem jargões ou termos técnicos).
    `
}
