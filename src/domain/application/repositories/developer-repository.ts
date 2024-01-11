import { Developer } from '@/domain/library/enterprise/entities/developer'
import { UpdateDeveloperBodySchema } from '@/infra/http/controllers/developers/update-developer/update-developer-controller'

export abstract class DeveloperRepository {
  abstract createDeveloper(developer: Developer): Promise<Developer>
  abstract updateDeveloper(
    id: string,
    { name, email }: UpdateDeveloperBodySchema,
  ): Promise<Developer>

  abstract deleteDeveloper(id: string): Promise<boolean>
  abstract getAllDevelopers(): Promise<Developer[]>
  abstract getDeveloperById(id: string): Promise<Developer | null>
  abstract getDeveloperByEmail(email: string): Promise<Developer | null>
}
