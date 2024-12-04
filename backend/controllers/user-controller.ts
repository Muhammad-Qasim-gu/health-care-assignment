import { NextApiRequest, NextApiResponse } from "next";
import ResponseModel from "@/utils/response-model";
import UserModel from "@/models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req?.body;

  if (!name || !email || !password) {
    const response = new ResponseModel(false, "All fields are required", null);
    return res.status(400).json(response);
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const response = new ResponseModel(false, "User already exists", null);
      return res.status(400).json(response);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const response = new ResponseModel(
      true,
      "User successfully registered",
      null
    );
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error during user signup:", error);
    const response = new ResponseModel(false, "Internal server error", null);
    return res.status(500).json(response);
  }
};
//login api as it is in typescript so thats whty use nextapirequest and response
export const logIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const response = new ResponseModel(false, "All fields are required", null);
    return res.status(400).json(response);
  }

  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
    const response = new ResponseModel(
      false,
      "Invalid email or password",
      null
    );
    return res.status(401).json(response);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const response = new ResponseModel(
      false,
      "Invalid email or password",
      null
    );
    return res.status(401).json(response);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
   expiresIn:"1d",
  });

  const content = {
    token,
  };

  const response = new ResponseModel(true, "Login successful", content);
  return res.status(200).json(response);
};
