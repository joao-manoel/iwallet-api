import { Router } from 'express'
import { walletsRouter } from './financial/wallets.routes'
import { sessionsRouter } from './user/sessions.routes'
import { usersRouter } from './user/users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)

router.use('/financial', walletsRouter)


export { router }
