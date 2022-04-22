import { adaptMiddleware } from './../../../../core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import express from 'express'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/EnsureAuthenticateMiddleware';
import { makeCreateWalletController } from '@infra/http/factories/controllers/CreateWalletControllerFactory';

const walletsRouter = express.Router()


walletsRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

walletsRouter.post('/wallets', adaptRoute(makeCreateWalletController()))

export { walletsRouter }
