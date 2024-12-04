import { NextApiRequest, NextApiResponse } from "next";
import DiseaseModel from "@/models/disease-model";
import ResponseModel from "@/utils/response-model";

export const GetDisease = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const disease = await DiseaseModel.find();
    res.status(200).json(disease);
  } catch (error) {
    console.error("Error fetching disease:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Disease = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;
  if (!name || !description) {
    const response = new ResponseModel(false, "All fields are required", null);
    return res.status(400).json(response);
  }
  try {
    const newDisease = new DiseaseModel({
      name,
      description,
    });
    const saveDisease = await newDisease.save();
    const response = new ResponseModel(
      true,
      "Medicine added successfully",
      saveDisease
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

export const updateDisease = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const { name, description } = req.body;

  if (!id) {
    return res
      .status(400)
      .json(new ResponseModel<null>(false, "Disease ID is required", null));
  }

  if (!name && !description) {
    return res
      .status(400)
      .json(
        new ResponseModel<null>(
          false,
          "At least one field to update is required",
          null
        )
      );
  }

  try {
    const updateFields: Partial<{ name: string; description: string }> = {};
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;

    const updatedDisease = await DiseaseModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedDisease) {
      return res
        .status(404)
        .json(new ResponseModel<null>(false, "Disease not found", null));
    }

    return res
      .status(200)
      .json(
        new ResponseModel(true, "Disease updated successfully", updatedDisease)
      );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating disease:", error.message);

      return res
        .status(500)
        .json(new ResponseModel<null>(false, "Failed to update disease", null));
    } else {
      console.error("Unexpected error:", error);

      return res
        .status(500)
        .json(new ResponseModel<null>(false, "Failed to update disease", null));
    }
  }
};
