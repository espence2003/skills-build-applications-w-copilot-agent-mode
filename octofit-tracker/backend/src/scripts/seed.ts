import mongoose from 'mongoose';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', role: 'student', team: 'Aqua Squad', points: 980 },
      { name: 'Jordan Lee', role: 'student', team: 'Nova Runners', points: 910 },
      { name: 'Sofia Patel', role: 'student', team: 'Peak Pals', points: 870 },
      { name: 'Chris Rivera', role: 'teacher', team: 'Staff', points: 0 },
    ]);

    const teams = await Team.create([
      { name: 'Aqua Squad', color: 'info', members: ['Maya Chen', 'Liam Ortiz'] },
      { name: 'Nova Runners', color: 'warning', members: ['Jordan Lee', 'Tara Brooks'] },
      { name: 'Peak Pals', color: 'success', members: ['Sofia Patel', 'Noah Kim'] },
      { name: 'Staff', color: 'secondary', members: ['Chris Rivera'] },
    ]);

    const activities = await Activity.create([
      { studentName: 'Maya Chen', activityType: 'Running', durationMinutes: 35, points: 120, date: new Date('2026-08-03') },
      { studentName: 'Jordan Lee', activityType: 'Cycling', durationMinutes: 45, points: 140, date: new Date('2026-08-02') },
      { studentName: 'Sofia Patel', activityType: 'Strength', durationMinutes: 50, points: 150, date: new Date('2026-08-01') },
    ]);

    await LeaderboardEntry.create([
      { studentName: 'Maya Chen', teamName: 'Aqua Squad', points: 980, streak: 7 },
      { studentName: 'Jordan Lee', teamName: 'Nova Runners', points: 910, streak: 5 },
      { studentName: 'Sofia Patel', teamName: 'Peak Pals', points: 870, streak: 6 },
    ]);

    await Workout.create([
      { name: 'Tempo Run', category: 'Cardio', durationMinutes: 25, difficulty: 'intermediate' },
      { name: 'Core Circuit', category: 'Strength', durationMinutes: 20, difficulty: 'beginner' },
      { name: 'Mobility Flow', category: 'Recovery', durationMinutes: 15, difficulty: 'beginner' },
    ]);

    console.log('Database seeding complete');
    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workouts.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
