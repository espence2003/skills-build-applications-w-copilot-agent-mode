import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  durationMinutes: number;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, default: 'beginner' },
});

export default mongoose.model<IWorkout>('Workout', workoutSchema);
