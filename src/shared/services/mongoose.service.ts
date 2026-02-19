import { User } from '@/schemas/user.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
@Injectable()
export class MongooseService {
  constructor(@InjectModel(User.name) readonly user: Model<User>) {}
}
