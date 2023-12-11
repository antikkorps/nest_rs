// import { AuthGuard } from '@nestjs/passport';

// export class rolesGuard extends AuthGuard('jwt') {
//   constructor() {
//     super();
//   }
// }

// import { AuthGuard } from '@nestjs/passport';

// export class rolesGuard extends AuthGuard('jwt') {
//   constructor() {
//     super();
//   }
// }

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"


@Injectable()
export class VerifyRoles implements CanActivate {
  
  canActivate(ctx: ExecutionContext) {

    const request = ctx.switchToHttp().getRequest()
    
    if (request?.user) {
      const { id } = request.user;
      console.log(id);
    }
    const { user } = ctx.switchToHttp().getRequest();
    // const user = request.user;
    console.log({request})
    return true;
  }
}