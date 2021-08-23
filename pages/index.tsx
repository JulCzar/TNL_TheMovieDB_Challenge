import { Box, Button, Container, Flex, Wrap } from '@chakra-ui/react'
import Select from 'react-select'
import type { NextPage } from 'next'
import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import type { APISeriesResponse, Genre, SerieInfo } from '../models'
import {
  Footer,
  Header,
  InputWithIcon,
  Presentation,
  SerieCard,
  SerieSkeleton,
} from '../components'
import { useScroll } from '../hooks/useScroll'

const Home: NextPage = () => {
  const [series, setSeries] = useState<{ [x: string]: SerieInfo[] }>({})
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(false)
  const [currPage, setPage] = useState(1)

  const containerRef = useRef<any>(null)
  const scroll = useScroll({ wait: 32 })

  const loadNextPage = useCallback(
    async function () {
      if (loading) return
      if (!!series[currPage]) return

      const { data } = await axios.get<APISeriesResponse>('/api/popularToday', {
        params: {
          page: currPage,
        },
      })

      setSeries({ ...series, [currPage]: data.results })
      setPage(currPage + 1)
      setLoading(false)
    },
    [series, currPage, loading]
  )

  useEffect(() => {
    if (!containerRef.current || !scroll.y) return

    if (containerRef.current instanceof Element) {
      const { scrollHeight } = containerRef.current
      const currentScroll = scroll.y
      const distanceToPageBottom = scrollHeight - currentScroll

      if (distanceToPageBottom < 2500)
        Promise.resolve(0)
          .then(() => setLoading(true))
          .then(loadNextPage)
    }
  }, [scroll]) // eslint-disable-line

  useEffect(() => {
    axios.get('/api/genres').then(({ data }) => setGenres(data))
    loadNextPage()
  }, []) // eslint-disable-line

  return (
    <Container ref={containerRef} maxW='none' minH='100vh'>
      <Header />
      {/* Content Container */}
      <Container maxW='container.xl'>
        <Presentation />

        {/* Content Wrapper */}
        <Box>
          <Flex gridGap={4} align='center' my={4}>
            <InputWithIcon placeholder='Digite o nome da serie' />
            <Select
              isMulti
              options={genres}
              placeholder='Tags'
              hideSelectedOptions
              getOptionLabel={o => o.name}
              getOptionValue={o => o.id.toString()}
              styles={{
                container: provided => ({
                  ...provided,
                  minWidth: 300,
                }),
              }}
            />
            <Button minW={100}>Aplicar</Button>
          </Flex>
          <Wrap spacing={8} mt={4}>
            {Object.values(series)
              .flat()
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
            {'s'
              .repeat(20)
              .split('')
              .map((pre, i) => (
                <SerieSkeleton key={`${pre}-${i}}`} />
              ))}
          </Wrap>
        </Box>
      </Container>

      <Footer />
    </Container>
  )
}

export default Home
