import { prisma } from '@/lib/prisma'
import type { Prisma } from '@/lib/prisma/generated/prisma/client'
import type { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const user = await prisma.orgs.findUnique({
      where: {
        email,
      },
    })

    return user
  }
  async findByWhats(whatsapp: string) {
    const user = await prisma.orgs.findUnique({
      where: {
        whatsapp,
      },
    })

    return user
  }
  async create(data: Prisma.OrgsCreateInput) {
    const user = await prisma.orgs.create({
      data,
    })

    return user
  }
}
