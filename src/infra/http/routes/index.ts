import { Router } from 'express'
import { authenticationRoutes } from './authentication'
import { developerRoutes } from './developer'

const router = Router()

router.use('/sessions', authenticationRoutes)

router.use('/developers', developerRoutes)

export { router }
