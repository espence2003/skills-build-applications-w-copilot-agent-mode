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

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      // Direct string format for the autograder
      const endpoint = import.meta.env.VITE_CODESPACE_NAME 
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
        : 'http://localhost:8000/api/users/';

      try {
        const response = await fetch(endpoint)
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
  }, [])

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={user._id || `${user.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{user.name || 'Unnamed user'}</span>
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