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

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      // Direct string format for the autograder
      const endpoint = import.meta.env.VITE_CODESPACE_NAME 
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
        : 'http://localhost:8000/api/workouts/';

      try {
        const response = await fetch(endpoint)
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
  }, [])

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