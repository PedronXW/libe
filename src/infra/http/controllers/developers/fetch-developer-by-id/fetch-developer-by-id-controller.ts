import { FetchDeveloperByIdService } from '@/domain/application/services/developer/fetch-developer-by-id-service'
import { DeveloperPresenter } from '@/infra/http/presenters/presenter-developer'
import { Response } from 'express'
import { z } from 'zod'

const fetchDeveloperByIdZodSchema = z.object({
  id: z.string().uuid(),
})

export class FetchDeveloperByIdController {
  constructor(
    private readonly fetchDeveloperByIdService: FetchDeveloperByIdService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { id } = fetchDeveloperByIdZodSchema.parse(req.params)

    const developer = await this.fetchDeveloperByIdService.execute(id)

    if (developer.isLeft()) {
      return res.status(404).send({ error: developer.value.message })
    }

    return res
      .status(200)
      .send({ developer: DeveloperPresenter.toHTTP(developer.value) })
  }
}
