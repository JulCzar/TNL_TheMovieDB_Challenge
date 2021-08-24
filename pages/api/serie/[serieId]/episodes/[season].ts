import type { NextApiRequest, NextApiResponse } from 'next'
import type { EpisodeRequest } from '../../../../../models'
import { tmdb } from '../../../../../services/tmdb'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { serieId, season } = req.query

  try {
    const { data } = await tmdb.get<EpisodeRequest>(
      `/tv/${serieId}/season/${season}`
    )

    res.json(data)
  } catch (e) {
    console.trace(e)
    res.status(400).json({
      status: 'Error',
    })
  }
}

export default handler
