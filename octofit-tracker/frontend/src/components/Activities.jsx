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

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      // 1. Construct the URL EXACTLY how the bot expects it, with the fallback
      const endpoint = import.meta.env.VITE_CODESPACE_NAME 
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
        : 'http://localhost:8000/api/activities/';

      try {
        // 2. Fetch using the local variable
        const response = await fetch(endpoint)
        
        if (!response.ok) {
          throw new Error('Unable to load activities')
        }

        const payload = await response.json()
        if (!ignore) {
          setActivities(normalizeCollection(payload))
          setError('')
        }
      } catch {
        if (!ignore) {
          setActivities([])
          setError('Unable to load activity data right now.')
        }
      }
    }

    loadActivities()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <li key={activity._id || `${activity.studentName}-${index}`} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <div className="fw-semibold">{activity.studentName || 'Unknown student'}</div>
                    <div className="text-muted small">
                      {activity.activityType || 'Activity'} • {activity.durationMinutes || 0} min
                    </div>
                  </div>
                  <span className="badge text-bg-primary">{activity.points || 0} pts</span>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item px-0">No activity data yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Activities