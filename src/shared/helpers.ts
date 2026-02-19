import crypto from 'crypto'
import { MongoServerError } from 'mongodb'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

export function isUniqueConstraintMongoError(error: any): error is MongoServerError {
  return error instanceof MongoServerError && error.code === 11000
}

export function isNotFoundMongooseError(error: any): boolean {
  return error instanceof mongoose.Error.DocumentNotFoundError
}

export const generateOTP = () => {
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0')
}

export const generateUuid = () => {
  return uuidv4()
}
export const generateCrypto = () => {
  return crypto.randomBytes(32).toString('hex')
}

export const generateRandomFilename = (filename: string) => {
  const ext = path.extname(filename)
  return `${uuidv4()}${ext}`
}