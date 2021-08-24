import { Box, Button, Container, Flex, Wrap } from '@chakra-ui/react'
import Select from 'react-select'
import type { NextPage } from 'next'
import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import type { APISeriesResponse, Genre, SerieInfo } from '../models'
import {
  Footer,
  Header,
  Presentation,
  SerieCard,
  SerieSkeleton,
} from '../components'
import { useScroll } from '../hooks/useScroll'
import { getPersistentStorage } from '../services/persistentStorage'
import { colors } from '../constants/colors'
import MultiSelect from '../components/MultiSelect'

const PERSIST_TAGS = 'tags'

const includesAll = function <T>(arr: T[], values: T[]) {
  return values.every(v => arr.includes(v))
}

const persistentStorage = getPersistentStorage()

const Home: NextPage = () => {
  const [series, setSeries] = useState<{ [x: string]: SerieInfo[] }>({})
  const [genres, setGenres] = useState<Genre[]>([])
  const [tags, setTags] = useState<Genre[]>([])
  const [loading, setLoading] = useState(false)
  const [currPage, setPage] = useState(1)

  const containerRef = useRef<any>(null)
  const scroll = useScroll({ wait: 64 })

  useEffect(() => {
    const persisted_tags = persistentStorage.getItem<Genre[]>(PERSIST_TAGS)

    if (persisted_tags) setTags(persisted_tags)

    axios.get('/api/genres').then(({ data }) => setGenres(data))
    loadNextPage()
  }, []) // eslint-disable-line

  const loadNextPage = useCallback(
    async function () {
      if (loading) return
      if (series[currPage]) return

      const { data } = await axios.get<APISeriesResponse>('/api/popularToday', {
        params: {
          page: currPage,
        },
      })

      setSeries({ ...series, [currPage]: data.results })
      setPage(currPage + 1)
      setLoading(false)
    },
    [loading, series, currPage]
  )

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
  }, [scroll, tags, loading]) // eslint-disable-line

  return (
    <Container
      bgColor={'background'}
      ref={containerRef}
      maxW='none'
      minH='100vh'>
      <Header />
      {/* Content Container */}
      <Container maxW='container.xl'>
        <Presentation />

        {/* Content Wrapper */}
        <Box>
          <Flex gridGap={4} align='center' my={4}>
            <MultiSelect
              isMulti
              value={tags}
              options={genres}
              placeholder='Tags'
              getOptionLabel={o => o.name}
              getOptionValue={o => o.id.toString()}
              onChange={val => {
                setTags([...val])
                persistentStorage.setItem(PERSIST_TAGS, val, 5)
              }}
            />
            <Button fontSize='sm' colorScheme='yellow' minW={100}>
              Aplicar
            </Button>
          </Flex>
          <Wrap minH={300} spacing={8} mt={4}>
            {Object.values(series)
              .flat()
              .filter(i =>
                includesAll(
                  i.genre_ids,
                  tags.map(t => t.id)
                )
              )
              .map(serie => (
                <SerieCard
                  key={serie.id}
                  serie={serie}
                  genres={serie.genre_ids.map(id => {
                    for (const genre of genres)
                      if (genre.id === id) return genre.name
                    return ''
                  })}
                />
              ))}
            {loading &&
              's'
                .repeat(20)
                .split('')
                .map((pre, i) => <SerieSkeleton key={`${pre}-${i}}`} />)}
          </Wrap>
        </Box>
      </Container>

      <Footer />
    </Container>
  )
}

export default Home
