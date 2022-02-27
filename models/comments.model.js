import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    description: String,
  },
  {timestamps: true},
  { versionKey: false }
);

export const Comments = mongoose.model("Comments", userSchema);