import mongoose, { Document, Schema } from "mongoose";

export interface IGift extends Document {
  giftType: string;
  status: string;
}

const giftSchema: Schema<IGift> = new Schema(
  {
    giftType: {
      type: String,
      enum: ["candy", "toy"],
    },
    status: {
      type: String,
      enum: ["delivered", "undelivered"],
      default: "undelivered",
    },
  },
  { timestamps: true }
);

const Gift = mongoose.models.Gift || mongoose.model<IGift>("Gift", giftSchema);

export default Gift;
