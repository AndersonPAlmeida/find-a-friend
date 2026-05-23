import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '@/use-cases/pets/register-pet-use-case'

export function makeRegisterPetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const petUseCase = new RegisterPetUseCase(orgsRepository, petsRepository)

  return petUseCase
}
