import {
  CloudRain,
  Download,
  Droplets,
  Sparkles,
  ThermometerSun,
  Wind
} from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Download className="mr-2 size-4" />
            Exportar XLSX
          </Button>
          <Button>
            <Download className="mr-2 size-4" />
            Exportar CSV
          </Button>
        </div>
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

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Histórico de Temperatura (Hoje)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}°C`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '8px'
                    }}
                    itemStyle={{ color: '#000' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#2563eb' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm border-indigo-100 bg-linear-to-br from-white to-indigo-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-indigo-700">
              WeatherStack AI Analyst
            </CardTitle>
            <Sparkles className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-white/60 backdrop-blur rounded-lg border border-indigo-100 text-sm text-slate-700 leading-relaxed">
                "A temperatura atual de 24°C está <strong>2 graus acima</strong>{' '}
                da média da semana. Recomendação: O clima está seco, leve uma
                garrafa de água se for sair para correr."
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Gerar nova análise
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
