import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { OrgWhatsCadastratadoError } from '@/use-cases/errors/orgs/org-email-cadastratado-error'
import { OrgEmailCadastratadoError } from '@/use-cases/errors/orgs/org-whats-cadastratado-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/orgs/make-register-org-use-case'

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
    const registerOrgUseCase = makeRegisterOrgUseCase()

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
  } catch (error) {
    if (error instanceof OrgEmailCadastratadoError) {
      return reply.status(409).send({ message: error.message })
    } else if (error instanceof OrgWhatsCadastratadoError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
