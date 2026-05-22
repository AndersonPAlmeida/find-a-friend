import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Orgs } from '@/lib/prisma/generated/prisma/client'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchManyPetUseCase } from './search-many-pet-use-case'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchManyPetUseCase

let org: Orgs
let org2: Orgs

describe('Busca de Pet através de filtros', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchManyPetUseCase(petsRepository)

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

    const { pets } = await sut.execute({ cidadePet: 'Jequié', page: 1 })
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
      page: 1,
      idade: 'ADULTO',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ idade: 'ADULTO' })])
  })

  it('Deve ser capaz de buscar uma lista de 20 pets por página.', async () => {
    for (let i = 0; i < 22; i++) {
      await petsRepository.create({
        nome: `Thor ${i}`,

        idade: 'ADULTO',
        tamanho: 'MEDIO',
        nivel_energia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',

        cidade_org: org.cidade,
        estado_org: org.estado,
        orgs_id: org.id,
      })
    }

    const { pets } = await sut.execute({
      cidadePet: 'Jequié',
      page: 1,
    })

    expect(pets).toHaveLength(20)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nome: 'Thor 18' }),
        expect.objectContaining({ nome: 'Thor 19' }),
      ])
    )
  })

  it('Deve ser capaz de realizar paginação para mais de 20 pets cadastrados na mesma cidade.', async () => {
    for (let i = 0; i < 22; i++) {
      await petsRepository.create({
        nome: `Thor ${i}`,

        idade: 'ADULTO',
        tamanho: 'MEDIO',
        nivel_energia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',

        cidade_org: org.cidade,
        estado_org: org.estado,
        orgs_id: org.id,
      })
    }

    const { pets } = await sut.execute({
      cidadePet: 'Jequié',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nome: 'Thor 20' }),
        expect.objectContaining({ nome: 'Thor 21' }),
      ])
    )
  })
})
