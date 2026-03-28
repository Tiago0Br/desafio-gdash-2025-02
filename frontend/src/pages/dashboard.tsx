import { useMutation, useQuery } from '@tanstack/react-query'
import { CloudRain, Droplets, ThermometerSun, Wind } from 'lucide-react'
import { AiInsighsCard } from '@/components/dashboard/ai-insights-card'
import { ExportReportButton } from '@/components/dashboard/export-report-button'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { TemperatureHistoryCard } from '@/components/dashboard/temperature-history-card'
import { Skeleton } from '@/components/ui/skeleton'
import { env } from '@/env'
import { getCsvReporter } from '@/http/get-csv-reporter'
import { getWeatherData } from '@/http/get-weather-data'
import { getXlsxReporter } from '@/http/get-xlsx-reporter'
import {
  getCurrentWeatherData,
  getTemperatureHistoryData,
  type FormattedWeatherData
} from '@/utils/organize-weather-data'
import { useEffect, useState } from 'react'
import { NoDataAvailable } from '@/components/dashboard/no-data-available'

export function DashboardPage() {
  const [currentWeather, setCurrentWeather] =
    useState<FormattedWeatherData | null>(null)

  const { data: weatherData, isLoading: isLoadingWeatherData } = useQuery({
    queryKey: ['weather-data'],
    queryFn: getWeatherData
  })

  const {
    mutateAsync: getCsvReporterRequest,
    isPending: isLoadingCsvReporter
  } = useMutation({
    mutationFn: getCsvReporter
  })

  const {
    mutateAsync: getXlsxReporterRequest,
    isPending: isLoadingXlsxReporter
  } = useMutation({
    mutationFn: getXlsxReporter
  })

  useEffect(() => {
    if (weatherData && weatherData.length > 0) {
      setCurrentWeather(getCurrentWeatherData(weatherData))
    }
  }, [weatherData])

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <ExportReportButton
            reportType="xlsx"
            getContentFn={() => getXlsxReporterRequest()}
            disabled={
              isLoadingXlsxReporter || isLoadingWeatherData || !currentWeather
            }
          />
          <ExportReportButton
            reportType="csv"
            getContentFn={() => getCsvReporterRequest()}
            disabled={
              isLoadingCsvReporter || isLoadingWeatherData || !currentWeather
            }
          />
        </div>
      </div>

      {!isLoadingWeatherData && !currentWeather ? (
        <NoDataAvailable />
      ) : (
        <>
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row justify-between">
              <span className="text-sm">
                Região:{' '}
                <strong className="font-semibold">
                  {env.VITE_REGION_NAME}
                </strong>
              </span>
              {currentWeather && (
                <span className="text-sm">
                  Atualizado em:{' '}
                  <strong className="font-semibold">
                    {currentWeather.createdAt}
                  </strong>
                </span>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {!currentWeather ? (
                <>
                  <Skeleton className="h-[150px] w-[296px]" />
                  <Skeleton className="h-[150px] w-[296px]" />
                  <Skeleton className="h-[150px] w-[296px]" />
                  <Skeleton className="h-[150px] w-[296px]" />
                </>
              ) : (
                <>
                  <KpiCard
                    title="Temperatura"
                    value={currentWeather.temperature}
                    sub={currentWeather.temperatureInsight}
                    icon={<ThermometerSun className="size-4 text-orange-500" />}
                  />
                  <KpiCard
                    title="Umidade"
                    value={currentWeather.humidity}
                    sub={currentWeather.humidityInsight}
                    icon={<Droplets className="size-4 text-blue-500" />}
                  />
                  <KpiCard
                    title="Vento"
                    value={currentWeather.windSpeed}
                    sub={currentWeather.windSpeedInsight}
                    icon={<Wind className="size-4 text-slate-500" />}
                  />
                  <KpiCard
                    title="Chuva"
                    value={currentWeather.rainProbability}
                    sub={currentWeather.rainInsight}
                    icon={<CloudRain className="size-4 text-cyan-500" />}
                  />
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <TemperatureHistoryCard
              data={weatherData ? getTemperatureHistoryData(weatherData) : []}
            />

            <AiInsighsCard disabled={isLoadingWeatherData} />
          </div>
        </>
      )}
    </main>
  )
}
