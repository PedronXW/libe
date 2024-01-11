import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { FetchDeveloperByEmailService } from '../../../../../domain/application/services/developer/fetch-developer-by-email-service'
import { FetchDeveloperByEmailController } from './fetch-developer-by-email-controller'

const mongoConnection = new MongoConnection()
const developerRepository = new MongoDeveloperRepository(mongoConnection)
const fetchDeveloperByEmailService = new FetchDeveloperByEmailService(
  developerRepository,
)
const fetchDeveloperByEmailController = new FetchDeveloperByEmailController(
  fetchDeveloperByEmailService,
)

export { fetchDeveloperByEmailController }
