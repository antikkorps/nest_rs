import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as argon2 from 'argon2';

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

async function main() {
  const fakerRounds = 20;
  dotenv.config();
  console.log('Seeding...');
  // /// --------- Users && Annonces && Contacts --------------- ///
  // for (let i = 0; i < fakerRounds; i++) {
  //   await prisma.user.create({ data: fakerUser() });
  //   await prisma.contact.create({ data: fakerContact() });
  // }
  /// --------- create one admin --------------- ///
  await prisma.user.create({
    data: {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      password: await argon2.hash(process.env.ADMIN_PASSWORD),
      role: 'ADMIN',
    },
  });
  console.log('Seeding done !');
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
