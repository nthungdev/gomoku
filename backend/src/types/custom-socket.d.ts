// custom-socket.d.ts
import { DB } from '@/db/types'
import { Socket } from 'socket.io'

declare module 'socket.io' {
  interface Socket {
    db: DB
  }
}
