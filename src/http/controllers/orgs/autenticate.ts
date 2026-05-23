import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/orgs/org-invalid-credentials-error'
import { makeAutenticateOrgUseCase } from '@/use-cases/factories/orgs/make-autenticate-org-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAutenticateOrgUseCase()

    const { org } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
