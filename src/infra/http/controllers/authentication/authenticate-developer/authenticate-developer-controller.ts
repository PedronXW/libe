import { AuthenticateDeveloperService } from '@/domain/application/services/developer/authenticate-developer-service'
import { z } from 'zod'

const authenticateDeveloperZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export class AuthenticateDeveloperController {
  constructor(
    private authenticateDeveloperService: AuthenticateDeveloperService,
  ) {}

  async handle(req, res): Promise<any> {
    const { email, password } = authenticateDeveloperZodSchema.parse(req.body)

    const token = await this.authenticateDeveloperService.execute({
      email,
      password,
    })

    if (token.isLeft()) {
      return res.status(401).send({ error: token.value.message })
    }

    return res.status(200).send({ token: token.value.token })
  }
}
