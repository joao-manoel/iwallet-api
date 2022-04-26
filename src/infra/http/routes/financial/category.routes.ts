import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeCreateCategoryController } from '@infra/http/factories/controllers/financial/Category/CreateCategoryControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/EnsureAuthenticateMiddleware'
import express from 'express'

const categoryRouter = express.Router()

categoryRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

categoryRouter.post('/', adaptRoute(makeCreateCategoryController()))

export {categoryRouter}
