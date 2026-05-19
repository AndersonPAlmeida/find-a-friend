import fastify from 'fastify'
import { prisma } from './lib/prisma.js'

export const app = fastify()

app.post('/', async (request, reply) => {
  await prisma.orgs.create({
    data: {
      cep: '0000000',
      cidade: 'jequie',
      email: 'ander@gmail.com',
      nome: 'anderson',
      endereco_rua: 'adasdad',
      estado: 'ba',
      password_hash: '123456',
      whatsapp: '7399915',
    },
  })

  return reply.status(201).send()
})
