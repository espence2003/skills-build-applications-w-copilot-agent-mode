# React + Vite

This frontend uses Vite environment variables for the API base URL.

## Environment configuration

Define `VITE_CODESPACE_NAME` in a local environment file such as `.env.local` when running in GitHub Codespaces:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api` or `VITE_API_BASE_URL` when provided.

The app uses the Codespaces preview URL pattern:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```
