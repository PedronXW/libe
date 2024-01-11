import { app } from '@/app'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[UPDATE] /developers/:id', async () => {
    const response = await request(app).post('/developers').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })
    const { id } = response.body

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const responseUpdate = await await request(app)
      .put(`/developers`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)
      .send({
        name: 'John Doe2',
        email: 'arroze@johndoe.com',
      })

    expect(responseUpdate.status).toBe(204)
  })
})
