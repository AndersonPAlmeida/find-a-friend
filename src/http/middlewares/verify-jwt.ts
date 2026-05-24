import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
