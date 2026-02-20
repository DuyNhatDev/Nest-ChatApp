import { RefreshTokenType } from '@/modules/auth/auth.model'
import { UserType } from '@/modules/user/user.model'
import { WhereUniqueUserType } from '@/modules/user/user.repo'
import { MongooseService } from '@/shared/services/mongoose.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthRepository {
  constructor(private readonly mongooseService: MongooseService) {}

  findUniqueUser(where: WhereUniqueUserType): Promise<UserType | null> {
    return this.mongooseService.user.findOne(where).select('+password').lean<UserType>()
  }

  createRefreshToken(data: { userId: string; refreshToken: string; expiresAt: Date }) {
    return this.mongooseService.session.create(data)
  }

  deleteRefreshToken(refreshToken: { refreshToken: string }) {
    return this.mongooseService.session.deleteOne(refreshToken)
  }
}
