import { Document } from "mongoose";

interface UserDocument extends Document {
  readonly id: string;
  readonly task_name: string;
  readonly task_content: string;
}

type UserInterface = UserDocument;

export { UserInterface };
