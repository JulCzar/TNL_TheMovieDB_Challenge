import { SerieDetails } from '../models'
import { getPersistentStorage } from './persistentStorage'

const persistentStorage = getPersistentStorage()
enum storeKey {
  liked = 'liked',
}

export const likeSerie = (serie: SerieDetails) => {
  const likedSeries =
    persistentStorage.getItem<SerieDetails[]>(storeKey.liked) || []

  if (!likedSeries.map(l => l.id).includes(serie.id)) likedSeries.push(serie)

  persistentStorage.setItem(storeKey.liked, likedSeries)
}

export const unlikeSerie = (serie: SerieDetails) => {
  const likedSeries =
    persistentStorage.getItem<SerieDetails[]>(storeKey.liked) || []

  const filteredLikedSeries = likedSeries.filter(s => s.id !== serie.id)

  persistentStorage.setItem(storeKey.liked, filteredLikedSeries)
}

export const serieIsLiked = (serie: SerieDetails) => {
  const likedSeries =
    persistentStorage.getItem<SerieDetails[]>(storeKey.liked) || []

  if (!likedSeries) return false

  for (const storedSerie of likedSeries)
    if (storedSerie.id === serie.id) return true

  return false
}
