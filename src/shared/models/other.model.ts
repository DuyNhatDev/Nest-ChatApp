import { z } from 'zod'
import { isValidObjectId } from 'mongoose'

export const ObjectIdSchema = z.string().refine(isValidObjectId, {
  message: 'Invalid ObjectId',
})
