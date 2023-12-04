import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@test.com',
      password: 'password',
    };
    describe('Signup', () => {
      it('should throw an errror if email is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw an errror if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw an errror if email && password are empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody('')
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw an errror if email is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw an errror if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw an errror if email && password are empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody('')
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get current user', () => {
      it('should get the current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200);
      });
    });
    describe('Update current user', () => {
      it('should edit the current user', () => {
        const dto: EditUserDto = {
          firstName: 'Franck',
          email: 'test@test.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
    describe('Delete current user', () => {});
    describe('Get all users', () => {});
  });

  describe('Create Contact', () => {
    it('should create a contact', () => {
      return pactum.spec().post('/contacts/new').withBody({
        name: 'Test Contact',
        phone: '123456789',
        email: 'test@example.com',
        message: 'Test message',
      });
    });
  });
  describe('Get all contacts', () => {
    it('should get all contacts', () => {
      return pactum
        .spec()
        .get('/contacts/all')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectStatus(200);
    });
  });
  describe('Get contact by ID', () => {
    it('should return a contact by its id', () => {
      return pactum
        .spec()
        .get('/contacts/2')
        .withHeaders({
          Authorization: 'Bearer $S{userAccessToken}',
        })
        .expectStatus(200);
    });
  });
  describe('Delete contact', () => {});
});
