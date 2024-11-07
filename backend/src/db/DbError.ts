export enum DbErrorType {
  RoomNotFoundError = 'RoomNotFoundError',
  UserNotFoundError = 'UserNotFoundError',
}

export enum DbErrorMessage {
  RoomNotFoundError = 'Room not found.',
  UserNotFoundError = 'User not found.',
}

export default class DbError extends Error {
  name: string

  constructor(name: string, message: string, cause?: unknown) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}

export function createDbError(type: DbErrorType, cause?: unknown): DbError {
  const message = DbErrorMessage[type]
  return new DbError(type, message, cause)
}
