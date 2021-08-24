import { Box, Flex, Heading, Wrap } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { SerieCard, SerieSkeleton } from '../components'
import { Genre, SerieInfo } from '../models'
import { getLikedSeries } from '../services/serie'
import Template from '../styles/template'

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
    <Template>
      <Flex gridGap={6}>
        <FaHeart color='#d33c3c' size={40} />
        <Heading color='fontColor.600' fontSize='4xl'>
          Favoritos
        </Heading>
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
    </Template>
  )
}

export default Liked
