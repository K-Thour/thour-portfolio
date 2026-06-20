import mongoose from 'mongoose';
import models from '../models';
import envConstants from '../constants/env.constant';
import { hashPassword } from '../utils/bcrypt.utils';

export const seedAdminUser = async (): Promise<void> => {
  try {
    const userCount = await models.user.model.countDocuments();
    if (userCount > 0) {
      console.log('Seeding skipped: Database already contains user(s).');
      return;
    }

    const email = envConstants.SEED_EMAIL;
    const password = envConstants.SEED_PASSWORD;

    if (!email || !password) {
      console.log('Seeding skipped: SEED_EMAIL or SEED_PASSWORD is not set in environment.');
      return;
    }

    console.log(`Seeding admin user with email: ${email}`);
    const passwordHash = await hashPassword(password);

    await models.user.model.collection.insertOne({
      // @ts-ignore
      _id: 'Single_User',
      name: 'Admin User',
      email: email,
      passwordHash: passwordHash,
      phoneNumber: '+1234567890',
      experience: 5,
      completedProjects: 10,
      solvedProblems: 20,
      happyClients: 5,
      hobbies: ['Coding'],
      languages: [{ name: 'English', level: 'native' }],
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('Admin user seeded successfully!');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};
