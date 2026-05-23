import type { FastifyInstance } from 'fastify'
import { authenticate } from './autenticate'
import { register } from './register-org.controller'

export async function appRoutesOrgs(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
