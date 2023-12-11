import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const VerifyRoles_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class VerifyRoles extends VerifyRoles_base implements CanActivate {
    private readonly targetRole;
    constructor(targetRole: string);
    canActivate(ctx: ExecutionContext): boolean;
}
export {};
