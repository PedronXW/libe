import { Either, left, right } from '@/core/either'
import { Developer } from '@/domain/enterprise/entities/developer'
import { DeveloperMapper } from '@/infra/database/mappers/developer-mapper'
import { DeveloperRepository } from '../../repositories/developer-repository'
import { DeveloperNonExistsError } from '../errors/DeveloperNonExists'

type UpdateDeveloperServiceRequest = Either<DeveloperNonExistsError, Developer>

export class UpdateDeveloperService {
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async execute(id, { name, email }): Promise<UpdateDeveloperServiceRequest> {
    const developerExists = await this.developerRepository.getDeveloperById(id)

    if (!developerExists) {
      return left(new DeveloperNonExistsError())
    }

    const developer = await this.developerRepository.updateDeveloper(id, {
      name,
      email,
    })

    return right(DeveloperMapper.toDomain(developer))
  }
}
