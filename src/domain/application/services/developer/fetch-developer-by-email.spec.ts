import { makeDeveloper } from '@/../test/factories/developer-factory'
import { InMemoryDeveloperRepository } from '@/../test/repositories/InMemoryDeveloperRepository'
import { FetchDeveloperByEmailService } from './fetch-developer-by-email-service'

let fetchDeveloperByEmailService: FetchDeveloperByEmailService
let inMemoryDeveloperRepository: InMemoryDeveloperRepository

describe('Fetch a developer by email', () => {
  beforeEach(() => {
    inMemoryDeveloperRepository = new InMemoryDeveloperRepository()
    fetchDeveloperByEmailService = new FetchDeveloperByEmailService(
      inMemoryDeveloperRepository,
    )
  })

  it('should update a developer', async () => {
    const developer = makeDeveloper({
      name: 'any_name',
    })

    inMemoryDeveloperRepository.createDeveloper(developer)

    const developerFound = await fetchDeveloperByEmailService.execute(
      developer.email,
    )

    expect(developerFound.isRight()).toBeTruthy()
    expect(inMemoryDeveloperRepository.developers).toHaveLength(1)
  })
})
