import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export function AiInsighsCard() {
  return (
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
            "A temperatura atual de 24°C está <strong>2 graus acima</strong> da
            média da semana. Recomendação: O clima está seco, leve uma garrafa
            de água se for sair para correr."
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Gerar nova análise
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
