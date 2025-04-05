import mongoose, { Document, Schema } from "mongoose";

export interface IParent extends Document {
  name: string;
  email: string;
  kidId: mongoose.Types.ObjectId;
  timeSpend: number;
  password: string;
}

const parentSchema: Schema<IParent> = new Schema({
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
  },
  timeSpend: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Parent =
  mongoose.models.Parent || mongoose.model<IParent>("Parent", parentSchema);

export default Parent;
