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
import { TagModule } from './tag/tag.module';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { IsUniqueConstraint } from 'custom_validator/isUnique/is-unique-constraint';
import { LikeController } from './like/like.controller';
import { LikeService } from './like/like.service';
import { LikeModule } from './like/like.module';
import { MailService } from './mail/mail.service';

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
    TagModule,
    PostModule,
    LikeModule,
  ],
  controllers: [
    AppController,
    PostController,
    LikeController,
    // ImageController
  ],
  providers: [
    AppService,
    PostService,
    IsUniqueConstraint,
    LikeService,
    MailService,
    // ImageService
  ],
})
export class AppModule {}
