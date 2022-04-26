import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeCreateCategoryController } from '@infra/http/factories/controllers/financial/Category/CreateCategoryControllerFactory'
import { makeDeleteCategoryController } from '@infra/http/factories/controllers/financial/Category/DeleteCategoryControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/EnsureAuthenticateMiddleware'
import express from 'express'

const categoryRouter = express.Router()

categoryRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

categoryRouter.post('/', adaptRoute(makeCreateCategoryController()))
categoryRouter.delete('/', adaptRoute(makeDeleteCategoryController()))

export {categoryRouter}
