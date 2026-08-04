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

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.VITE_bookish_funicular?.trim()
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  return configuredBaseUrl ? configuredBaseUrl.replace(/\/$/, '') : 'http://localhost:8000'
}

function getApiEndpoint() {
  return `${getApiBaseUrl()}/api/teams/`
}

function Teams({ apiBaseUrl = '' }) {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      const baseUrl = apiBaseUrl || getApiBaseUrl()

      try {
        const response = await fetch(getApiEndpoint())
        if (!response.ok) {
          throw new Error('Unable to load teams')
        }

        const payload = await response.json()
        if (!ignore) {
          setTeams(normalizeCollection(payload))
          setError('')
        }
      } catch {
        if (!ignore) {
          setTeams([])
          setError('Unable to load team data right now.')
        }
      }
    }

    loadTeams()
    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <li key={team._id || `${team.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{team.name || 'Unnamed team'}</span>
                <span className="badge text-bg-primary">{team.members?.length || 0} members</span>
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

export default Teams
