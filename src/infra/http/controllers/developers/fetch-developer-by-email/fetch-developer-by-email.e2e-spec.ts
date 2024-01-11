import { app } from '@/app'
import request from 'supertest'

describe('AppController (e2e)', () => {
  it('[GET] /developers/:id', async () => {
    const response = await request(app).post('/developers').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })
    const { email } = response.body

    const fetchResponse = await request(app).get(`/developers/profile/${email}`)

    expect(fetchResponse.status).toBe(200)
  })
})
