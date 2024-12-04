import { NextApiRequest, NextApiResponse } from "next";
import ResponseModel from "@/utils/response-model";
import medicineModel from "@/models/medicine-model";

export const getMedicine = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method === "GET") {
      const { _id } = req.query;

      if (_id) {
        const medicine = await medicineModel.findById(_id);

        if (medicine) {
          res.status(200).json(medicine);
        } else {
          res.status(404).json({ message: "Medicine not found" });
        }
      } else {
        const medicines = await medicineModel.find();
        res.status(200).json(medicines);
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Medicine = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, price, useFor, brandName, dosageForm } = req.body;

  if (!name || !price || !useFor || !brandName || !dosageForm) {
    const response = new ResponseModel(false, "All fields are required", null);
    return res.status(400).json(response);
  }

  try {
    const newMedicine = new medicineModel({
      name,
      price,
      useFor,
      brandName,
      dosageForm,
    });

    const savedMedicine = await newMedicine.save();

    const response = new ResponseModel(
      true,
      "Medicine added successfully",
      savedMedicine
    );
    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding medicine:", error.message);

      const response = new ResponseModel(
        false,
        "Failed to add medicine",
        error.message
      );
      return res.status(500).json(response);
    } else {
      console.error("Unexpected error:", error);

      const response = new ResponseModel(
        false,
        "Failed to add medicine",
        "An unknown error occurred"
      );
      return res.status(500).json(response);
    }
  }
};

export default Medicine;
