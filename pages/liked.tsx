import { Box, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { SerieCard } from '../components'
import InfinityGrid from '../components/InfinityGrid'
import { Genre, SerieInfo } from '../models'
import { getLikedSeries } from '../services/serie'
import Template from '../styles/template'

const Liked: React.FC = () => {
  const [series, setSeries] = useState<SerieInfo[]>([])
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
        <InfinityGrid
          items={series}
          render={serie => (
            <Flex justify='center'>
              <SerieCard
                serie={serie}
                genres={serie.genre_ids.map(id => {
                  for (const genre of genres)
                    if (genre.id === id) return genre.name
                  return ''
                })}
              />
            </Flex>
          )}
        />
      </Box>
    </Template>
  )
}

export default Liked
