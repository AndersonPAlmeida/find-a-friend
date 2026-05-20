import { randomUUID } from 'node:crypto'
import type { Orgs } from '@/lib/prisma/generated/prisma/client'
import type { OrgsCreateInput } from '@/lib/prisma/generated/prisma/models'
import type { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Orgs[] = []

  async findByEmail(email: string): Promise<Orgs | null> {
    const org = this.orgs.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findByWhats(whatsapp: string): Promise<Orgs | null> {
    const org = this.orgs.find((item) => item.whatsapp === whatsapp)

    if (!org) {
      return null
    }

    return org
  }
  async create(data: OrgsCreateInput): Promise<Orgs> {
    const org = {
      id: randomUUID(),
      nome: data.nome,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      cep: data.cep,
      endereco_rua: data.endereco_rua,
      cidade: data.cidade,
      estado: data.estado,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }
}
