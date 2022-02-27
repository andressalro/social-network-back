import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  },
  {timestamps: true},
  { versionKey: false }
);

export const Posts = mongoose.model("Posts", userSchema);