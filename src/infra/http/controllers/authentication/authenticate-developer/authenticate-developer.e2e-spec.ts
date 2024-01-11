import { app } from '@/app'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[POST] /sessions', async () => {
    await request(app).post('/developers').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const response = await request(app).post('/sessions').send({
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
