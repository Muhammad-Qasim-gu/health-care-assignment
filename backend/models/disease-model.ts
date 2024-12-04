import mongoose, { Schema } from "mongoose";

interface Disease {
  name: string;
  description: string;
}

const diseaseSchema = new Schema<Disease>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const DiseaseModel = mongoose.model<Disease>("Disease", diseaseSchema);

export default DiseaseModel;


