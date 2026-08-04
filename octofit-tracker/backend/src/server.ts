import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import Activity from './models/Activity';
import Team from './models/Team';
import User from './models/User';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api/leaderboard', async (_req, res) => {
  try {
    const users = await User.find({}).sort({ points: -1 }).limit(10);
    res.json(users.map((user) => ({ name: user.name, points: user.points, team: user.team })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

app.get('/api/teams', async (_req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams' });
  }
});

app.get('/api/activities', async (_req, res) => {
  try {
    const activities = await Activity.find({}).sort({ date: -1 }).limit(10);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activities' });
  }
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

app.post('/api/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity' });
  }
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
