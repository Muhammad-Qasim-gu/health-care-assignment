import mongoose, { Schema } from "mongoose";

interface Person {
  name: string;
  weight: number;
  height: number;
  age: number;
  disease: string;
  medicine:string;
  price: number;
}

const personSchema = new Schema<Person>({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  medicine: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const personModel = mongoose.model<Person>("Person", personSchema);
export default personModel;
