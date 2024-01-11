import { FetchAllDevelopersService } from '@/domain/application/services/developer/fetch-all-developers-service'
import { Response } from 'express'

export class FetchAllDevelopersController {
  constructor(
    private readonly fetchAllDevelopersService: FetchAllDevelopersService,
  ) {}

  async handle(req, res): Promise<Response> {
    const developers = await this.fetchAllDevelopersService.execute()

    return res.status(200).send({ developers })
  }
}
