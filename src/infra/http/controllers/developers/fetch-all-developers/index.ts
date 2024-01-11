import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { FetchAllDevelopersService } from '../../../../../domain/application/services/developer/fetch-all-developers-service'
import { FetchAllDevelopersController } from './fetch-all-developer-controller'

const mongoConnection = new MongoConnection()
const developerRepository = new MongoDeveloperRepository(mongoConnection)
const fetchAllDevelopersService = new FetchAllDevelopersService(
  developerRepository,
)
const fetchAllDevelopersController = new FetchAllDevelopersController(
  fetchAllDevelopersService,
)

export { fetchAllDevelopersController }
