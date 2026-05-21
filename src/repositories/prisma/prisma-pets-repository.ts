import { prisma } from '@/lib/prisma'
import type { Pet, Prisma } from '@/lib/prisma/generated/prisma/client'
import type { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    throw new Error('Method not implemented.')
  }
}
