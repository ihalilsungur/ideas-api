import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User1 = createParamDecorator((data, req) => {
  console.log("Gelen data : ",data);
  console.log("Gelen User :",req.user[data]);
  return data ? req.user[data] : req.user;
});

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ?  user &&user[data] : user;
  },
);