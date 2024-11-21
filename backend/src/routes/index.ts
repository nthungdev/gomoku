import { Router } from 'express'

const indexRouter = Router()

indexRouter.post('/1', async (_, res, next) => {
  try {
    res.json({ ok: true })
    res.status(200)
  } catch (error: unknown) {
    next(error)
  }
})

indexRouter.get('/', (_, res) => {
  res.send('Gomoku Server!')
})

export default indexRouter
