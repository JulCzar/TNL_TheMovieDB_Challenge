import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../services/api'

type Genre = {
  id: number,
  name: string
}

type APIResponse = {
  genres: Genre[]
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await api.get<APIResponse>('/genre/tv/list')

    res.json(data.genres)
  } catch (e) {
    console.trace(e)
    res.json({
      status: 'Error',
    })
  }
}

export default handler
