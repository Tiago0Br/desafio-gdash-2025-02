import { RefreshCcw } from 'lucide-react'
import { Button } from '../ui/button'
import { useQueryClient } from '@tanstack/react-query'

export function NoDataAvailable() {
  const queryClient = useQueryClient()

  function handleRefresh() {
    queryClient.invalidateQueries({
      queryKey: ['weather-data']
    })
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Nenhum dado disponível</h2>
        <p className="text-gray-600">Nenhum dado disponível para exibir.</p>

        <Button className="mt-8" onClick={handleRefresh}>
          <RefreshCcw className="size-4" /> Atualizar
        </Button>
      </div>
    </div>
  )
}
