import { Document } from "mongoose";

interface UserDocument extends Document {
  readonly id: string;
  readonly name: string;
}

type UserInterface = UserDocument;

export { UserInterface };
