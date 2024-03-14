// For simplicity and to make frontend work in a standalone local mode, production url is kept here, should be remove later
export const base = import.meta.env.VITE_API_BACKEND || 'https://appinio-ai-backend-ijfm4.ondigitalocean.app'

export const summaryEndpoint = () => `${base}/summary`
