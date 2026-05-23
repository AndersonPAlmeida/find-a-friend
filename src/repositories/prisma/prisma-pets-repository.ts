import { prisma } from '@/lib/prisma'
import type {
  Ambiente,
  Idade,
  Independencia,
  Nivel_Energia,
  Prisma,
  Tamanho,
} from '@/lib/prisma/generated/prisma/client'
import type { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(idPet: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: idPet,
      },
    })

    return pet
  }

  async findManyPets(
    cityOrg: string,
    page: number,
    idade?: Idade,
    tamanho?: Tamanho,
    nivelEnergia?: Nivel_Energia,
    independencia?: Independencia,
    ambiente?: Ambiente
  ) {
    const where: Prisma.PetWhereInput = {
      cidade_org: cityOrg,
    }

    if (idade) {
      where.idade = idade
    }

    if (tamanho) {
      where.tamanho = tamanho
    }

    if (nivelEnergia) {
      where.nivel_energia = nivelEnergia
    }

    if (independencia) {
      where.independencia = independencia
    }

    if (ambiente) {
      where.ambiente = ambiente
    }

    const pets = await prisma.pet.findMany({
      where,
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
