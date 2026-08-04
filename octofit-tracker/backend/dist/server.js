"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const Activity_1 = __importDefault(require("./models/Activity"));
const Team_1 = __importDefault(require("./models/Team"));
const User_1 = __importDefault(require("./models/User"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/leaderboard', async (_req, res) => {
    try {
        const users = await User_1.default.find({}).sort({ points: -1 }).limit(10);
        res.json(users.map((user) => ({ name: user.name, points: user.points, team: user.team })));
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load leaderboard' });
    }
});
app.get('/api/teams', async (_req, res) => {
    try {
        const teams = await Team_1.default.find({});
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load teams' });
    }
});
app.get('/api/activities', async (_req, res) => {
    try {
        const activities = await Activity_1.default.find({}).sort({ date: -1 }).limit(10);
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load activities' });
    }
});
app.get('/api/users', async (_req, res) => {
    try {
        const users = await User_1.default.find({});
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load users' });
    }
});
app.post('/api/users', async (req, res) => {
    try {
        const user = await User_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create user' });
    }
});
app.post('/api/activities', async (req, res) => {
    try {
        const activity = await Activity_1.default.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create activity' });
    }
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
});
