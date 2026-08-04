import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  studentName: string;
  activityType: string;
  durationMinutes: number;
  points: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  studentName: { type: String, required: true },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  points: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', activitySchema);
