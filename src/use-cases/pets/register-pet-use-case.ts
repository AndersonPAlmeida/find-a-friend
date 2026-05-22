import type {
  Ambiente,
  Idade,
  Independencia,
  Nivel_Energia,
  Pet,
  Tamanho,
} from '@/lib/prisma/generated/prisma/client'
import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { PetsRepository } from '@/repositories/pets-repository'
import { OrgIdCadastratadoError } from '../errors/orgs/org-id-invalido-error'

interface RegisterPetUseCaseRequest {
  nome: string
  idade: Idade
  tamanho: Tamanho
  nivelEnergia: Nivel_Energia
  independencia: Independencia
  ambiente: Ambiente
  cidadeOrg: string
  estadoOrg: string
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    nome,
    idade,
    tamanho,
    nivelEnergia,
    independencia,
    ambiente,
    cidadeOrg,
    estadoOrg,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const verificarIdOrg = await this.orgsRepository.findById(orgId)

    if (!verificarIdOrg) {
      throw new OrgIdCadastratadoError()
    }

    const pet = await this.petsRepository.create({
      nome,
      idade,
      tamanho,
      nivel_energia: nivelEnergia,
      independencia,
      ambiente,
      cidade_org: cidadeOrg,
      estado_org: estadoOrg,
      orgs_id: orgId,
    })

    return { pet }
  }
}
