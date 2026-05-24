import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Authenticate (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel autenticar uma Org registrada.', async () => {
    await request(app.server).post('/orgs').send({
      cep: '45200-000',
      cidade: 'Jequié',
      email: 'contato@amigosdepatas.org',
      nome: 'ONG Amigos de Patas',
      enderecoRua: 'Rua das Flores, 245',
      estado: 'BA',
      password: '123456',
      whatsapp: '73999998888',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'contato@amigosdepatas.org',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
