import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Orgs } from '@/lib/prisma/generated/prisma/client'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetUseCase } from './search-pet-use-case'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetUseCase

let org: Orgs
let org2: Orgs

describe('Busca de Pet através de filtros', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchPetUseCase(petsRepository)

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

    org2 = await orgsRepository.create({
      nome: 'ONG Amigos de Patas2',
      email: 'contato@amigosdepatas.org',
      password_hash: await hash('123', 3),
      whatsapp: '73999998888',
      cep: '45200-000',
      endereco_rua: 'Rua das Flores, 245',
      cidade: 'Amargosa',
      estado: 'BA',
    })
  })

  it('Deve ser capaz de buscar um Pet pela cidade.', async () => {
    for (let i = 1; i <= 10; i++) {
      const isOrg1 = i % 2 === 0

      await petsRepository.create({
        nome: `Thor ${i}`,
        idade: 'ADULTO',
        tamanho: 'MEDIO',
        nivel_energia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',

        cidade_org: isOrg1 ? org.cidade : org2.cidade,
        estado_org: isOrg1 ? org.estado : org2.estado,
        orgs_id: isOrg1 ? org.id : org2.id,
      })
    }

    const { pets } = await sut.execute({ cidadePet: 'Jequié' })
    expect(pets).toHaveLength(5)
  })

  it('Deve ser capaz de buscar um Pet pela cidade e por alguma características.', async () => {
    for (let i = 1; i <= 10; i++) {
      const isOrg1 = i % 2 === 0

      await petsRepository.create({
        nome: `Thor ${i}`,

        idade: i === 2 ? 'ADULTO' : 'FILHOTE',

        tamanho: 'MEDIO',
        nivel_energia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',

        cidade_org: isOrg1 ? org.cidade : org2.cidade,
        estado_org: isOrg1 ? org.estado : org2.estado,
        orgs_id: isOrg1 ? org.id : org2.id,
      })
    }

    const { pets } = await sut.execute({
      cidadePet: 'Jequié',
      idade: 'ADULTO',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ idade: 'ADULTO' })])
  })
})
