import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException('No auth tokeen provided. Please login')
      );
    }
    return user;
  }
}
