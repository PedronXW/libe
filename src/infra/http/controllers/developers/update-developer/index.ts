import { MongoConnection } from '@/infra/database/mongo-connection'
import { MongoDeveloperRepository } from '@/infra/database/repositories/MongoDeveloperRepository'
import { UpdateDeveloperService } from '../../../../../domain/application/services/developer/update-developer-service'
import { UpdateDeveloperController } from './update-developer-controller'

const mongoConnection = new MongoConnection()
const developersRepository = new MongoDeveloperRepository(mongoConnection)
const updateDeveloperService = new UpdateDeveloperService(developersRepository)
const updateDeveloperController = new UpdateDeveloperController(
  updateDeveloperService,
)

export { updateDeveloperController }
