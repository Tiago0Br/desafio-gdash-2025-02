import { FindAllCharactersUseCase } from '@/domain/star-wars/use-cases/find-all-characters'
import { ConflictException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { ERROR_CODES } from '@/infra/http/error-codes'
import { CharacterPresenter } from '@/infra/http/presenters/character-presenter'

const findAllCharactersQuerySchema = z.object({
  page: z.coerce.number().default(1)
})

type FindAllCharactersQuerySchema = z.infer<typeof findAllCharactersQuerySchema>

const zodValidationPipe = new ZodValidationPipe(findAllCharactersQuerySchema)

@Controller('/star-wars')
export class FindAllCharactersController {
  constructor(private readonly findAllCharacters: FindAllCharactersUseCase) {}

  @Get()
  async handle(@Query(zodValidationPipe) { page }: FindAllCharactersQuerySchema) {
    const result = await this.findAllCharacters.execute({ page })

    if (result.isLeft()) {
      const error = result.value
      throw new ConflictException(error.message, {
        description: ERROR_CODES.starWarsApiUnavailable
      })
    }

    const { characters, meta } = result.value

    return {
      characters: characters.map(CharacterPresenter.present),
      meta
    }
  }
}
