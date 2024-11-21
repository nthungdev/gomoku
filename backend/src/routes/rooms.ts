import { Router } from 'express'

const roomsRouter = Router()

roomsRouter.get('/', async (req, res, next) => {
  try {
    const rooms = await req.app.locals.db.getRooms()
    res.status(200)
    res.json({ ok: true, data: rooms })
  } catch (error: unknown) {
    next(error)
  }
})

roomsRouter.get('/:roomId', async (req, res, next) => {
  const { roomId } = req.params
  if (!roomId) {
    res.status(400)
    res.json({ ok: false, error: 'Invalid room ID' })
    return
  }

  try {
    const room = await req.app.locals.db.getRoomById(roomId)

    if (!room) {
      res.status(404)
      res.json({ ok: false, error: 'Room not found' })
      return
    }

    res.status(200)
    res.json({ ok: true, data: room })
  } catch (error: unknown) {
    next(error)
  }
})

export default roomsRouter
