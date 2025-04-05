import mongoose, { Document, Schema } from "mongoose";

export interface IWeek extends Document {
  parentId: mongoose.Types.ObjectId;
  weekNo: number;
  kidId: mongoose.Types.ObjectId;
  sugarCollected: number;
  weekStart: Date;
}

const weekSchema: Schema<IWeek> = new Schema(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    weekNo: {
      type: Number,
      required: true,
    },
    kidId: {
      type: Schema.Types.ObjectId,
      ref: "Kid",
      required: true,
    },
    weekStart: {
      type: Date,
      required: true,
    },
    sugarCollected: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Week = mongoose.models.Week || mongoose.model<IWeek>("Week", weekSchema);

export default Week;
