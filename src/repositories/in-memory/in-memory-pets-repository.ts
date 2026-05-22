import { randomUUID } from 'node:crypto'
import type {
  Ambiente,
  Idade,
  Independencia,
  Nivel_Energia,
  Pet,
  Tamanho,
} from '@/lib/prisma/generated/prisma/client'
import type { PetUncheckedCreateInput } from '@/lib/prisma/generated/prisma/models'
import type { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  async findById(idPet: string) {
    const pet = this.pets.find((item) => item.id === idPet)

    if (!pet) {
      return null
    }

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
    const pets = this.pets
      .filter((item) => {
        return (
          item.cidade_org.toLowerCase() === cityOrg.toLowerCase() &&
          (!idade || item.idade === idade) &&
          (!tamanho || item.tamanho === tamanho) &&
          (!nivelEnergia || item.nivel_energia === nivelEnergia) &&
          (!independencia || item.independencia === independencia) &&
          (!ambiente || item.ambiente === ambiente)
        )
      })
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  public pets: Pet[] = []

  async create(data: PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      nome: data.nome,
      idade: data.idade,
      tamanho: data.tamanho,
      nivel_energia: data.nivel_energia,
      independencia: data.independencia,
      ambiente: data.ambiente,
      cidade_org: data.cidade_org,
      estado_org: data.estado_org,
      orgs_id: data.orgs_id,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }
}
