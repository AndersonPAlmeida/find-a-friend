import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetIdUseCase } from '@/use-cases/pets/search-pet-id-use-case'

export function makeSearchPetIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petUseCase = new SearchPetIdUseCase(petsRepository)

  return petUseCase
}
