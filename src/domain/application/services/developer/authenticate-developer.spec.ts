import { makeDeveloper } from '@/../test/factories/developer-factory'
import { InMemoryDeveloperRepository } from '@/../test/repositories/InMemoryDeveloperRepository'
import { Crypto } from '@/infra/cryptography/crypto'
import { JwtEncrypter } from '@/infra/cryptography/encrypter'
import { hash } from 'bcrypt'
import { AuthenticateDeveloperService } from './authenticate-developer-service'

let authenticateDeveloperService: AuthenticateDeveloperService
let inMemoryDeveloperRepository: InMemoryDeveloperRepository
let crypto: Crypto
let jwtEncrypter: JwtEncrypter

describe('Authenticate Developer', () => {
  beforeEach(() => {
    inMemoryDeveloperRepository = new InMemoryDeveloperRepository()
    crypto = new Crypto()
    jwtEncrypter = new JwtEncrypter()
    authenticateDeveloperService = new AuthenticateDeveloperService(
      inMemoryDeveloperRepository,
      crypto,
      jwtEncrypter,
    )
  })

  it('should authenticate a developer', async () => {
    const developer = makeDeveloper({
      password: await hash('any_password', 8),
      email: 'any_email@gmail.com',
    })

    await inMemoryDeveloperRepository.createDeveloper(developer)

    const result = await authenticateDeveloperService.execute({
      email: developer.email,
      password: 'any_password',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      token: expect.any(String),
    })
  })
})
