import { makeDeveloper } from '@/../test/factories/developer-factory'
import { InMemoryDeveloperRepository } from '@/../test/repositories/InMemoryDeveloperRepository'
import { DeleteDeveloperService } from './delete-developer-service'

let deleteDeveloperService: DeleteDeveloperService
let inMemoryDeveloperRepository: InMemoryDeveloperRepository

describe('Delete a developer', () => {
  beforeEach(() => {
    inMemoryDeveloperRepository = new InMemoryDeveloperRepository()
    deleteDeveloperService = new DeleteDeveloperService(
      inMemoryDeveloperRepository,
    )
  })

  it('should update a developer', async () => {
    const developer = makeDeveloper({
      name: 'any_name',
    })

    inMemoryDeveloperRepository.createDeveloper(developer)

    const developerFound = await deleteDeveloperService.execute(
      developer.id.getValue(),
    )

    expect(developerFound.isRight()).toBeTruthy()
    expect(inMemoryDeveloperRepository.developers).toHaveLength(0)
  })
})
