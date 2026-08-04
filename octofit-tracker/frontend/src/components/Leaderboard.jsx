import { useEffect, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }

  return []
}

function Leaderboard({ apiBaseUrl = 'http://localhost:8000/api' }) {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/leaderboard/`)
        if (!response.ok) {
          throw new Error('Unable to load leaderboard')
        }

        const payload = await response.json()
        if (!ignore) {
          setEntries(normalizeCollection(payload))
          setError('')
        }
      } catch {
        if (!ignore) {
          setEntries([])
          setError('Unable to load leaderboard data right now.')
        }
      }
    }

    loadLeaderboard()
    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <li key={entry.name || `${entry.team}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{entry.name || entry.studentName || 'Unknown athlete'}</span>
                <span className="fw-bold">{entry.points || 0} pts</span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No leaderboard entries yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Leaderboard
