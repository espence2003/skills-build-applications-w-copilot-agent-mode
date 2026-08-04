import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: string;
  team: string;
  points: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  role: { type: String, default: 'student' },
  team: { type: String, default: 'Unassigned' },
  points: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', userSchema);
