
// This file serves as the central point for external API configurations.
// Store your API keys in .env.local and reference them here.

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
};

export async function fetcher(url: string, options: RequestInit = {}) {
  const res = await fetch(`${apiConfig.baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error('API Error');
  }

  return res.json();
}
