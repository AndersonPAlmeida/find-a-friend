import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createOnePet } from '@/utils/test/create-one-pet'

describe('Buscar Pet id (2e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel buscar um Pet pelo id.', async () => {
    const { pet } = await createOnePet(app)

    console.log(pet.id)

    const response = await request(app.server).get(`/pets/${pet.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        nome: 'Thor',
      })
    )
  })
})
