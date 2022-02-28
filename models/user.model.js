import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mail: {
        type: String,
        unique: true
    },
    credential: {
        password: String
    },    
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    posts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
        }
    ]
  },
  {timestamps: true},
  { versionKey: false }
);

export const User = mongoose.model("User", userSchema);