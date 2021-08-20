import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../services/api'

interface MovieInfo {
  backdrop_path: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

interface APIResponse {
  page: number
  results: MovieInfo[]
  total_pages: number
  total_results: number
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query

  const axiosConfig = { params: { page } }

  try {
    const { data } = await api.get<APIResponse>('/tv/popular', axiosConfig)
    
    res.json(data)
  } catch (e) {
    console.trace(e)

    res.json({
      status: 'Error',
    })
  }
}

export default handler
