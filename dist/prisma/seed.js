"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const dotenv = require("dotenv");
const argon2 = require("argon2");
const prisma = new client_1.PrismaClient();
const fakerUser = () => ({
    firstName: faker_1.faker.person.firstName(),
    lastName: faker_1.faker.person.lastName(),
    email: faker_1.faker.internet.email(),
    password: faker_1.faker.internet.password(),
});
const fakerContact = () => ({
    name: faker_1.faker.person.fullName(),
    email: faker_1.faker.internet.email(),
    phone: faker_1.faker.phone.number(),
    purpose: faker_1.faker.lorem.sentence(),
    message: faker_1.faker.lorem.paragraphs({ min: 1, max: 3 }),
});
async function main() {
    const fakerRounds = 20;
    dotenv.config();
    console.log('Seeding...');
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.user.create({ data: fakerUser() });
        await prisma.contact.create({ data: fakerContact() });
    }
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
//# sourceMappingURL=seed.js.map