import { Router } from 'express'
import { createDeveloperController } from '../controllers/developers/create-developer'
import { deleteDeveloperController } from '../controllers/developers/delete-developer'
import { fetchAllDevelopersController } from '../controllers/developers/fetch-all-developers'
import { fetchDeveloperByEmailController } from '../controllers/developers/fetch-developer-by-email'
import { fetchDeveloperByIdController } from '../controllers/developers/fetch-developer-by-id'
import { updateDeveloperController } from '../controllers/developers/update-developer'
import { verifyAuthentication } from '../middlewares/verifyAuthentication'

const developerRoutes = Router()

developerRoutes.post('/', (req, res) => {
  return createDeveloperController.handle(req, res)
})

developerRoutes.delete('/', verifyAuthentication, (req, res) => {
  return deleteDeveloperController.handle(req, res)
})

developerRoutes.get('/:id', (req, res) => {
  return fetchDeveloperByIdController.handle(req, res)
})

developerRoutes.get('/profile/:email', (req, res) => {
  return fetchDeveloperByEmailController.handle(req, res)
})

developerRoutes.get('/', (req, res) => {
  return fetchAllDevelopersController.handle(req, res)
})

developerRoutes.put('/', verifyAuthentication, (req, res) => {
  return updateDeveloperController.handle(req, res)
})

export { developerRoutes }
