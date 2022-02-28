import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    description: String,
  },
  {timestamps: true},
  { versionKey: false }
);

export const Comments = mongoose.model("Comments", commentsSchema);