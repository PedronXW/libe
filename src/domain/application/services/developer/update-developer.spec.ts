import { makeDeveloper } from '@/../test/factories/developer-factory'
import { InMemoryDeveloperRepository } from '@/../test/repositories/InMemoryDeveloperRepository'
import { UpdateDeveloperService } from './update-developer-service'

let updateDeveloperService: UpdateDeveloperService
let inMemoryDeveloperRepository: InMemoryDeveloperRepository

describe('Update a Developer', () => {
  beforeEach(() => {
    inMemoryDeveloperRepository = new InMemoryDeveloperRepository()
    updateDeveloperService = new UpdateDeveloperService(
      inMemoryDeveloperRepository,
    )
  })

  it('should update a developer', async () => {
    const developer = makeDeveloper({
      name: 'any_name',
    })

    inMemoryDeveloperRepository.createDeveloper(developer)

    developer.name = 'any_other_name'

    const updatedDeveloper = await updateDeveloperService.execute(
      developer.id.getValue(),
      {
        name: developer.name,
        email: developer.email,
      },
    )

    expect(updatedDeveloper.isRight()).toBeTruthy()
    expect(inMemoryDeveloperRepository.developers[0].name).toEqual(
      'any_other_name',
    )
  })
})
