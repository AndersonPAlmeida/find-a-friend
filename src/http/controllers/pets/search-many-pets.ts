import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeSearchManyPetUseCase } from '@/use-cases/factories/pets/make-many-search-pet-use-case'

export async function searchMany(request: FastifyRequest, reply: FastifyReply) {
  const seachBodySchema = z.object({
    cidadePet: z.string().nonempty('Cidade é obrigatória.'),
    idade: z.enum(['FILHOTE', 'ADULTO', 'GRANDE']).nullable().optional(),
    tamanho: z.enum(['PEQUENO', 'MEDIO', 'IDOSO']).nullable().optional(),
    nivelEnergia: z.enum(['BAIXO', 'MEDIO', 'ALTO']).nullable().optional(),
    independencia: z.enum(['BAIXO', 'MEDIO', 'ALTO']).nullable().optional(),
    ambiente: z.enum(['INTERIOR', 'EXTERIOR', 'AMBOS']).nullable().optional(),
  })

  const { ambiente, cidadePet, idade, independencia, nivelEnergia, tamanho } =
    seachBodySchema.parse(request.query)

  const searchMany = makeSearchManyPetUseCase()

  const { pets } = await searchMany.execute({
    cidadePet,
    page: 1,

    ...(ambiente && { ambiente }),
    ...(idade && { idade }),
    ...(independencia && { independencia }),
    ...(nivelEnergia && { nivelEnergia }),
    ...(tamanho && { tamanho }),
  })

  if (pets.length === 0) {
    return reply.status(400).send({
      message: 'Pets não encontrados com os filtros informados.',
    })
  }

  return reply.status(200).send({
    pets,
  })
}
