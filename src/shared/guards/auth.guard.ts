import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard extends JwtAuthGuard {}
