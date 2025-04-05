import mongoose, { Document, Schema } from "mongoose";

export interface IKid extends Document {
  name: string;
  dob: string;
  personality: string;
  expectation: string;
  interests: string[];
}

const kidSchema: Schema<IKid> = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  personality: {
    type: String,
    required: true,
  },
  expectation: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
    enum: ["drawing", "sports", "music", "dance"],
  },
});

const Kid = mongoose.models.Kid || mongoose.model<IKid>("Kid", kidSchema);

export default Kid;
