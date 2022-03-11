import dotenv from "dotenv";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { PersonRepository } from "../../repositories/PersonRepository";

dotenv.config();

class ListPeopleService {
  constructor() {}

  async execute(req: Request, res: Response) {
    try {
      await mongoose.connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
      );

      PersonRepository.find()
        .lean()
        .exec((err, people) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(people);
          }
          mongoose.disconnect();
        });
    } catch (e) {
      console.log(e);
    }
  }
}

export { ListPeopleService };
