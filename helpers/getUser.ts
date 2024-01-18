import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();

      const { id, roles} = request.user;

      return {id, roles};
    },
  );