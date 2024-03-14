import { summaryEndpoint } from "./endpoints";

export const createSummary = (content: string) =>
    fetch(summaryEndpoint(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    })
        .then(response => response.json())

export const fetchSummaries = () =>
    fetch(summaryEndpoint())
        .then(response => response.json())
