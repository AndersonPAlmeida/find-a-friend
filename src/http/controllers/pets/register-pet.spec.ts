import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-validate-org'

describe('Register Pet (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel registrar um Pet.', async () => {
    const { org, token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Thor',
        idade: 'ADULTO',
        tamanho: 'MEDIO',
        nivelEnergia: 'ALTO',
        independencia: 'MEDIO',
        ambiente: 'AMBOS',
        cidadeOrg: org.cidade,
        estadoOrg: org.estado,
        orgId: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
