import { MongooseService } from '@/shared/services/mongoose.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConversationRepository {
  constructor(private readonly mongooseService: MongooseService) {}
}
