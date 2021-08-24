import { Box, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import type { APISeriesResponse, Genre, SerieInfo } from '../../models'
import { Presentation, SerieCard, SerieSkeleton } from '../../components'
import { useScroll } from '../../hooks/useScroll'
import { getPersistentStorage } from '../../services/persistentStorage'
import MultiSelect from '../../components/MultiSelect'
import Template from '../../styles/template'
import InfinityGrid from './components/InfinityGrid'

type SerieListPaginated = {
  [x: string]: SerieInfo[]
}
const PREVIOUS_STATE = 'previous_state'

const includesAll = function <T>(arr: T[], values: T[]) {
  return values.every(v => arr.includes(v))
}

const persistentStorage = getPersistentStorage()

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

  const getSeriesFiltered = useCallback(() => {
    const filteredSeries = Object.values(series)
      .flat()
      .filter(s =>
        includesAll(
          s.genre_ids,
          tags.map(t => t.id)
        )
      )

    return filteredSeries
  }, [series, tags])

  useEffect(() => {
    axios.get('/api/genres').then(({ data }) => setGenres(data))

    const previousState = persistentStorage.getItem<{
      tags: Genre[]
      series: SerieListPaginated
      currPage: number
    }>(PREVIOUS_STATE)

    if (!previousState) {
      loadNextPage()
      return
    }

    const { tags, series, currPage = 1 } = previousState

    setSeries(series)
    setPage(currPage)
    setTags(tags)
  }, []) // eslint-disable-line

  useEffect(() => {
    const currState = { tags, series, currPage }
    persistentStorage.setItem(PREVIOUS_STATE, currState, 5)
  }, [tags, series, currPage])

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
    }
  }, [scroll]) // eslint-disable-line

  return (
    <Template containerRef={containerRef}>
      <Presentation />

      {/* Content Wrapper */}
      <Box>
        <Flex justify='flex-end' gridGap={4} align='center' my={4}>
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
          Skeleton={SerieSkeleton}
          items={getSeriesFiltered()}
          render={serie => {
            return (
              <SerieCard
                key={serie.id}
                serie={serie}
                genres={serie.genre_ids.map(id => {
                  for (const genre of genres)
                    if (genre.id === id) return genre.name
                  return ''
                })}
              />
            )
          }}
        />
      </Box>
    </Template>
  )
}

export default Home
