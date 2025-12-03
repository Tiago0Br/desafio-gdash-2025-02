import { useMutation } from '@tanstack/react-query'
import { CloudRain, Droplets, ThermometerSun, Wind } from 'lucide-react'
import { AiInsighsCard } from '@/components/dashboard/ai-insights-card'
import { ExportReportButton } from '@/components/dashboard/export-report-button'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { TemperatureHistoryCard } from '@/components/dashboard/temperature-history-card'
import { getCsvReporter } from '@/http/get-csv-reporter'
import { getXlsxReporter } from '@/http/get-xlsx-reporter'

const mockData = [
  { time: '10:00', temp: 22 },
  { time: '11:00', temp: 24 },
  { time: '12:00', temp: 28 },
  { time: '13:00', temp: 27 },
  { time: '14:00', temp: 25 },
  { time: '15:00', temp: 23 },
  { time: '16:00', temp: 21 }
]

export function DashboardPage() {
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

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <ExportReportButton
            reportType="xlsx"
            getContentFn={() => getXlsxReporterRequest()}
            disabled={isLoadingXlsxReporter}
          />
          <ExportReportButton
            reportType="csv"
            getContentFn={() => getCsvReporterRequest()}
            disabled={isLoadingCsvReporter}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <span className="text-sm">
            Região: <strong className="font-semibold">Americana/SP</strong>
          </span>
          <span className="text-sm">
            Atualizado em:{' '}
            <strong className="font-semibold">12/03/2025 11:44</strong>
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Temperatura"
            value="24°C"
            sub="Sensação de 26°C"
            icon={<ThermometerSun className="size-4 text-orange-500" />}
          />
          <KpiCard
            title="Umidade"
            value="62%"
            sub="+2% na última hora"
            icon={<Droplets className="size-4 text-blue-500" />}
          />
          <KpiCard
            title="Vento"
            value="12 km/h"
            sub="Direção: Sudeste"
            icon={<Wind className="size-4 text-slate-500" />}
          />
          <KpiCard
            title="Chuva"
            value="15%"
            sub="Probabilidade baixa"
            icon={<CloudRain className="size-4 text-cyan-500" />}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <TemperatureHistoryCard data={mockData} />

        <AiInsighsCard />
      </div>
    </main>
  )
}
