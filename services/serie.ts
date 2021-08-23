import { Episode, SerieDetails } from '../models'
import { getPersistentStorage } from './persistentStorage'

const persistentStorage = getPersistentStorage()
enum storeKey {
  liked = 'liked',
  watched = 'watched',
}

export const getLikedSeries = () =>
  persistentStorage.getItem<SerieDetails[]>(storeKey.liked) || []

export const likeSerie = (serie: SerieDetails) => {
  const likedSeries = getLikedSeries()

  if (!likedSeries.map(l => l.id).includes(serie.id)) likedSeries.push(serie)

  persistentStorage.setItem(storeKey.liked, likedSeries)
}

export const unlikeSerie = (serie: SerieDetails) => {
  const likedSeries = getLikedSeries()

  const filteredLikedSeries = likedSeries.filter(s => s.id !== serie.id)

  persistentStorage.setItem(storeKey.liked, filteredLikedSeries)
}

export const serieIsLiked = (serie: SerieDetails) => {
  const likedSeries = getLikedSeries()

  if (!likedSeries) return false

  for (const storedSerie of likedSeries)
    if (storedSerie.id === serie.id) return true

  return false
}

const getWatchedSeries = () =>
  persistentStorage.getItem<{ [x: string]: number[] }>(storeKey.watched) || {}

export const markEpisodeAsWatched = (serie: SerieDetails, episode: Episode) => {
  const watchedSeries = getWatchedSeries()

  const serieWatchedEpisodes = watchedSeries[serie.id] || []

  if (!serieWatchedEpisodes.includes(episode.id))
    serieWatchedEpisodes.push(episode.id)

  watchedSeries[serie.id] = serieWatchedEpisodes

  persistentStorage.setItem(storeKey.watched, watchedSeries)
}

export const removeEpisodeFromWatchedList = (
  serie: SerieDetails,
  episode: Episode
) => {
  const watchedSeries = getWatchedSeries()

  const serieWatchedEpisodes = watchedSeries[serie.id] || []

  const filteredSerieWatchedEpisodes = serieWatchedEpisodes.filter(
    e => e !== episode.id
  )

  watchedSeries[serie.id] = filteredSerieWatchedEpisodes

  persistentStorage.setItem(storeKey.watched, watchedSeries)
}

export const episodeIsWatched = (serie: SerieDetails, episode: Episode) => {
  const watchedSeries = getWatchedSeries()

  const serieWatchedEpisodes = watchedSeries[serie.id] || []

  return serieWatchedEpisodes.includes(episode.id)
}
