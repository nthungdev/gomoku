import session from 'express-session'
import SQLiteStore from 'connect-sqlite3'

declare module 'express-session' {
  interface SessionData {
    // Add properties to the session data
  }
}

const SQLiteStoreInstance = SQLiteStore(session)

export const sessionMiddleware = session({
  store: new SQLiteStoreInstance({
    db: 'sessions.sqlite',
    dir: './data',
  }) as session.Store,
  secret: 'your_secret_key', // TODO replace with a secure key in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
})
