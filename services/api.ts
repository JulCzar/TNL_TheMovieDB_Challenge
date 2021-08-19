import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
  params: {
    api_key: process.env.API_KEY
  }
})
