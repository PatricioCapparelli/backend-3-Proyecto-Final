import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const createHash = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const generateUsers = async (numUsers) => {
    const users = [];
    const hashedPassword = await createHash('coder123');

    for (let i = 0; i < numUsers; i++) {
        users.push({
            _id: new mongoose.Types.ObjectId(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [],
            __v: 0
        });
    }
    return users;
};

export default generateUsers;