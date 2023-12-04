"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv = require("dotenv");
const argon2 = require("argon2");
const prisma = new client_1.PrismaClient();
async function main() {
    const fakerRounds = 20;
    dotenv.config();
    console.log('Seeding...');
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