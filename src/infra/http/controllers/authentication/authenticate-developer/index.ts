import { AuthenticateDeveloperService } from '@/domain/application/services/developer/authenticate-developer-service'
import { Crypto } from '@/infra/cryptography/crypto'
import { JwtEncrypter } from '@/infra/cryptography/encrypter'
import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { AuthenticateDeveloperController } from './authenticate-developer-controller'

const mongoConnection = new MongoConnection()
const developerRepository = new MongoDeveloperRepository(mongoConnection)
const jwtEncrypter = new JwtEncrypter()
const hashComparer = new Crypto()

const authenticateDeveloperService = new AuthenticateDeveloperService(
  developerRepository,
  hashComparer,
  jwtEncrypter,
)
const authenticateDeveloperController = new AuthenticateDeveloperController(
  authenticateDeveloperService,
)

export { authenticateDeveloperController }
