import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgIdCadastratadoError } from '@/use-cases/errors/orgs/org-id-invalido-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/pets/make-register-pet-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
    idade: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
    tamanho: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
    nivelEnergia: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
    independencia: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
    ambiente: z.enum(['INTERIOR', 'EXTERIOR', 'AMBOS']),
  })

  const { ambiente, idade, independencia, nivelEnergia, nome, tamanho } =
    registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    const prismaOrg = new PrismaOrgsRepository()
    const org = await prismaOrg.findById(request.user.sub)

    if (!org) {
      throw new OrgIdCadastratadoError()
    }

    await registerPetUseCase.execute({
      ambiente,
      cidadeOrg: org.cidade,
      estadoOrg: org.estado,
      idade,
      independencia,
      nivelEnergia,
      nome,
      orgId: org.id,
      tamanho,
    })
  } catch (error) {
    if (error instanceof OrgIdCadastratadoError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
