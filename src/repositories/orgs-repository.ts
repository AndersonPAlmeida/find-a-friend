import type { Orgs, Prisma } from '@/lib/prisma/generated/prisma/client'

export interface OrgsRepository {
  findByEmail(email: string): Promise<Orgs | null>
  findByWhats(whatsapp: string): Promise<Orgs | null>
  create(data: Prisma.OrgsCreateInput): Promise<Orgs>
}
