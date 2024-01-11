import { makeDeveloper } from '@/../test/factories/developer-factory'
import { InMemoryDeveloperRepository } from '@/../test/repositories/InMemoryDeveloperRepository'
import { FetchDeveloperByIdService } from './fetch-developer-by-id-service'

let fetchDeveloperByIdService: FetchDeveloperByIdService
let inMemoryDeveloperRepository: InMemoryDeveloperRepository

describe('Fetch a developer by id', () => {
  beforeEach(() => {
    inMemoryDeveloperRepository = new InMemoryDeveloperRepository()
    fetchDeveloperByIdService = new FetchDeveloperByIdService(
      inMemoryDeveloperRepository,
    )
  })

  it('should update a developer', async () => {
    const developer = makeDeveloper({
      name: 'any_name',
    })

    inMemoryDeveloperRepository.createDeveloper(developer)

    const developerFound = await fetchDeveloperByIdService.execute(
      developer.id.getValue(),
    )

    expect(developerFound.isRight()).toBeTruthy()
    expect(inMemoryDeveloperRepository.developers).toHaveLength(1)
  })
})
