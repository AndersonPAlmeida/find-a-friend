import type { FastifyInstance } from 'fastify'
import { register } from './register.route'

export async function appRoutesOrgs(app: FastifyInstance) {
  app.post('/orgs', register)
}
