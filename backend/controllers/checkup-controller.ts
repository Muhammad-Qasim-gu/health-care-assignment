import { NextApiRequest, NextApiResponse } from "next";
import ResponseModel from "@/utils/response-model";
import personModel from "@/models/checkout-model";

export const checkup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, weight, height, age, disease, price, medicine } = req.body;
  if (!name || !weight || !height || !age || !disease || !price || !medicine) {
    const response = new ResponseModel(false, "All fields are required", null);
    return res.status(400).json(response);
  }
  try {
    const newCheckup = new personModel({
      name,
      weight,
      height,
      age,
      disease,
      price,
      medicine,
    });

    const saveCheckup = await newCheckup.save();
    const response = new ResponseModel(
      true,
      "checkup added successfully",
      saveCheckup
    );
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding checkup:", error.message);

      const response = new ResponseModel(
        false,
        "Failed to add checkup",
        error.message
      );
      return res.status(500).json(response);
    } else {
      console.error("Unexpected error:", error);

      const response = new ResponseModel(
        false,
        "Failed to add checkup",
        "An unknown error occurred"
      );
      return res.status(500).json(response);
    }
  }
};

export const getCheckup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const checkup = await personModel.find();
    res.status(200).json(checkup);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCheckup = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { _id } = req.query;

  if (!_id) {
    const response = new ResponseModel(false, "ID is required", null);
    return res.status(400).json(response);
  }

  try {
    const deletedCheckup = await personModel.findByIdAndDelete(_id);

    if (!deletedCheckup) {
      const response = new ResponseModel(false, "Checkup not found", null);
      return res.status(404).json(response);
    }

    const response = new ResponseModel(
      true,
      "Checkup deleted successfully",
      deletedCheckup
    );
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting checkup:", error.message);

      const response = new ResponseModel(
        false,
        "Failed to delete checkup",
        error.message
      );
      return res.status(500).json(response);
    } else {
      console.error("Unexpected error:", error);

      const response = new ResponseModel(
        false,
        "Failed to delete checkup",
        "An unknown error occurred"
      );
      return res.status(500).json(response);
    }
  }
};
