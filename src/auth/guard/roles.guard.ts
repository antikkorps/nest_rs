import { AuthGuard } from '@nestjs/passport';

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

// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"


// @Injectable()
// export class VerifyRoles extends AuthGuard('jwt') implements CanActivate {
  
//   canActivate(ctx: ExecutionContext) {

//     const request= ctx.switchToHttp().getRequest();
    
//     if (request?.user) {
//       const user = request.user;
//       // console.log({user})

//       console.log(user)
//       // const user = await this.prisma.user.findUnique({ where: { id: userId } });
      
//     }

   
//     return true;
//   }
// }

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class VerifyRoles extends AuthGuard('jwt') implements CanActivate {
  private readonly targetRole: string;

  constructor(targetRole: string) {
    super();
    this.targetRole = targetRole;
  }

  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    
    if (request?.user) {
      const user = request.user;
      console.log(user)
      const hasRole = user.roles.some((role: UserRoleProps) => role.roleSlug === this.targetRole);
      
      if (!hasRole) {
        console.log(`User does not have the required role: ${this.targetRole}`);
        return false;
      } else {
        return true;
      }
    }

    return false;
  }
}

interface UserRoleProps {
  userId: 3;
  roleSlug: string;
  assignedAt: Date;
  assignedBy: string;
}