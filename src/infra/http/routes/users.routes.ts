import { adaptRoute } from './../../../core/infra/adapters/ExpressRouteAdapter';
import express from 'express'

import { makeRegisterUserController } from '../factories/controllers/RegisterUserControllerFactory'

const usersRouter = express.Router()

usersRouter.post('/', adaptRoute(makeRegisterUserController()))

export { usersRouter }
