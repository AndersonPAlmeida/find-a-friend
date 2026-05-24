import type { FastifyInstance } from 'fastify'
import { authenticate } from './autenticate'
import { refreshToken } from './refresh-token'
import { register } from './register-org'

export async function appRoutesOrgs(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refreshToken)
}
