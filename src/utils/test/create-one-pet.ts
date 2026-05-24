import type { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from './create-validate-org'

export async function createOnePet(app: FastifyInstance) {
  const { org } = await createAndAuthenticateOrg(app)

  const pet = await prisma.pet.create({
    data: {
      nome: 'Thor',
      idade: 'ADULTO',
      tamanho: 'MEDIO',
      nivel_energia: 'ALTO',
      independencia: 'MEDIO',
      ambiente: 'AMBOS',
      cidade_org: org.cidade,
      estado_org: org.estado,
      orgs_id: org.id,
    },
  })

  return {
    pet,
  }
}
