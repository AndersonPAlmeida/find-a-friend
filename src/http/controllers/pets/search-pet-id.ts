import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PetIdCadastratadoError } from '@/use-cases/errors/pets/org-id-invalido-error'
import { makeSearchPetIdUseCase } from '@/use-cases/factories/pets/make-search-pet-id-use-case'

export async function searchPetId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const seachBodySchema = z.object({
    idPet: z.uuid(),
  })

  const { idPet } = seachBodySchema.parse(request.params)

  try {
    const searchId = makeSearchPetIdUseCase()

    const { pet } = await searchId.execute({
      idPet,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof PetIdCadastratadoError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
