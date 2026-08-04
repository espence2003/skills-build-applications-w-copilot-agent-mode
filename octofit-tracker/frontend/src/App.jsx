import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8000/api'
}

function Home() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <div className="row g-4 align-items-start">
      <div className="col-lg-7">
        <h1 className="display-5 fw-bold text-primary">OctoFit Tracker</h1>
        <p className="lead text-muted">
          A modern multi-tier fitness experience for teams, workouts, and leaderboards.
        </p>
        <div className="d-flex flex-wrap gap-3 mt-4">
          <Link to="/teams" className="btn btn-primary">View teams</Link>
          <Link to="/leaderboard" className="btn btn-outline-primary">See leaderboard</Link>
          <Link to="/activities" className="btn btn-outline-secondary">View activities</Link>
          <Link to="/users" className="btn btn-outline-secondary">View users</Link>
          <Link to="/workouts" className="btn btn-outline-secondary">View workouts</Link>
        </div>
      </div>
      <div className="col-lg-5">
        <Activities apiBaseUrl={apiBaseUrl} />
      </div>
      <div className="col-12">
        <Leaderboard apiBaseUrl={apiBaseUrl} />
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
        <div className="d-flex flex-wrap gap-2">
          <NavLink className={({ isActive }) => `nav-link text-light ${isActive ? 'fw-bold' : ''}`} to="/teams">
            Teams
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link text-light ${isActive ? 'fw-bold' : ''}`} to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link text-light ${isActive ? 'fw-bold' : ''}`} to="/activities">
            Activities
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link text-light ${isActive ? 'fw-bold' : ''}`} to="/users">
            Users
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link text-light ${isActive ? 'fw-bold' : ''}`} to="/workouts">
            Workouts
          </NavLink>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams apiBaseUrl={getApiBaseUrl()} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={getApiBaseUrl()} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={getApiBaseUrl()} />} />
          <Route path="/users" element={<Users apiBaseUrl={getApiBaseUrl()} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={getApiBaseUrl()} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
