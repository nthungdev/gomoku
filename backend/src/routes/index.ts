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

export default indexRouter
