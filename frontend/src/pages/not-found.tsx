import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  function handleGoHome() {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-2">Página não encontrada</h1>

      <p className="text-gray-600 mb-4">
        Desculpe, a página que você está tentando acessar não foi encontrada.
      </p>

      <Button onClick={handleGoHome} className="mt-4">
        Voltar para a home
      </Button>
    </div>
  )
}
