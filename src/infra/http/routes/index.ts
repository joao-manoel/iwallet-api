import { Router } from 'express'

import { sessionsRouter } from './session.routes'
import { usersRouter } from './users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)


export { router }
