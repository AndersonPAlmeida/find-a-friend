import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '@/use-cases/orgs/register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    cep: z.string().min(9).nonempty('CEP é obrigatório.'),
    cidade: z.string().nonempty('Cidade é obrigatória.'),
    email: z.email().nonempty('E-mail é obrigatório.'),
    nome: z.string().nonempty('Nome é obrigatório.'),
    enderecoRua: z.string().nonempty('Endereço é obrigatório.'),
    estado: z.string().nonempty('Estado é obrigatório.'),
    password: z.string().nonempty('Senha é obrigatória.'),
    whatsapp: z.string().nonempty('WhatsApp é obrigatório.'),
  })

  const { cep, cidade, email, enderecoRua, estado, nome, password, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    await registerOrgUseCase.execute({
      cep,
      cidade,
      email,
      enderecoRua,
      estado,
      nome,
      password,
      whatsapp,
    })
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
