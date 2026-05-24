import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.orgs.create({
    data: {
      cep: '45200-000',
      cidade: 'Jequié',
      email: 'contato@amigosdepatas.org',
      nome: 'ONG Amigos de Patas',
      endereco_rua: 'Rua das Flores, 245',
      estado: 'BA',
      password_hash: await hash('123456', 6),
      whatsapp: '73999998888',
    },
  })

  const authReponse = await request(app.server).post('/sessions').send({
    email: 'contato@amigosdepatas.org',
    password: '123456',
  })

  const { token } = authReponse.body

  return {
    org,
    token,
  }
}
