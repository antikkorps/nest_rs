import { faker } from "@faker-js/faker";

export const createUserPseudo = () => {
    const pseudo = "__" + faker.random.word();
    return pseudo;
}