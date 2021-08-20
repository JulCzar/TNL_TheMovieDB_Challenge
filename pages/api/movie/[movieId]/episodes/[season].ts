import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../../../../services/api'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId, season } = req.query

  try {
    const { data } = await api.get(`/tv/${movieId}/season/${season}`)

    res.json(data)
  } catch (e) {
    console.trace(e)
    res.json({
      status: 'Error',
    })
  }
}

export default handler
