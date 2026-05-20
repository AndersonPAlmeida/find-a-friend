import { hash } from 'bcryptjs'
import type { Orgs } from '@/lib/prisma/generated/prisma/client'
import type { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgCampoObrigatorioError } from '../errors/orgs/org-campo-obrigatorio-error'
import { OrgEmailCadastratadoError } from '../errors/orgs/org-email-cadastratado-error'
import { OrgWhatsCadastratadoError } from '../errors/orgs/org-whats-cadastratado-error'

interface RegisterOrgUseCaseRequest {
  cep: string
  cidade: string
  email: string
  nome: string
  enderecoRua: string
  estado: string
  password: string
  whatsapp: string
}

interface RegisterOrgUseCaseResponse {
  org: Orgs
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    cep,
    cidade,
    email,
    enderecoRua,
    estado,
    nome,
    password,
    whatsapp,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 3)

    const verificarEmailUnico = await this.orgsRepository.findByEmail(email)

    const verificarWhatsUnico = await this.orgsRepository.findByWhats(whatsapp)

    if (verificarEmailUnico) {
      throw new OrgEmailCadastratadoError()
    }

    if (verificarWhatsUnico) {
      throw new OrgWhatsCadastratadoError()
    }

    if (enderecoRua === '' || whatsapp === '' || cidade === '') {
      throw new OrgCampoObrigatorioError()
    }
    const org = await this.orgsRepository.create({
      cep,
      cidade,
      email,
      nome,
      endereco_rua: enderecoRua,
      estado,
      password_hash,
      whatsapp,
    })

    return { org }
  }
}
