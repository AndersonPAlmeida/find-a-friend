import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AutenticacaoOrgUseCase } from '@/use-cases/orgs/autenticacao-org-use-case'

export function makeAutenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const autenticacaoOrgUseCase = new AutenticacaoOrgUseCase(orgsRepository)

  return autenticacaoOrgUseCase
}
