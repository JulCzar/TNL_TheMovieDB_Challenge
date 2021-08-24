import { Box, Flex } from '@chakra-ui/react'
import axios from 'axios'
import type { NextPage } from 'next'
import { useState, useEffect, useRef, useCallback } from 'react'

import { Presentation, SerieCard, SerieSkeleton } from '../components'
import InfinityGrid from '../components/InfinityGrid'
import MultiSelect from '../components/MultiSelect'
import { storageKeys } from '../constants/storageKeys'
import { useScroll } from '../hooks/useScroll'
import type { APISeriesResponse, Genre, SerieListPaginated } from '../models'
import { persistentStorage } from '../services/persistentStorage'
import Template from '../styles/template'

const Home: NextPage = () => {
  const [series, setSeries] = useState<SerieListPaginated>({})
  const [genres, setGenres] = useState<Genre[]>([])
  const [tags, setTags] = useState<Genre[]>([])
  const [loading, setLoading] = useState(false)
  const [currPage, setPage] = useState(1)

  const containerRef = useRef<any>(null)
  const scroll = useScroll({ wait: 64 })

  const loadNextPage = useCallback(
    async function () {
      if (loading) return
      if (series[currPage]) return setPage(currPage + 1)

      const { data } = await axios.get<APISeriesResponse>('/api/popularToday', {
        params: {
          page: currPage,
        },
      })
      const serieListPaginated: SerieListPaginated = {
        ...series,
        [currPage]: data.results,
      }
      setSeries(serieListPaginated)
      setPage(currPage + 1)
      setLoading(false)
    },
    [loading, series, currPage]
  )

  const getSeriesFiltered = useCallback(
    () =>
      Object.values(series)
        .flat()
        .filter(s => tags.map(t => t.id).every(v => s.genre_ids.includes(v))),
    [series, tags]
  )

  useEffect(() => {
    axios.get('/api/genres').then(({ data }) => setGenres(data))

    const tags = persistentStorage.getItem<Genre[]>(storageKeys.TAGS) || []
    const currPage =
      persistentStorage.getItem<number>(storageKeys.CURRENT_PAGE) || 1
    const series = persistentStorage.getItem<SerieListPaginated>(
      storageKeys.SERIES
    )

    if (!series) {
      loadNextPage()
      return
    } else {
      setSeries(series)
      setPage(currPage)
    }

    setTags(tags)
  }, []) // eslint-disable-line

  useEffect(() => {
    persistentStorage.setItem(storageKeys.SERIES, series, 5)
    persistentStorage.setItem(storageKeys.CURRENT_PAGE, currPage, 5)
  }, [series, currPage])

  useEffect(() => {
    persistentStorage.setItem(storageKeys.TAGS, tags, 5)
  }, [tags])

  useEffect(() => {
    if (!containerRef.current || !scroll.y) return

    if (containerRef.current instanceof Element) {
      const { scrollHeight } = containerRef.current
      const currentScroll = scroll.y
      const distanceToPageBottom = scrollHeight - currentScroll

      if (distanceToPageBottom < 1000)
        Promise.resolve(0)
          .then(() => setLoading(true))
          .then(loadNextPage)
          .finally(() => setLoading(false))
    }
  }, [scroll]) // eslint-disable-line

  return (
    <Template containerRef={containerRef}>
      <Presentation />

      {/* Content Wrapper */}
      <Box>
        <Flex gridGap={4} align='center' my={4}>
          <MultiSelect
            isMulti
            value={tags}
            options={genres}
            instanceId='tags'
            placeholder='Tags'
            getOptionLabel={o => o.name}
            getOptionValue={o => o.id.toString()}
            onChange={tags => setTags([...tags])}
          />
        </Flex>
        <InfinityGrid
          loading={loading}
          skeletonCount={6}
          Skeleton={SerieSkeleton}
          items={getSeriesFiltered()}
          render={serie => (
            <SerieCard
              key={serie.id}
              serie={serie}
              genres={serie.genre_ids.map(id => {
                for (const genre of genres)
                  if (genre.id === id) return genre.name
                return ''
              })}
            />
          )}
        />
      </Box>
    </Template>
  )
}

export default Home
