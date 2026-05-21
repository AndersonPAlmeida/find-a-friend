import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InvalidCredentialsError } from '../errors/orgs/org-invalid-credentials-error'
import { AutenticacaoOrgUseCase } from './autenticacao-org-use-case'

let orgsRepository: InMemoryOrgsRepository
let sut: AutenticacaoOrgUseCase

describe('Autenticação de Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AutenticacaoOrgUseCase(orgsRepository)
  })

  it('Deve ser capaz de autenticar uma Org', async () => {
    await orgsRepository.create({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password_hash: await hash('123456', 3),
      whatsapp: '73999998888',
      cep: '45200-000',
      endereco_rua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    const { org } = await sut.execute({
      email: 'contato@amigosdepatas.org',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Não deve ser capaz de autenticar uma Org pelo e-mail', async () => {
    await orgsRepository.create({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password_hash: await hash('123456', 3),
      whatsapp: '73999998888',
      cep: '45200-000',
      endereco_rua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    await expect(
      sut.execute({
        email: 'contact@amigosdepatas.org',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Não deve ser capaz de autenticar uma Org pela senha', async () => {
    await orgsRepository.create({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password_hash: await hash('123456', 3),
      whatsapp: '73999998888',
      cep: '45200-000',
      endereco_rua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    await expect(
      sut.execute({
        email: 'contato@amigosdepatas.org',
        password: '123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
