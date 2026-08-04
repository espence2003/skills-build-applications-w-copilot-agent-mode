import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  color: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  color: { type: String, default: 'primary' },
  members: [{ type: String, default: [] }],
});

export default mongoose.model<ITeam>('Team', teamSchema);
