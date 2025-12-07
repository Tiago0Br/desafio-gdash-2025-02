import { HttpService as RequestService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { EnvService } from '../env/env.service'
import {
  FindAllCharactersResponse,
  PaginationParams,
  StarWarsProvider
} from '@/domain/star-wars/providers/star-wars-provider'
import { Character } from '@/domain/star-wars/entities/character'

interface StarWarsApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<Character & { url: string }>
}

@Injectable()
export class SwapiApiProvider implements StarWarsProvider {
  private readonly apiUrl: string
  constructor(
    private readonly requestService: RequestService,
    private readonly envService: EnvService
  ) {
    this.apiUrl = this.envService.get('STAR_WARS_API_URL')
  }

  async findAll({ page }: PaginationParams): Promise<FindAllCharactersResponse> {
    const result = await this.requestService.axiosRef.get<StarWarsApiResponse>(
      `${this.apiUrl}/api/people`,
      {
        params: {
          page
        }
      }
    )

    return {
      characters: result.data.results.map((character) => {
        const match = character.url.match(/\/(\d+)\/$/)
        const characterId = match?.[1] as string

        return Character.create({
          name: character.name,
          gender: character.gender,
          birthYear: character.birthYear,
          height: character.height,
          mass: character.mass,
          skinColor: character.skinColor
        }, characterId)
      }),
      meta: {
        count: result.data.count,
        hasNextPage: result.data.next !== null,
        hasPreviousPage: result.data.previous !== null
      }
    }
  }
}
