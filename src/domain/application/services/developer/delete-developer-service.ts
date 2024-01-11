import { Either, left, right } from '@/core/either'
import { DeveloperRepository } from '../../repositories/developer-repository'
import { DeveloperNonExistsError } from '../errors/DeveloperNonExists'

type DeleteDeveloperServiceResponse = Either<DeveloperNonExistsError, boolean>

export class DeleteDeveloperService {
  constructor(private developerRepository: DeveloperRepository) {}

  async execute(id: string): Promise<DeleteDeveloperServiceResponse> {
    const developer = await this.developerRepository.getDeveloperById(id)

    if (!developer) {
      return left(new DeveloperNonExistsError())
    }

    const developerHasBeenRemoved =
      await this.developerRepository.deleteDeveloper(id)

    return right(developerHasBeenRemoved)
  }
}
