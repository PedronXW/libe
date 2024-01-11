import { app } from '@/app'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[DELETE] /developers/:id', async () => {
    await request(app).post('/developers').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const authentication = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const responseDelete = await request(app)
      .delete(`/developers`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authentication.body.token}`)

    expect(responseDelete.status).toBe(204)
  })
})
