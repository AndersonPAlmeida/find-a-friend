import type { FastifyInstance } from 'fastify'
import { register } from './register-pet'

export async function appRoutesPets(app: FastifyInstance) {
  app.post('/pets', register)
}
