import mongoose, { Document, Schema } from "mongoose";


interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  todos: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
}, { timestamps: true });

export default mongoose.model<IUser>("User", UserSchema);
