import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
