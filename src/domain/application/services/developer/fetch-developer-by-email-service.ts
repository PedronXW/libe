import { Either, left, right } from '@/core/either'
import { Developer } from '@/domain/enterprise/entities/developer'
import { DeveloperRepository } from '../../repositories/developer-repository'
import { DeveloperNonExistsError } from '../errors/DeveloperNonExists'

type FetchDeveloperByEmailServiceResponse = Either<
  DeveloperNonExistsError,
  Developer
>

export class FetchDeveloperByEmailService {
  constructor(private developerRepository: DeveloperRepository) {}

  async execute(email: string): Promise<FetchDeveloperByEmailServiceResponse> {
    const developers = await this.developerRepository.getDeveloperByEmail(email)

    if (developers.length === 0) {
      return left(new DeveloperNonExistsError())
    }

    return right(developers)
  }
}
