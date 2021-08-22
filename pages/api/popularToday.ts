import type { NextApiRequest, NextApiResponse } from 'next'
import type { APISeriesResponse, SerieInfo } from '../../models'
import { api } from '../../services/api'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query

  const axiosConfig = { params: { page } }

  try {
    const { data } = await api.get<APISeriesResponse>('/tv/popular', axiosConfig)
    
    res.json(data)
  } catch (e) {
    console.trace(e)

    res.json({
      status: 'Error',
    })
  }
}

export default handler
