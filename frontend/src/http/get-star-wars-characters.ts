import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

interface GetStarWarsCharactersRequestParams {
  page?: number
}

export interface StarWarsCharacter {
  id: string
  name: string
  gender: string
  height: string
  mass: string
}

interface GetStarWarsCharactersResponse {
  characters: StarWarsCharacter[]
  meta: {
    count: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export async function getStarWarsCharacters({
  page
}: GetStarWarsCharactersRequestParams) {
  try {
    const response = await api.get<GetStarWarsCharactersResponse>(
      '/star-wars',
      {
        params: {
          page
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}
