import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeCreateCreditCardController } from '@infra/http/factories/controllers/financial/creditCard/CreateCreditCardControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/EnsureAuthenticateMiddleware'
import express from 'express'

const creditCardRouter = express.Router()

creditCardRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))


creditCardRouter.post('/', adaptRoute(makeCreateCreditCardController()))

export { creditCardRouter }
