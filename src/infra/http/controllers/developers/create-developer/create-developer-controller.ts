import { z } from 'zod'
import { CreateDeveloperService } from '../../../../../domain/application/services/developer/create-developer-service'

import { DeveloperPresenter } from '@/infra/http/presenters/presenter-developer'
import { Request, Response } from 'express'

const createDeveloperZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export class CreateDeveloperController {
  constructor(private createDeveloperService: CreateDeveloperService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = createDeveloperZodSchema.parse(req.body)

    const developer = await this.createDeveloperService.execute({
      name,
      email,
      password,
    })

    if (developer.isLeft()) {
      return res.status(401).json({ error: developer.value.message })
    }

    return res.status(201).json(DeveloperPresenter.toHTTP(developer.value))
  }
}
