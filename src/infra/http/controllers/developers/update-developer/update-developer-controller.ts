import { UpdateDeveloperService } from '@/domain/application/services/developer/update-developer-service'
import { Response } from 'express'
import { z } from 'zod'

const updateDeveloperZodBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export type UpdateDeveloperBodySchema = z.infer<
  typeof updateDeveloperZodBodySchema
>

const updateDeveloperZodParamsSchema = z.object({
  id: z.string().uuid(),
})

export class UpdateDeveloperController {
  constructor(
    private readonly updateDeveloperService: UpdateDeveloperService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { id } = updateDeveloperZodParamsSchema.parse(req.user)

    const { name, email } = updateDeveloperZodBodySchema.parse(req.body)

    const updatedDeveloper = await this.updateDeveloperService.execute(id, {
      name,
      email,
    })

    if (updatedDeveloper.isLeft()) {
      return res.status(404).send({ error: updatedDeveloper.value.message })
    }

    return res.status(204).send({ developer: updatedDeveloper.value })
  }
}
