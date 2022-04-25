import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeCreateCreditCardController } from '@infra/http/factories/controllers/financial/creditCard/CreateCreditCardControllerFactory'
import { makeDeleteCreditCardController } from '@infra/http/factories/controllers/financial/creditCard/DeleteCreditCardControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/EnsureAuthenticateMiddleware'
import express from 'express'

const creditCardRouter = express.Router()

creditCardRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))


creditCardRouter.post('/', adaptRoute(makeCreateCreditCardController()))
creditCardRouter.delete('/:id', adaptRoute(makeDeleteCreditCardController()))

export { creditCardRouter }
