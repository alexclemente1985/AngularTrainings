import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Person } from "../models/Person";
import { PersonRepository } from "../repositories/PersonRepository";

dotenv.config();

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

async function createRandomPeople() {
  const N = 1000;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < N; i++) {
    const p = new Person({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      city: faker.address.city(),
      country: faker.address.country(),
    });

    const pRepository = new PersonRepository(p);
    try {
      // eslint-disable-next-line no-await-in-loop
      await pRepository.save();
    } catch (e) {
      throw new Error(`Error generating new person -> ${e}`);
    }
  }
}

createRandomPeople().then(() => {
  mongoose.disconnect();
  console.log("OK");
});
