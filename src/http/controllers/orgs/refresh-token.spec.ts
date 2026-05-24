import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Refresh Token (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel gerar um novo token de acesso.', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'contato@amigosdepatas.org',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
