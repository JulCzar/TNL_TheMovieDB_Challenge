import type { NextApiRequest, NextApiResponse } from 'next'
import type { SerieDetails } from '../../../models'
import { tmdb } from '../../../services/tmdb'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { serieId } = req.query

  try {
    const { data } = await tmdb.get<SerieDetails>(`/tv/${serieId}`)

    res.json(data)
  } catch (e) {
    console.trace(e)
    res.json({
      status: 'Error',
    })
  }
}

export default handler
