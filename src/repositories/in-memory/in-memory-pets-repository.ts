import { randomUUID } from 'node:crypto'
import type { Pet } from '@/lib/prisma/generated/prisma/client'
import type { PetUncheckedCreateInput } from '@/lib/prisma/generated/prisma/models'
import type { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async findByCity(cityOrg: string) {
    const pet = this.pets.find((item) => item.cidade_org === cityOrg)

    if (!pet) {
      return null
    }

    return pet
  }

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
