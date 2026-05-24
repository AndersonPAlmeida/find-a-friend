import type { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from './create-validate-org'

export async function createManyPets(app: FastifyInstance) {
  const { org } = await createAndAuthenticateOrg(app)

  const pets = await Promise.all([
    prisma.pet.create({
      data: {
        nome: 'Thor',
        idade: 'FILHOTE',
        tamanho: 'MEDIO',
        nivel_energia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',
        cidade_org: org.cidade,
        estado_org: org.estado,
        orgs_id: org.id,
      },
    }),

    prisma.pet.create({
      data: {
        nome: 'Rex',
        idade: 'FILHOTE',
        tamanho: 'PEQUENO',
        nivel_energia: 'MEDIO',
        independencia: 'BAIXO',
        ambiente: 'INTERIOR',
        cidade_org: org.cidade,
        estado_org: org.estado,
        orgs_id: org.id,
      },
    }),

    prisma.pet.create({
      data: {
        nome: 'Mel',
        idade: 'IDOSO',
        tamanho: 'GRANDE',
        nivel_energia: 'BAIXO',
        independencia: 'ALTO',
        ambiente: 'EXTERIOR',
        cidade_org: org.cidade,
        estado_org: org.estado,
        orgs_id: org.id,
      },
    }),
  ])

  return {
    pets,
  }
}
