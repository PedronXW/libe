import { DeveloperRepository } from '@/domain/application/repositories/developer-repository'
import { Developer } from '@/domain/enterprise/entities/developer'
import { env } from '@/infra/env'
import { UpdateDeveloperBodySchema } from '@/infra/http/controllers/developers/update-developer/update-developer-controller'
import { DeveloperMapper } from '../mappers/developer-mapper'
import { MongoConnection } from '../mongo-connection'

export class MongoDeveloperRepository implements DeveloperRepository {
  constructor(private mongoConnection: MongoConnection) {}

  async createDeveloper(developer: Developer): Promise<Developer> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'developers',
    )

    await collection.insertOne(DeveloperMapper.toPersistence(developer))

    return developer
  }

  async updateDeveloper(
    id: string,
    { name, email }: UpdateDeveloperBodySchema,
  ): Promise<Developer> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'developers',
    )

    const developer = collection.updateOne(
      { id },
      {
        $set: {
          name,
          email,
        },
      },
    )

    return DeveloperMapper.toDomain(developer)
  }

  async deleteDeveloper(id: string): Promise<boolean> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'developers',
    )

    const deleteResult = await collection.deleteOne({ id })
    return deleteResult.deletedCount === 1
  }

  async getAllDevelopers(): Promise<Developer[]> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'developers',
    )

    return (await collection.find().toArray()).map(DeveloperMapper.toDomain)
  }

  async getDeveloperById(id: string): Promise<Developer | null> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'developers',
    )

    const developer = await collection.findOne({ id })

    if (!developer) {
      return null
    }

    return DeveloperMapper.toDomain(developer)
  }

  async getDeveloperByEmail(email: string): Promise<Developer | null> {
    const collection = this.mongoConnection.getCollection(
      'teste',
      env.NODE_ENV === 'test'
        ? 'teste_' + process.env.COLLECTION_ID
        : 'developers',
    )

    const developer = await collection.findOne({ email })

    if (!developer) {
      return null
    }

    return DeveloperMapper.toDomain(developer)
  }
}
