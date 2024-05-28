import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const { authorization } = req.headers;

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException();
    }

    const token = authorization.split(' ')[1];

    // token decode한 값.
    req['user'] = await this.authService.verifyAccessToken(token);
    return true;
  }
}
