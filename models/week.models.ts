import mongoose, { Document, Schema } from "mongoose";

export interface IWeek extends Document {
  parentId: mongoose.Types.ObjectId;
  weekNo: number;
  kidId: mongoose.Types.ObjectId;
  sugarCollected: number;
}

const weekSchema: Schema<IWeek> = new Schema(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    weekNo: {
      type: Number,
      required: true,
    },
    kidId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Week = mongoose.models.Week || mongoose.model<IWeek>("Week", weekSchema);

export default Week;
