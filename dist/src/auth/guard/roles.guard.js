"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyRoles = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
let VerifyRoles = class VerifyRoles extends (0, passport_1.AuthGuard)('jwt') {
    constructor(targetRole) {
        super();
        this.targetRole = targetRole;
    }
    canActivate(ctx) {
        const request = ctx.switchToHttp().getRequest();
        if (request?.user) {
            const user = request.user;
            console.log(user);
            const hasRole = user.roles.some((role) => role.roleSlug === this.targetRole);
            if (!hasRole) {
                console.log(`User does not have the required role: ${this.targetRole}`);
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    }
};
exports.VerifyRoles = VerifyRoles;
exports.VerifyRoles = VerifyRoles = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], VerifyRoles);
//# sourceMappingURL=roles.guard.js.map