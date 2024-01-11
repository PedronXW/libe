import { app } from '@/app'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[POST] /developers', async () => {
    const response = await request(app).post('/developers').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      createdAt: expect.any(String),
    })
  })
})
