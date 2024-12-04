import mongoose, { Schema } from "mongoose";
interface medicine {
  name: string;
  price: number;
  useFor: string;
  brandName: string;
  dosageForm: string;
}

const medicineSchema = new Schema<medicine>({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  price: {
    type: Number,
    required: true,
  },
  useFor: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  dosageForm: {
    type: String,
    required: true,
  },
});

const medicineModel = mongoose.model<medicine>("medicine", medicineSchema);
export default medicineModel;
