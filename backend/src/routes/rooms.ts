import { Router } from 'express'

const roomsRouter = Router()

roomsRouter.get('/', async (req, res, next) => {
  try {
    const rooms = await req.app.locals.db.getRooms()
    res.json({ ok: true, rooms })
    res.status(200)
  } catch (error: unknown) {
    next(error)
  }
})

export default roomsRouter
