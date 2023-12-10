// import { AuthGuard } from '@nestjs/passport';

// export class rolesGuard extends AuthGuard('jwt') {
//   constructor() {
//     super();
//   }
// }

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { GetUser } from "../decorator";

@Injectable()
export class VerifyRoles implements CanActivate {
  
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Here i need to get the auth user email or id, anyway. To check his roles.
    const user = GetUser('email');


    console.log(user);

    return true;
  }
}