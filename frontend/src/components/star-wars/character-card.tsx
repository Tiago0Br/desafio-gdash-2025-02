import type { StarWarsCharacter } from '@/http/get-star-wars-characters'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Ruler, User, Weight } from 'lucide-react'

export function CharacterCard({ character }: { character: StarWarsCharacter }) {
  const formatData = (data: string) =>
    data === 'unknown' || data === 'n/a' ? '?' : data

  const formatGender = (data: string) => {
    let result: string

    switch (data) {
      case 'female':
        result = 'Feminino'
        break
      case 'male':
        result = 'Masculino'
        break
      default:
        result = 'Não informado'
        break
    }

    return result
  }

  return (
    <Card className="hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{character.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 capitalize">
          <User className="h-3 w-3" /> {formatGender(character.gender)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-1 p-2 bg-secondary/40 rounded-md">
            <span className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
              <Ruler className="h-3 w-3" /> Altura
            </span>
            <span className="font-bold">
              {formatData(character.height)}{' '}
              {character.height !== 'unknown' && 'cm'}
            </span>
          </div>
          <div className="flex flex-col gap-1 p-2 bg-secondary/40 rounded-md">
            <span className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
              <Weight className="h-3 w-3" /> Massa
            </span>
            <span className="font-bold">
              {formatData(character.mass)}{' '}
              {character.mass !== 'unknown' && 'kg'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
