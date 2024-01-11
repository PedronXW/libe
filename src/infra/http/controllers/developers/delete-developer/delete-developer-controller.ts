import { DeleteDeveloperService } from '@/domain/application/services/developer/delete-developer-service'
import { Response } from 'express'
import { z } from 'zod'

const deleteDeveloperZodSchema = z.object({
  id: z.string().uuid(),
})

export class DeleteDeveloperController {
  constructor(
    private readonly deleteDeveloperService: DeleteDeveloperService,
  ) {}

  async handle(req, res): Promise<Response> {
    const { id } = deleteDeveloperZodSchema.parse(req.user)

    await this.deleteDeveloperService.execute(id)

    return res.status(204).send()
  }
}
