import { Injectable } from '@nestjs/common'
import { ResponseMetadata, StarWarsProvider } from '../providers/star-wars-provider'
import { Either, left, right } from '@/core/either'
import { Character } from '../entities/character'
import { ApiUnavailable } from '../errors/api-unavailable-error'

interface FindAllCharactersUseCaseRequest {
  page: number
}

type FindAllCharactersUseCaseResponse = Promise<
  Either<ApiUnavailable, { characters: Character[]; meta: ResponseMetadata }>
>

@Injectable()
export class FindAllCharactersUseCase {
  constructor(private readonly starWarsProvider: StarWarsProvider) {}

  async execute({
    page
  }: FindAllCharactersUseCaseRequest): FindAllCharactersUseCaseResponse {
    try {
      const { characters, meta } = await this.starWarsProvider.findAll({ page })

      return right({ characters, meta })
    } catch (error) {
      return left(new ApiUnavailable())
    }
  }
}
