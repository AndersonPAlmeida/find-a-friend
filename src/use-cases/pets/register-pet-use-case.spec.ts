import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrgIdCadastratadoError } from '../errors/orgs/org-id-invalido-error'
import { RegisterPetUseCase } from './register-pet-use-case'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Registro de Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(orgsRepository, petsRepository)
  })

  it('Deve ser capaz de registrar um Pet', async () => {
    const org = await orgsRepository.create({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password_hash: await hash('123', 3),
      whatsapp: '73999998888',
      cep: '45200-000',
      endereco_rua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    const { pet } = await sut.execute({
      nome: 'Thor',
      idade: 'ADULTO',
      tamanho: 'MEDIO',
      nivelEnergia: 'ALTO',
      independencia: 'MEDIO',
      ambiente: 'AMBOS',
      cidadeOrg: org.cidade,
      estadoOrg: org.estado,
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Não deve ser capaz de registrar um Pet', async () => {
    await expect(
      sut.execute({
        nome: 'Thor',
        idade: 'ADULTO',
        tamanho: 'MEDIO',
        nivelEnergia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',
        cidadeOrg: 'Jequie',
        estadoOrg: 'BA',
        orgId: randomUUID(),
      })
    ).rejects.instanceOf(OrgIdCadastratadoError)
  })
})
