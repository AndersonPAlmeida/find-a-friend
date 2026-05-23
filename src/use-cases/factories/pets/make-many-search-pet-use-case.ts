import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchManyPetUseCase } from '@/use-cases/pets/search-many-pet-use-case'

export function makeSearchManyPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petUseCase = new SearchManyPetUseCase(petsRepository)

  return petUseCase
}
