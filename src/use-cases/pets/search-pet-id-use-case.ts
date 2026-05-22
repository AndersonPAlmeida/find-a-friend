import type { Pet } from '@/lib/prisma/generated/prisma/client'
import type { PetsRepository } from '@/repositories/pets-repository'
import { PetIdCadastratadoError } from '../errors/pets/org-id-invalido-error'

interface SearchPetUseCaseRequest {
  idPet: string
}

interface SearchPetUseCaseResponse {
  pet: Pet
}

export class SearchPetIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    idPet,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(idPet)

    if (!pet) {
      throw new PetIdCadastratadoError()
    }

    return {
      pet,
    }
  }
}
