import type {
  Ambiente,
  Idade,
  Independencia,
  Nivel_Energia,
  Pet,
  Tamanho,
} from '@/lib/prisma/generated/prisma/client'
import type { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  cidadePet: string
  idade?: Idade
  tamanho?: Tamanho
  nivelEnergia?: Nivel_Energia
  independencia?: Independencia
  ambiente?: Ambiente
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    cidadePet,
    idade,
    tamanho,
    nivelEnergia,
    independencia,
    ambiente,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyPets(
      cidadePet,
      idade,
      tamanho,
      nivelEnergia,
      independencia,
      ambiente
    )

    return {
      pets,
    }
  }
}
