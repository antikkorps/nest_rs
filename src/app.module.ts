import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { SalonModule } from './salon/salon.module';
// import { ImageController } from './image/image.controller';
// import { ImageService } from './image/image.service';
// import { ImageModule } from './image/image.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ContactsModule,
    SalonModule,
    // ImageModule,
    RoleModule,
  ],
  controllers: [
    AppController,
    // ImageController
  ],
  providers: [
    AppService,
    // ImageService
  ],
})
export class AppModule {}
