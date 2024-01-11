import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { DeleteDeveloperService } from '../../../../../domain/application/services/developer/delete-developer-service'
import { DeleteDeveloperController } from './delete-developer-controller'

const mongoConnection = new MongoConnection()
const developerRepository = new MongoDeveloperRepository(mongoConnection)
const deleteDeveloperService = new DeleteDeveloperService(developerRepository)
const deleteDeveloperController = new DeleteDeveloperController(
  deleteDeveloperService,
)

export { deleteDeveloperController }
