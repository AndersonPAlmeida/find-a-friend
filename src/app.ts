import fastify from 'fastify'
import { appRoutesOrgs } from './http/controllers/orgs/routesOrgs'

export const app = fastify()

app.register(appRoutesOrgs)
