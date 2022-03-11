import mongoose from "mongoose";
import { Person } from "../models/Person";

const { Schema } = mongoose;

const personSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  city: String,
  country: String,
});

const PersonRepository = mongoose.model("Person", personSchema);

export { PersonRepository };
