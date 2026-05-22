import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Orgs } from '@/lib/prisma/generated/prisma/client'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetIdCadastratadoError } from '../errors/pets/org-id-invalido-error'
import { SearchPetIdUseCase } from './search-pet-id-use-case'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetIdUseCase

let org: Orgs

describe('Busca de Pet através do ID', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetIdUseCase(petsRepository)

    org = await orgsRepository.create({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password_hash: await hash('123', 3),
      whatsapp: '73999998888',
      cep: '45200-000',
      endereco_rua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })
  })

  it('Deve ser capaz de buscar um Pet pelo Id.', async () => {
    const pet = await petsRepository.create({
      nome: 'Thor',
      idade: 'ADULTO',
      tamanho: 'MEDIO',
      nivel_energia: 'ALTO',
      independencia: 'MEDIO',
      ambiente: 'AMBOS',
      cidade_org: org.cidade,
      estado_org: org.estado,
      orgs_id: org.id,
    })

    const searchPet = await sut.execute({ idPet: pet.id })

    expect(searchPet.pet.id).toEqual(expect.any(String))
    expect(searchPet.pet).toEqual(
      expect.objectContaining({
        id: searchPet.pet.id,
        nome: 'Thor',
        idade: 'ADULTO',
        tamanho: 'MEDIO',
        nivel_energia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',
      })
    )
  })

  it('Não deve ser capaz de buscar um Pet pelo Id.', async () => {
    await expect(sut.execute({ idPet: randomUUID() })).rejects.instanceOf(
      PetIdCadastratadoError
    )
  })
})
