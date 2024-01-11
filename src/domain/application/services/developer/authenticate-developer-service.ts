import { Either, left, right } from '@/core/either'
import { Encrypter } from '../../cryptography/encrypter'
import { HashComparer } from '../../cryptography/hash-comparer'
import { DeveloperRepository } from '../../repositories/developer-repository'
import { WrongCredentialError } from '../errors/WrongCredentialsError'

interface AuthenticateDeveloperServiceDTO {
  email: string
  password: string
}

type AuthenticateDeveloperServiceResponse = Either<
  WrongCredentialError,
  { token: string }
>

export class AuthenticateDeveloperService {
  constructor(
    private developerRepository: DeveloperRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute(
    data: AuthenticateDeveloperServiceDTO,
  ): Promise<AuthenticateDeveloperServiceResponse> {
    const developer = await this.developerRepository.getDeveloperByEmail(
      data.email,
    )

    if (!developer) {
      return left(new WrongCredentialError())
    }

    const passwordMatch = await this.hashComparer.compare(
      data.password,
      developer.password,
    )

    if (!passwordMatch) {
      return left(new WrongCredentialError())
    }

    const token = await this.encrypter.encrypt({ id: developer.id.getValue() })

    return right({ token })
  }
}
