import fastify from 'fastify'
import z, { ZodError } from 'zod'
import { env } from './env'
import { appRoutesOrgs } from './http/controllers/orgs/routesOrgs'

export const app = fastify()

app.register(appRoutesOrgs)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro de Validação.', issues: z.treeifyError(error) })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we should to an external too like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})
