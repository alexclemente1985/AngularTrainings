import dotenv from "dotenv";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { PersonRepository } from "../../repositories/PersonRepository";

dotenv.config();

class SearchPeopleService {
  constructor() {}

  async findByText(req: Request, res: Response) {
    try {
      await mongoose.connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
      );

      const { text } = req.params;

      const query = {
        $or: [
          { firstname: { $regex: text, $options: "i" } },
          { lastname: { $regex: text, $options: "i" } },
          { country: { $regex: text, $options: "i" } },
          { email: { $regex: text, $options: "i" } },
          { city: { $regex: text, $options: "i" } },
        ],
      };

      PersonRepository.find(query)
        .lean()
        .exec((err, people) => {
          console.log("caraca");
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

export { SearchPeopleService };
