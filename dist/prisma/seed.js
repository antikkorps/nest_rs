"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const dotenv = require("dotenv");
const argon2 = require("argon2");
const roleSeeder_1 = require("./seeds/roleSeeder");
const prisma = new client_1.PrismaClient();
const fakerSalon = () => ({
    name: faker_1.faker.company.name(),
    logo: faker_1.faker.image.imageUrl(),
    street: faker_1.faker.address.streetAddress(),
    zipcode: faker_1.faker.address.zipCode(),
    country: faker_1.faker.address.country(),
    userId: 1,
});
async function main() {
    const fakerRounds = 20;
    dotenv.config();
    console.log('Seeding...');
    for (const role of roleSeeder_1.roleSeeder) {
        await prisma.role.create({
            data: {
                name: role.name,
                slug: role.slug,
            },
        });
    }
    await prisma.user.create({
        data: {
            firstName: 'superadmin',
            lastName: 'superadmin',
            email: 'superadmin@admin.com',
            password: await argon2.hash(process.env.ADMIN_PASSWORD),
            roles: {
                create: [
                    {
                        assignedBy: 'Default',
                        roleSlug: "super_admin",
                    },
                    {
                        assignedBy: 'Default',
                        roleSlug: "admin",
                    },
                ]
            },
        },
    });
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.salon.create({ data: fakerSalon() });
    }
    console.log('Seeding done !');
}
main()
    .catch((error) => console.error(error))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map