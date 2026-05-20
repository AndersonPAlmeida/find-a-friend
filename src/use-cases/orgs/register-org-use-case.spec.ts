import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgCampoObrigatorioError } from '../errors/orgs/org-campo-obrigatorio-error'
import { OrgEmailCadastratadoError } from '../errors/orgs/org-email-cadastratado-error'
import { OrgWhatsCadastratadoError } from '../errors/orgs/org-whats-cadastratado-error'
import { RegisterOrgUseCase } from './register-org-use-case'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Registro de Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('Deve ser capaz de registrar uma Org', async () => {
    const { org } = await sut.execute({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password: '123',
      whatsapp: '73999998888',
      cep: '45200-000',
      enderecoRua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Deve criptografar a senha da org ao se registrar e identifica-la', async () => {
    const { org } = await sut.execute({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password: '123',
      whatsapp: '73999998888',
      cep: '45200-000',
      enderecoRua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    const isPasswordCorrectlyHashed = await compare('123', org.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Não deve ser possivel cadastrar duas orgs com o mesmo e-mail', async () => {
    const email = 'contato@amigosdepatas.org'

    await sut.execute({
      nome: 'ONG Amigos de Patas',
      email,
      password: '123',
      whatsapp: '73999998880',
      cep: '45200-000',
      enderecoRua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    await expect(
      sut.execute({
        nome: 'ONG Amigos de Patas2',
        email,
        password: '123',
        whatsapp: '73999998881',
        cep: '45200-000',
        enderecoRua: 'Rua das Flores, 245',
        cidade: 'Jequié',
        estado: 'BA',
      })
    ).rejects.toBeInstanceOf(OrgEmailCadastratadoError)
  })

  it('Não deve ser possivel cadastrar duas orgs com o mesmo whatsApp', async () => {
    const whatsapp = '73999998880'

    await sut.execute({
      nome: 'ONG Amigos de Patas',
      email: 'contato@amigosdepatas.org',
      password: '123',
      whatsapp,
      cep: '45200-000',
      enderecoRua: 'Rua das Flores, 245',
      cidade: 'Jequié',
      estado: 'BA',
    })

    await expect(
      sut.execute({
        nome: 'ONG Amigos de Patas2',
        email: 'contato@amigosdepatas2.org',
        password: '123',
        whatsapp,
        cep: '45200-000',
        enderecoRua: 'Rua das Flores, 245',
        cidade: 'Jequié',
        estado: 'BA',
      })
    ).rejects.toBeInstanceOf(OrgWhatsCadastratadoError)
  })

  it('O endereço não pode esta em branco', async () => {
    await expect(
      sut.execute({
        nome: 'ONG Amigos de Patas',
        email: 'contato@amigosdepatas.org',
        password: '123',
        whatsapp: '73999998880',
        cep: '45200-000',
        enderecoRua: '',
        cidade: 'Jequié',
        estado: 'BA',
      })
    ).rejects.toBeInstanceOf(OrgCampoObrigatorioError)
  })

  it('O whatsApp não pode esta em branco', async () => {
    await expect(
      sut.execute({
        nome: 'ONG Amigos de Patas',
        email: 'contato@amigosdepatas.org',
        password: '123',
        whatsapp: '',
        cep: '45200-000',
        enderecoRua: 'Rua das Flores, 245',
        cidade: 'Jequié',
        estado: 'BA',
      })
    ).rejects.toBeInstanceOf(OrgCampoObrigatorioError)
  })

  it('A cidade não pode esta em branco', async () => {
    await expect(
      sut.execute({
        nome: 'ONG Amigos de Patas',
        email: 'contato@amigosdepatas.org',
        password: '123',
        whatsapp: '73999998880',
        cep: '45200-000',
        enderecoRua: 'Rua das Flores, 245',
        cidade: '',
        estado: 'BA',
      })
    ).rejects.toBeInstanceOf(OrgCampoObrigatorioError)
  })
})
