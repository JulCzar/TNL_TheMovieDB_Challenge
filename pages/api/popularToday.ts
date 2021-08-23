import type { NextApiRequest, NextApiResponse } from 'next'
import type { APISeriesResponse } from '../../models'
import { tmdb } from '../../services/tmdb'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query

  const axiosConfig = { params: { page } }

  try {
    const { data } = await tmdb.get<APISeriesResponse>(
      '/tv/popular',
      axiosConfig
    )
    
    res.json(data)
  } catch (e) {
    console.trace(e)

    res.json({
      status: 'Error',
    })
  }
}

export default handler
