import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertCircleIcon,
  ChevronLeft,
  ChevronRight,
  Rocket
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getStarWarsCharacters } from '@/http/get-star-wars-characters'
import { CharacterCard } from '@/components/star-wars/character-card'
import { useSearchParams } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function StarWarsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(() => {
    const currentPage = searchParams.get('page') ?? '1'
    return Number(currentPage)
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['star-wars-characters', page],
    queryFn: () => getStarWarsCharacters({ page })
  })

  useEffect(() => {
    if (page) {
      setSearchParams({ page: String(page) })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [page])

  const handleNext = () => {
    if (data?.meta.hasNextPage) {
      setPage((p) => p + 1)
    }
  }

  const handlePrev = () => {
    if (data?.meta.hasPreviousPage) {
      setPage((p) => p - 1)
    }
  }

  const handleFirstPage = () => {
    setPage(1)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            Integração SWAPI
          </h1>
          <p className="text-muted-foreground">
            Explorando o universo de Star Wars através de uma API pública
            paginada.
          </p>
        </div>
        {data && (
          <span className="text-sm text-muted-foreground border px-3 py-1 rounded-md bg-secondary/50">
            Total de {data.meta.count} personagens encontrados
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))
          : data?.characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
      </div>

      {!isLoading && isError && (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Erro na API do Star Wars.</AlertTitle>
          <AlertDescription>
            <p>Por favor, tente novamente mais tarde.</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">Página {page}</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFirstPage}
            disabled={isLoading || page === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Início
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={isLoading || !data?.meta.hasPreviousPage}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={isLoading || !data?.meta.hasNextPage}
          >
            Próximo <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
