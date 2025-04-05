import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  weekId: mongoose.Types.ObjectId;
  task: string;
  difficulty: string;
}

const taskSchema: Schema<ITask> = new Schema({
  weekId: {
    type: Schema.Types.ObjectId,
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
});

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
