import { makeDeveloper } from '@/../test/factories/developer-factory'
import { InMemoryDeveloperRepository } from '@/../test/repositories/InMemoryDeveloperRepository'
import { FetchAllDevelopersService } from './fetch-all-developers-service'

let fetchAllDevelopersService: FetchAllDevelopersService
let inMemoryDeveloperRepository: InMemoryDeveloperRepository

describe('Fetch all Developers', () => {
  beforeEach(() => {
    inMemoryDeveloperRepository = new InMemoryDeveloperRepository()
    fetchAllDevelopersService = new FetchAllDevelopersService(
      inMemoryDeveloperRepository,
    )
  })

  it('should update a developer', async () => {
    const developer = makeDeveloper({
      name: 'any_name',
    })

    inMemoryDeveloperRepository.createDeveloper(developer)

    const developerFound = await fetchAllDevelopersService.execute()

    expect(developerFound.isRight()).toBeTrue()
    expect(inMemoryDeveloperRepository.developers).toHaveLength(1)
  })
})
