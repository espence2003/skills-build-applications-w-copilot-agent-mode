import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import { getApiBaseUrl } from './config/apiUrl';
import Activity from './models/Activity';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' });
  }
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams' });
  }
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create team' });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  try {
    const activities = await Activity.find({}).sort({ date: -1 }).limit(10);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activities' });
  }
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity' });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  try {
    const users = await User.find({}).sort({ points: -1 }).limit(10);
    res.json(users.map((user) => ({ name: user.name, points: user.points, team: user.team })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  try {
    const workouts = await Workout.find({});
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts' });
  }
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create workout' });
  }
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
