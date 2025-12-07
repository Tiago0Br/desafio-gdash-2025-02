import { Character } from '../entities/character'

export interface PaginationParams {
  page: number
}

export interface ResponseMetadata {
  count: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface FindAllCharactersResponse {
  meta: ResponseMetadata
  characters: Character[]
}

export abstract class StarWarsProvider {
  abstract findAll({ page }: PaginationParams): Promise<FindAllCharactersResponse>
}
