import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createManyPets } from '@/utils/test/create-many-pets'

describe('Buscar um ou mais Pets pela cidade e atributos (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel buscar um Pet pela cidade cadastratada e por um ou mais atributos.', async () => {
    const { pets } = await createManyPets(app)

    const response = await request(app.server).get('/pets/search-many').query({
      cidadePet: pets[0].cidade_org,
    })

    expect(response.statusCode).toEqual(200)

    const responseTwo = await request(app.server)
      .get('/pets/search-many')
      .query({
        cidadePet: pets[0].cidade_org,
        idade: pets[0].idade,
      })

    expect(responseTwo.statusCode).toEqual(200)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nome: 'Rex',
        }),
      ])
    )
  })
})
