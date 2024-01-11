import { Router } from 'express'
import { authenticateDeveloperController } from '../controllers/authentication/authenticate-developer'

const authenticationRoutes = Router()

authenticationRoutes.post('/', (req, res) => {
  return authenticateDeveloperController.handle(req, res)
})

export { authenticationRoutes }
