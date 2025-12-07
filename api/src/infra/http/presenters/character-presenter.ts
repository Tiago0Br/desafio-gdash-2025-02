import { Character } from "@/domain/star-wars/entities/character";

export class CharacterPresenter {
  static present(character: Character) {
    return {
      id: character.id,
      name: character.name,
      gender: character.gender,
      height: character.height,
      mass: character.mass,
      skinColor: character.skinColor,
      birthYear: character.birthYear
    }
  }
}