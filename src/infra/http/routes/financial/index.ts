import express from 'express'
import { categoryRouter } from './category.routes'
import { creditCardRouter } from './creditCard.routes'
import { walletsRouter } from './wallets.routes'

const financialRouter = express.Router()

financialRouter.use('/wallets', walletsRouter)
financialRouter.use('/creditcards', creditCardRouter)
financialRouter.use('/categorys', categoryRouter)

export { financialRouter }
