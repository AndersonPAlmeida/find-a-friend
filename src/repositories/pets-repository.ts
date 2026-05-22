import type {
  Ambiente,
  Idade,
  Independencia,
  Nivel_Energia,
  Pet,
  Prisma,
  Tamanho,
} from '@/lib/prisma/generated/prisma/client'

export interface PetsRepository {
  findManyPets(
    cityOrg: string,
    idade?: Idade,
    tamanho?: Tamanho,
    nivelEnergia?: Nivel_Energia,
    independencia?: Independencia,
    ambiente?: Ambiente
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
