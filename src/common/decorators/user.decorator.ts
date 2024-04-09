import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { TokenData } from '../../auth/types';

interface IRequest extends Request {
  user: TokenData;
}

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<IRequest>();
    return req.user;
  },
);
