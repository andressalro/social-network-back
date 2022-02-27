import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
        type: String,
        unique: true
    },
    description: String,
    city: String,
    country: String,
    primaryContactNumber: String,
    otherEmailAddresses: [String]
  },
  {timestamps: true},
  { versionKey: false }
);

export const Profile = mongoose.model("Profile", userSchema);