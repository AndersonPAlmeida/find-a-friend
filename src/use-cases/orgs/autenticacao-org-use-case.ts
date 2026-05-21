import { compare } from 'bcryptjs'
import type { Orgs } from '@/lib/prisma/generated/prisma/client'
import type { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from '../errors/orgs/org-invalid-credentials-error'

interface AutenticacaoOrgUseCaseRequest {
  email: string
  password: string
}

interface AutenticacaoOrgUseCaseResponse {
  org: Orgs
}

export class AutenticacaoOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AutenticacaoOrgUseCaseRequest): Promise<AutenticacaoOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const senhaCorresponde = await compare(password, org?.password_hash)

    if (!senhaCorresponde) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
