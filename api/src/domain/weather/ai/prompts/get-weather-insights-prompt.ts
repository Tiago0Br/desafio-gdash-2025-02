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
      Analise os dados abaixo climáticos abaixo:

      ${
        weeklyStats
          ? `
      DADOS HISTÓRICOS (Últimos 7 dias):
      - Média Temperatura: ${weeklyStats.avgTemperature.toFixed(1)}°C
      - Mínima da semana: ${weeklyStats.minTemperature}°C / Máxima: ${weeklyStats.maxTemperature}°C
      - Média Umidade: ${weeklyStats.avgHumidity.toFixed(1)}%
      - Velocidade máxima do Vento: ${weeklyStats.maxWindSpeed.toFixed(1)} km/h
      - Probabilidade de chuva: ${weeklyStats.avgRainProbability.toFixed(1)}%
      `
          : ''
      }

      DADO ATUAL (Agora):
      - Temperatura: ${mostRecentLog.temperature}°C
      - Umidade: ${mostRecentLog.humidity}%
      - Chuva: ${mostRecentLog.rainProbability}%
      - Velocidade do Vento: ${mostRecentLog.windSpeed.toFixed(1)} km/h
      - Atualizado em: ${mostRecentLog.collectedAt}

      Gere um resumo curto contendo:
      ${weeklyStats ? '- Uma comparação rápida do clima atual com a média dos últimos 7 dias (ex: se está mais quente ou frio que o normal).\n' : ''}
      - Uma recomendação prática de saúde baseada nas condições atuais (foco em hidratação, proteção UV, respiratório ou exercícios físicos).

      Regras:
      - Seja breve e objetivo (sem saudações);
      - Use os dados que foram fornecidos;
      - Seja educado, formal, mas mantenha uma linguagem que seja acessível (sem jargões ou termos técnicos).
      - Retorne apenas texto e emojis (somente se achar necessário).
      - Não retorne tags html ou símbolos que representem algum tipo de formatação.

      A resposta deve seguir a seguinte estrutura:
      - analysis: Análise do clima atual em comparação com a média dos últimos 7 dias;
      - recommendation: Recomendação de saúde baseada nas condições atuais.
    `
}
