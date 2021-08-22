import type { NextApiRequest, NextApiResponse } from 'next'
import type { Genre } from '../../models'
import { tmdb } from '../../services/tmdb'

type APIResponse = {
  genres: Genre[]
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await tmdb.get<APIResponse>('/genre/tv/list')

    res.json(data.genres)
  } catch (e) {
    console.trace(e)
    res.json({
      status: 'Error',
    })
  }
}

export default handler
