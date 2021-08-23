import { Box, Container, Flex, Heading, Wrap } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Footer, Header, SerieCard, SerieSkeleton } from '../components'
import { Genre, SerieInfo } from '../models'
import { getLikedSeries } from '../services/serie'

const Liked: React.FC = () => {
  const [series, setSeries] = useState<SerieInfo[] | null>(null)
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    if (!genres.length)
      axios.get('/api/genres').then(({ data }) => setGenres(data))

    const likedSeries = getLikedSeries()

    const likeSeriesInfo = likedSeries
      .map(ls => ({
        ...ls,
        genre_ids: ls.genres.map(g => g.id),
      }))
      .sort((a, b) => {
        if (b.name > a.name) return -1
        if (a.name > b.name) return 1
        return 0
      })

    setSeries(likeSeriesInfo)
  }, [genres])
  return (
    <Container maxW='none'>
      <Header />

      <Container maxW='container.xl'>
        <Flex gridGap={6}>
          <FaHeart size={40} />
          <Heading fontSize='4xl'>Favoritos</Heading>
        </Flex>
        <Box>
          <Wrap spacing={8} mt={4}>
            {!series
              ? 's'
                  .repeat(20)
                  .split('')
                  .map((pre, i) => <SerieSkeleton key={pre + i} />)
              : series.map(serie => (
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
          </Wrap>
        </Box>
      </Container>
      <Footer />
    </Container>
  )
}

export default Liked
