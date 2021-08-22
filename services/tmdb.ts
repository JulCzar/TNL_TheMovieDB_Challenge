import axios from 'axios'

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
  headers: {
    'Cache-Control': 's-maxage=10, stale-while-revalidate',
  },
  params: {
    api_key: process.env.API_KEY,
    language: 'pt-BR',
  },
})
