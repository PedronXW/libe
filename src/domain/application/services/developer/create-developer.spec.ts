import { InMemoryDeveloperRepository } from '@/../test/repositories/InMemoryDeveloperRepository'
import { Developer } from '@/domain/enterprise/entities/developer'
import { Crypto } from '@/infra/cryptography/crypto'
import { DeveloperPresenter } from '@/infra/http/presenters/presenter-developer'
import { CreateDeveloperService } from './create-developer-service'

let createDeveloperService: CreateDeveloperService
let inMemoryDeveloperRepository: InMemoryDeveloperRepository
let crypto: Crypto

describe('Create a Developer', () => {
  beforeEach(() => {
    inMemoryDeveloperRepository = new InMemoryDeveloperRepository()
    crypto = new Crypto()
    createDeveloperService = new CreateDeveloperService(
      inMemoryDeveloperRepository,
      crypto,
    )
  })

  it('should authenticate a developer', async () => {
    const result = await createDeveloperService.execute({
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@gmail.com',
    })

    const treatedResult = DeveloperPresenter.toHTTP(result.value as Developer)

    expect(result.isRight()).toBeTruthy()
    expect(treatedResult).toEqual({
      id: treatedResult.id,
      name: 'any_name',
      email: 'any_email@gmail.com',
      createdAt: treatedResult.createdAt,
      updatedAt: treatedResult.updatedAt,
    })
  })
})
