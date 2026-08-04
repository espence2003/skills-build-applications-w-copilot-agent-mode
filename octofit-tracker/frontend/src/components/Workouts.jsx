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

function getApiEndpoint(path) {
  return `${getApiBaseUrl()}/api/${path}/`
}

function Workouts({ apiBaseUrl = '' }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      const baseUrl = apiBaseUrl || getApiBaseUrl()

      try {
        const response = await fetch(getApiEndpoint('workouts'))
        if (!response.ok) {
          throw new Error('Unable to load workouts')
        }

        const payload = await response.json()
        if (!ignore) {
          setWorkouts(normalizeCollection(payload))
          setError('')
        }
      } catch {
        if (!ignore) {
          setWorkouts([])
          setError('Unable to load workout data right now.')
        }
      }
    }

    loadWorkouts()
    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <li key={workout._id || `${workout.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{workout.name || 'Unnamed workout'}</span>
                <span className="badge text-bg-success">{workout.type || 'fitness'}</span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No workouts yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Workouts
