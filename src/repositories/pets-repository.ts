import type { Pet, Prisma } from '@/lib/prisma/generated/prisma/client'

export interface PetsRepository {
  findByCity(city: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
