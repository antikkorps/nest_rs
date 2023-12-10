"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const contacts_module_1 = require("./contacts/contacts.module");
const salon_module_1 = require("./salon/salon.module");
const image_controller_1 = require("./image/image.controller");
const image_service_1 = require("./image/image.service");
const image_module_1 = require("./image/image.module");
const role_module_1 = require("./role/role.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            contacts_module_1.ContactsModule,
            salon_module_1.SalonModule,
            image_module_1.ImageModule,
            role_module_1.RoleModule,
        ],
        controllers: [app_controller_1.AppController, image_controller_1.ImageController],
        providers: [app_service_1.AppService, image_service_1.ImageService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map