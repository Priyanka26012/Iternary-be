// common/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('Full request object:', request); // This will log everything, including headers
    console.log('Request user:', request.user);
    return request.user;
  },
);