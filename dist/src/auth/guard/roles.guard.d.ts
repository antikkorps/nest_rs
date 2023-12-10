import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class VerifyRoles implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
