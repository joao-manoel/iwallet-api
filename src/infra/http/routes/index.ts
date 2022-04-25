import { Router } from 'express'
import { creditCardRouter } from './financial/creditCard.routes'
import { walletsRouter } from './financial/wallets.routes'
import { sessionsRouter } from './user/sessions.routes'
import { usersRouter } from './user/users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)

router.use('/wallets', walletsRouter)
router.use('/creditcard', creditCardRouter)


export { router }
