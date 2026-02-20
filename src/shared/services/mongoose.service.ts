import { Session } from '@/schemas/session.schema'
import { User } from '@/schemas/user.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
@Injectable()
export class MongooseService {
  constructor(
    @InjectModel(User.name) readonly user: Model<User>,
    @InjectModel(Session.name) readonly session: Model<Session>,
  ) {}
}
