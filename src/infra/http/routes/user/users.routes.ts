
import express from 'express'

import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory'

const usersRouter = express.Router()

//usersRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

usersRouter.post('/', adaptRoute(makeRegisterUserController()))

export { usersRouter }
