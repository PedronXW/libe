import { EntityId } from '@/core/entities/entity-id'
import { DeveloperRepository } from '@/domain/application/repositories/developer-repository'
import { Developer } from '@/domain/enterprise/entities/developer'
import { DeveloperMapper } from '@/infra/database/mappers/developer-mapper'
import { UpdateDeveloperBodySchema } from '@/infra/http/controllers/developers/update-developer/update-developer-controller'

type DeveloperPersistenceType = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date | null | undefined
  updatedAt: Date | null | undefined
}

export class InMemoryDeveloperRepository implements DeveloperRepository {
  developers: DeveloperPersistenceType[] = []

  async createDeveloper(developer: Developer): Promise<Developer> {
    this.developers.push(DeveloperMapper.toPersistence(developer))

    return developer
  }

  async updateDeveloper(
    id: string,
    { name, email }: UpdateDeveloperBodySchema,
  ): Promise<Developer> {
    const developerIndex = this.developers.findIndex((d) => d.id === id)

    const newDeveloper = Developer.create(
      {
        name,
        email,
        password: this.developers[developerIndex].password,
        createdAt: this.developers[developerIndex].createdAt,
        updatedAt: new Date(),
      },
      new EntityId(this.developers[developerIndex].id),
    )

    this.developers[developerIndex] =
      DeveloperMapper.toPersistence(newDeveloper)

    return newDeveloper
  }

  async deleteDeveloper(id: string): Promise<boolean> {
    const developerIndex = this.developers.findIndex((d) => d.id === id)

    this.developers.splice(developerIndex, 1)

    return true
  }

  async getAllDevelopers(): Promise<Developer[]> {
    return this.developers.map((d) => DeveloperMapper.toDomain(d))
  }

  async getDeveloperById(id: string): Promise<Developer | null> {
    const developer = this.developers.find((d) => d.id === id)

    if (!developer) {
      return null
    }

    return DeveloperMapper.toDomain(developer)
  }

  async getDeveloperByEmail(email: string): Promise<Developer | null> {
    const developer = this.developers.find((d) => d.email === email)

    if (!developer) {
      return null
    }

    return DeveloperMapper.toDomain(developer)
  }
}
