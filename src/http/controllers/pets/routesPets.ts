import type { FastifyInstance } from 'fastify'
import { register } from './register-pet'
import { searchMany } from './search-many-pets'

export async function appRoutesPets(app: FastifyInstance) {
  app.post('/pets', register)
  app.get('/pets/search-many', searchMany)
}
