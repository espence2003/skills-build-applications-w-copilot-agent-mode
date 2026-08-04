"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            User_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
        ]);
        const users = await User_1.default.create([
            { name: 'Maya Chen', role: 'student', team: 'Aqua Squad', points: 980 },
            { name: 'Jordan Lee', role: 'student', team: 'Nova Runners', points: 910 },
            { name: 'Sofia Patel', role: 'student', team: 'Peak Pals', points: 870 },
            { name: 'Chris Rivera', role: 'teacher', team: 'Staff', points: 0 },
        ]);
        const teams = await Team_1.default.create([
            { name: 'Aqua Squad', color: 'info', members: ['Maya Chen', 'Liam Ortiz'] },
            { name: 'Nova Runners', color: 'warning', members: ['Jordan Lee', 'Tara Brooks'] },
            { name: 'Peak Pals', color: 'success', members: ['Sofia Patel', 'Noah Kim'] },
            { name: 'Staff', color: 'secondary', members: ['Chris Rivera'] },
        ]);
        const activities = await Activity_1.default.create([
            { studentName: 'Maya Chen', activityType: 'Running', durationMinutes: 35, points: 120, date: new Date('2026-08-03') },
            { studentName: 'Jordan Lee', activityType: 'Cycling', durationMinutes: 45, points: 140, date: new Date('2026-08-02') },
            { studentName: 'Sofia Patel', activityType: 'Strength', durationMinutes: 50, points: 150, date: new Date('2026-08-01') },
        ]);
        await Leaderboard_1.default.create([
            { studentName: 'Maya Chen', teamName: 'Aqua Squad', points: 980, streak: 7 },
            { studentName: 'Jordan Lee', teamName: 'Nova Runners', points: 910, streak: 5 },
            { studentName: 'Sofia Patel', teamName: 'Peak Pals', points: 870, streak: 6 },
        ]);
        await Workout_1.default.create([
            { name: 'Tempo Run', category: 'Cardio', durationMinutes: 25, difficulty: 'intermediate' },
            { name: 'Core Circuit', category: 'Strength', durationMinutes: 20, difficulty: 'beginner' },
            { name: 'Mobility Flow', category: 'Recovery', durationMinutes: 15, difficulty: 'beginner' },
        ]);
        console.log('Database seeding complete');
        console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workouts.`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
