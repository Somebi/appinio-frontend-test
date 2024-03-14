export const base = import.meta.env.VITE_API_BACKEND || 'http://127.0.0.1:5000'

export const summaryEndpoint = () => `${base}/summary`
