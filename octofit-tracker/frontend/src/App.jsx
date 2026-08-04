import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

const API_BASE_URL = 'http://localhost:8000/api'

function Home() {
  const [leaderboard, setLeaderboard] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard`)
      .then((response) => response.json())
      .then((data) => setLeaderboard(data))
      .catch(() => setLeaderboard([]))

    fetch(`${API_BASE_URL}/activities`)
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch(() => setActivities([]))
  }, [])

  return (
    <div className="row g-4 align-items-start">
      <div className="col-lg-7">
        <h1 className="display-5 fw-bold text-primary">OctoFit Tracker</h1>
        <p className="lead text-muted">
          A modern multi-tier fitness experience for teams, workouts, and leaderboards.
        </p>
        <div className="d-flex gap-3 mt-4">
          <Link to="/teams" className="btn btn-primary">View teams</Link>
          <Link to="/leaderboard" className="btn btn-outline-primary">See leaderboard</Link>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4">Recent activity</h2>
            <ul className="list-group list-group-flush">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <li key={activity._id} className="list-group-item px-0">
                    {activity.studentName} logged {activity.activityType} for {activity.durationMinutes} min.
                  </li>
                ))
              ) : (
                <li className="list-group-item px-0">No activity yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h4">Leaderboard</h2>
            <ul className="list-group list-group-flush">
              {leaderboard.length > 0 ? (
                leaderboard.map((entry) => (
                  <li key={entry.name} className="list-group-item d-flex justify-content-between">
                    <span>{entry.name}</span>
                    <span className="fw-bold">{entry.points} pts</span>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No leaderboard data yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Teams() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/teams`)
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch(() => setTeams([]))
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        <ul className="list-group list-group-flush">
          {teams.length > 0 ? (
            teams.map((team) => (
              <li key={team._id} className="list-group-item d-flex justify-content-between">
                <span>{team.name}</span>
                <span className="badge text-bg-primary">{team.members.length} members</span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No teams yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard`)
      .then((response) => response.json())
      .then((data) => setLeaderboard(data))
      .catch(() => setLeaderboard([]))
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        <ul className="list-group list-group-flush">
          {leaderboard.length > 0 ? (
            leaderboard.map((entry) => (
              <li key={entry.name} className="list-group-item d-flex justify-content-between">
                <span>{entry.name}</span>
                <span className="fw-bold">{entry.points} pts</span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No leaderboard data yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand fw-bold" to="/">
          OctoFit Tracker
        </Link>
        <div className="d-flex gap-2">
          <Link className="nav-link text-light" to="/teams">
            Teams
          </Link>
          <Link className="nav-link text-light" to="/leaderboard">
            Leaderboard
          </Link>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
