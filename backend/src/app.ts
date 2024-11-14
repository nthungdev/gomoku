import express from 'express'
import path from 'path'
import cors from 'cors'
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
import indexRouter from './routes/index'
import { DB } from '@/db/types'
import MemoryDB from '@/db/MemoryDB'

const app = express()

// app.use(logger('dev'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// Extend Express app.locals to include a `db` property
declare module 'express-serve-static-core' {
  interface Locals {
    db: DB
  }
}

app.locals.db = new MemoryDB()

app.use('/', indexRouter)

export default app
