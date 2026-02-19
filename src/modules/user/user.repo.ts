import { UserType } from '@/modules/user/user.model'
import { MongooseService } from '@/shared/services/mongoose.service'
import { Injectable } from '@nestjs/common'

export type WhereUniqueUserType = { _id: string } | { username: string }

@Injectable()
export class UserRepository {
  constructor(private readonly mongooseService: MongooseService) {}

  findUnique(where: WhereUniqueUserType): Promise<Omit<UserType, 'password'> | null> {
    return this.mongooseService.user.findOne(where)
  }

  async create(data: Partial<UserType>): Promise<Omit<UserType, 'password'>> {
    const createdUser = await this.mongooseService.user.create(data)
    const { password, __v, ...safeUser } = createdUser.toObject()
    return safeUser as unknown as Omit<UserType, 'password'>
  }

  update(where: WhereUniqueUserType, data: Partial<UserType>): Promise<UserType | null> {
    return this.mongooseService.user.findOneAndUpdate(where, data, { new: true }).lean<UserType>()
  }
}
