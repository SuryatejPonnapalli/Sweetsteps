import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  weekId: mongoose.Types.ObjectId;
  task: string;
  difficulty: string;
  status: string;
  endDay: Date;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    weekId: {
      type: Schema.Types.ObjectId,
      ref: "Week",
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["e", "m", "h"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Complete", "Incomplete"],
    },
    endDay: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
