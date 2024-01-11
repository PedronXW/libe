import { Either, left, right } from '@/core/either'
import { Developer } from '@/domain/enterprise/entities/developer'
import { HashGenerator } from '../../cryptography/hash-generator'
import { DeveloperRepository } from '../../repositories/developer-repository'
import { DeveloperAlreadyExistsError } from '../errors/DeveloperAlreadyExistsError'

interface CreateDeveloperServiceDTO {
  name: string
  email: string
  password: string
}

type CreateDeveloperServiceResponse = Either<
  DeveloperAlreadyExistsError,
  Developer
>

export class CreateDeveloperService {
  constructor(
    private developerRepository: DeveloperRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(
    data: CreateDeveloperServiceDTO,
  ): Promise<CreateDeveloperServiceResponse> {
    const developerAlreadyExists =
      await this.developerRepository.getDeveloperByEmail(data.email)

    if (developerAlreadyExists) {
      return left(new DeveloperAlreadyExistsError())
    }

    const newDeveloper = Developer.create({
      name: data.name,
      email: data.email,
      password: await this.hashGenerator.hash(data.password),
    })

    const developer =
      await this.developerRepository.createDeveloper(newDeveloper)

    return right(developer)
  }
}
