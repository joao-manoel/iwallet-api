import express from 'express'

import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/EnsureAuthenticateMiddleware';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { makeCreateWalletController } from '@infra/http/factories/controllers/wallet/CreateWalletControllerFactory';
import { makeDeleteWalletController } from '@infra/http/factories/controllers/wallet/DeleteWalletControllerFactory';
import { makeUpdateWalletController } from '@infra/http/factories/controllers/wallet/UpdateWalletControllerFactory';

const walletsRouter = express.Router()


walletsRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

walletsRouter.post('/', adaptRoute(makeCreateWalletController()))
walletsRouter.delete('/:id', adaptRoute(makeDeleteWalletController()))
walletsRouter.patch('/:id', adaptRoute(makeUpdateWalletController()))

export { walletsRouter }
