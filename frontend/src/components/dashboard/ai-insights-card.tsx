import { useMutation } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getAiInsights } from '@/http/get-ai-insights'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LocalStorage } from '@/lib/local-storage'

interface AiInsightsCardProps {
  disabled?: boolean
}

export function AiInsighsCard({ disabled }: AiInsightsCardProps) {
  const [typedText, setTypedText] = useState(() => {
    const storedInsights = LocalStorage.getAiInsights()

    if (!storedInsights) {
      return ''
    }

    return storedInsights
  })

  const {
    mutateAsync: generateAiInsights,
    data,
    isPending
  } = useMutation({
    mutationFn: getAiInsights,
    onError: (error) => {
      toast.error(error.message)
    }
  })

  useEffect(() => {
    if (data) {
      const fulltext = `${data.analysis} ${data.recommendation}`

      const timeout = setTimeout(() => {
        setTypedText(fulltext.slice(0, typedText.length + 1))
      }, 20)

      return () => clearTimeout(timeout)
    }
  }, [data, typedText])

  async function handleClick() {
    setTypedText('')
    const insights = await generateAiInsights()
    LocalStorage.setAiInsights(
      `${insights.analysis} ${insights.recommendation}`
    )
  }

  return (
    <Card className="col-span-3 shadow-sm border-indigo-100 bg-linear-to-br from-white to-indigo-50/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium text-indigo-700">
          WeatherStack AI Analyst
        </CardTitle>
        <Sparkles className="h-5 w-5 text-indigo-500" />
      </CardHeader>
      <CardContent className="h-full">
        <div className="h-full mt-4 flex flex-col gap-4">
          <div className="flex-1 p-4 bg-white/60 backdrop-blur rounded-lg border border-indigo-100 text-sm text-slate-700 leading-relaxed">
            {typedText.trim().length > 0 ? (
              <p>"{typedText}"</p>
            ) : isPending ? (
              'Gerando análise de IA...'
            ) : (
              'Clique no botão abaixo para gerar uma análise com IA'
            )}
          </div>
          <Button
            onClick={handleClick}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isPending || disabled}
          >
            Gerar análise de IA
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
