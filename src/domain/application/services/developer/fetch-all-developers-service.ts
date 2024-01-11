import { Either, right } from '@/core/either'
import { Developer } from '@/domain/enterprise/entities/developer'

type FetchAllDevelopersServiceResponse = Either<null, Developer[]>

export class FetchAllDevelopersService {
  constructor(private readonly developerRepository) {}

  async execute(): Promise<FetchAllDevelopersServiceResponse> {
    const developers = await this.developerRepository.getAllDevelopers()
    return right(developers)
  }
}
