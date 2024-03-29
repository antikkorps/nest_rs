import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as argon2 from 'argon2';
import { roleSeeder } from './roleSeeder';
import { fakerPost } from './postFaker';

// In order to create seeds, use "npm run seed"

const prisma = new PrismaClient();

// const fakerUser = (): any => ({
//   firstName: faker.person.firstName(),
//   lastName: faker.person.lastName(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
// });

// const fakerContact = (): any => ({
//   name: faker.person.fullName(),
//   email: faker.internet.email(),
//   phone: faker.phone.number(),
//   purpose: faker.lorem.sentence(),
//   message: faker.lorem.paragraphs({ min: 1, max: 3 }),
// });

const fakerSalon = (): any => ({
  name: faker.company.name(),
  logo: faker.image.urlLoremFlickr({ category: 'business' }),
  street: faker.location.streetAddress(),
  zipcode: faker.location.zipCode(),
  country: faker.location.country(),
  userId: 1, // Associé à l'id de l'utilisateur 1
});

async function main() {
  const fakerRounds = 20;
  const fakerPostRounds = 25;

  dotenv.config();
  console.log('Seeding...');
  // /// --------- Users && Annonces && Contacts --------------- ///

  // /// --------- ROLES --------------- ///
  for (const role of roleSeeder) {
    await prisma.role.create({
      data: {
        name: role.name,
        slug: role.slug,
      },
    });
  }
  /// --------- create one admin --------------- ///
  let superAdmin = await prisma.user.findUnique({
    where: {
      email: 'superadmin@admin.com',
    },
  });
  if (!superAdmin) {
    superAdmin = await prisma.user.create({
      data: {
        firstName: 'superadmin',
        lastName: 'superadmin',
        email: 'superadmin@admin.com',
        pseudo: 'super',
        password: await argon2.hash(process.env.ADMIN_PASSWORD),
        roles: {
          create: [
            {
              assignedBy: 'Default',
              roleSlug: 'super_admin', // roleId 1 === Super Admin
            },
            {
              assignedBy: 'Default',
              roleSlug: 'admin', // roleId 1 === Admin
            },
          ],
        },
      },
    });
  }

  let guestUser = await prisma.user.findUnique({
    where: {
      email: 'guest@admin.com',
    },
  });
  if (!guestUser) {
    guestUser = await prisma.user.create({
      data: {
        firstName: 'guest',
        lastName: 'guest',
        pseudo: faker.lorem.word(),
        email: 'guest@admin.com',
        password: await argon2.hash(process.env.ADMIN_PASSWORD),
        roles: {
          create: [
            {
              assignedBy: 'Default',
              roleSlug: 'guest', // roleId 1 === Super Admin
            },
          ],
        },
      },
    });
  }

  for (let i = 0; i < fakerRounds; i++) {
    // await prisma.user.create({ data: fakerUser() });
    // await prisma.contact.create({ data: fakerContact() });
    await prisma.salon.create({ data: fakerSalon() });
  }

  for (let i = 0; i < fakerPostRounds; i++) {
    await prisma.post.create({ data: fakerPost() });
  }

  console.log('Seeding done !');
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
