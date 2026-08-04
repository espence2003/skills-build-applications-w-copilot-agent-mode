import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  studentName: string;
  teamName: string;
  points: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  studentName: { type: String, required: true },
  teamName: { type: String, required: true },
  points: { type: Number, required: true },
  streak: { type: Number, default: 0 },
});

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
