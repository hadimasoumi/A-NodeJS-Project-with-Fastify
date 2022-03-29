import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
