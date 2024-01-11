import { verify } from 'jsonwebtoken'

import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { env } from '@/infra/env'
import { AppError } from '../errors/AppError'

interface IPayload {
  sub: string
}

export async function verifyAuthentication(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: id } = verify(token, env.JWT_SECRET) as IPayload
    const mongoConnection = new MongoConnection()
    const developersRepository = new MongoDeveloperRepository(mongoConnection)
    const user = developersRepository.getDeveloperById(id)

    if (!user) {
      throw new AppError('User does not exists', 401)
    }

    request.user = {
      id,
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}
