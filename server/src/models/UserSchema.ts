import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export type IUser = Omit<InferSchemaType<typeof userSchema>, "createdAt">;

export const User = model("User", userSchema);
