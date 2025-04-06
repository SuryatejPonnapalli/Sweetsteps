import mongoose, { Document, Schema } from "mongoose";

export interface IParent extends Document {
  name: string;
  email: string;
  kidId: mongoose.Types.ObjectId;
  timeSpend: "morning" | "afternoon" | "evening" | "night";
  password: string;
}

const parentSchema: Schema<IParent> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    kidId: {
      type: Schema.Types.ObjectId,
      ref: "Kid",
    },
    timeSpend: {
      type: String,
      required: true,
      enum: ["morning", "evening", "afternoon", "night"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Parent =
  mongoose.models.Parent || mongoose.model<IParent>("Parent", parentSchema);

export default Parent;
