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

function Users({ apiBaseUrl = 'http://localhost:8000/api' }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/users/`)
        if (!response.ok) {
          throw new Error('Unable to load users')
        }

        const payload = await response.json()
        if (!ignore) {
          setUsers(normalizeCollection(payload))
          setError('')
        }
      } catch {
        if (!ignore) {
          setUsers([])
          setError('Unable to load user data right now.')
        }
      }
    }

    loadUsers()
    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={user._id || `${user.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{user.name || 'Unknown user'}</span>
                <span className="badge text-bg-secondary">{user.role || 'member'}</span>
              </li>
            ))
          ) : (
            <li className="list-group-item">No users yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Users
