import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { FetchDeveloperByIdService } from '../../../../../domain/application/services/developer/fetch-developer-by-id-service'
import { FetchDeveloperByIdController } from './fetch-developer-by-id-controller'

const mongoConnection = new MongoConnection()
const developerRepository = new MongoDeveloperRepository(mongoConnection)
const fetchDeveloperByIdService = new FetchDeveloperByIdService(
  developerRepository,
)
const fetchDeveloperByIdController = new FetchDeveloperByIdController(
  fetchDeveloperByIdService,
)

export { fetchDeveloperByIdController }
