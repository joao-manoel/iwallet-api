import { Router } from 'express'
import { financialRouter } from './financial'
import { sessionsRouter } from './user/sessions.routes'
import { usersRouter } from './user/users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)

router.use('/financial', financialRouter)


export { router }
