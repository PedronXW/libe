import { Crypto } from '@/infra/cryptography/crypto'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { CreateDeveloperService } from '../../../../../domain/application/services/developer/create-developer-service'
import { CreateDeveloperController } from './create-developer-controller'

const mongoConnection = new MongoConnection()
const developerRepository = new MongoDeveloperRepository(mongoConnection)
const crypto = new Crypto()
const createDeveloperService = new CreateDeveloperService(
  developerRepository,
  crypto,
)
const createDeveloperController = new CreateDeveloperController(
  createDeveloperService,
)

export { createDeveloperController }
