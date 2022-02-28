import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    description: { type: String, required: true},
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

export const Posts = mongoose.model("Posts", postSchema);