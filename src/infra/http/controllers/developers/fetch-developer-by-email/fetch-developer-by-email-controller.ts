import { FetchDeveloperByEmailService } from '@/domain/application/services/developer/fetch-developer-by-email-service'
import { DeveloperPresenter } from '@/infra/http/presenters/presenter-developer'
import { Response } from 'express'
import { z } from 'zod'

const fetchDeveloperByEmailZodSchema = z.object({
  email: z.string().email(),
})

export class FetchDeveloperByEmailController {
  constructor(
    private readonly fetchDeveloperByEmailService: FetchDeveloperByEmailService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { email } = fetchDeveloperByEmailZodSchema.parse(req.params)

    const developer = await this.fetchDeveloperByEmailService.execute(email)

    if (developer.isLeft()) {
      return res.status(404).send({ error: developer.value.message })
    }

    return res
      .status(200)
      .send({ developer: DeveloperPresenter.toHTTP(developer.value) })
  }
}
