import type { Pet, Prisma } from '@/lib/prisma/generated/prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
