import {
  Injectable,
  // ExecutionContext,
  // HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = User>(
    err: string,
    user: TUser,
    info: { message?: string },
  ): TUser {
    if (err || !user) {
      throw new UnauthorizedException(info?.message || 'Unauthorized');
    }
    return user;
  }
}
