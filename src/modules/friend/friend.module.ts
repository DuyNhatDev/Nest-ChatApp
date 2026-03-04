import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { FriendRepository } from '@/modules/friend/friend.repository';

@Module({
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
})
export class FriendModule {}
