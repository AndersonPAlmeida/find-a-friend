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
  page: number
  idade?: Idade
  tamanho?: Tamanho
  nivelEnergia?: Nivel_Energia
  independencia?: Independencia
  ambiente?: Ambiente
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchManyPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    cidadePet,
    page,
    idade,
    tamanho,
    nivelEnergia,
    independencia,
    ambiente,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyPets(
      cidadePet,
      page,
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
