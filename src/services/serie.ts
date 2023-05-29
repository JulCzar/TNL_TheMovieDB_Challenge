import { storageKeys } from '../constants/storageKeys'
import { Episode, SerieDetails } from '../models'
import { persistentStorage } from './persistentStorage'

export const getLikedSeries = () =>
  persistentStorage.getItem<SerieDetails[]>(storageKeys.LIKED) || []

export const likeSerie = (serie: SerieDetails) => {
  const likedSeries = getLikedSeries()

  if (!likedSeries.map(l => l.id).includes(serie.id)) likedSeries.push(serie)

  persistentStorage.setItem(storageKeys.LIKED, likedSeries)
}

export const unlikeSerie = (serie: SerieDetails) => {
  const likedSeries = getLikedSeries()

  const filteredLikedSeries = likedSeries.filter(s => s.id !== serie.id)

  persistentStorage.setItem(storageKeys.LIKED, filteredLikedSeries)
}

export const serieIsLiked = (serie: SerieDetails) => {
  const likedSeries = getLikedSeries()

  if (!likedSeries) return false

  for (const storedSerie of likedSeries)
    if (storedSerie.id === serie.id) return true

  return false
}

const getWatchedSeries = () =>
  persistentStorage.getItem<{ [x: string]: number[] }>(storageKeys.WATCHED) ||
  {}

export const markEpisodeAsWatched = (serie: SerieDetails, episode: Episode) => {
  const watchedSeries = getWatchedSeries()

  const serieWatchedEpisodes = watchedSeries[serie.id] || []

  if (!serieWatchedEpisodes.includes(episode.id))
    serieWatchedEpisodes.push(episode.id)

  watchedSeries[serie.id] = serieWatchedEpisodes

  persistentStorage.setItem(storageKeys.WATCHED, watchedSeries)
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

  persistentStorage.setItem(storageKeys.WATCHED, watchedSeries)
}

export const episodeIsWatched = (serie: SerieDetails, episode: Episode) => {
  const watchedSeries = getWatchedSeries()

  const serieWatchedEpisodes = watchedSeries[serie.id] || []

  return serieWatchedEpisodes.includes(episode.id)
}
