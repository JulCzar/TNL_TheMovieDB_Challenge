import type {
  Episode,
  EpisodeRequest,
  Season,
  SerieDetails,
} from '../../models'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Tag,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import {
  EpisodeItem,
  EpisodeSkeleton,
  SerieDetailSkeleton,
} from '../../components'
import NextLink from 'next/link'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import {
  episodeIsWatched,
  likeSerie,
  markEpisodeAsWatched,
  removeEpisodeFromWatchedList,
  serieIsLiked,
  unlikeSerie,
} from '../../services/serie'
import Template from '../../styles/template'

const Movie: NextPage = props => {
  const route = useRouter()
  const [data, setData] = useState<SerieDetails | null>(null)
  const [isSerieLiked, setLiked] = useState(false)
  const [seasons, setSeason] = useState<{ [x: string]: Episode[] }>({})
  const { id } = route.query

  useEffect(() => {
    if (!id) return

    axios
      .get<SerieDetails>(`/api/serie/${id}`)
      .then(({ data }) => setData(data))
  }, [id])

  useEffect(() => {
    if (!data) return

    const isSerieLiked = serieIsLiked(data)

    setLiked(isSerieLiked)
  }, [data])

  async function loadSeasonEpisodes(season: Season) {
    if (!!seasons[season.id]) return

    axios
      .get<EpisodeRequest>(`/api/serie/${id}/episodes/${season.season_number}`)
      .then(({ data }) => {
        setSeason({ ...seasons, [season.id]: data.episodes })
      })
  }

  function toggleLikedSerie() {
    if (!data) return

    if (serieIsLiked(data)) {
      unlikeSerie(data)
      setLiked(false)
    } else {
      likeSerie(data)
      setLiked(true)
    }
  }

  function toggleEpisodeWatched(episode: Episode) {
    return () => {
      if (!data) return

      if (episodeIsWatched(data, episode))
        removeEpisodeFromWatchedList(data, episode)
      else markEpisodeAsWatched(data, episode)
    }
  }

  if (!data || ['error'].includes(data.status.toLowerCase()))
    return <SerieDetailSkeleton />

  return (
    <Template>
      <Box
        borderRadius='md'
        overflow='hidden'
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundImage={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`}>
        <Box p={6} background='#0008' backdropFilter='blur(10px)'>
          <Flex>
            <Image
              alt=''
              loading='lazy'
              borderRadius='md'
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
            />
            <Flex direction='column' p={6} w='6xl' minW='md'>
              <Heading color='fontColor.600' fontSize='4xl'>
                {data.name} ({new Date(data.first_air_date).getFullYear()})
              </Heading>
              <Text color='fontColor.400'>{data.tagline}</Text>
              <Divider my={6} />
              <Text color='fontColor.600'>Tags</Text>
              <Text>
                {data.genres.map(genre => (
                  <NextLink href={`/?genres=${[genre.id]}`} key={genre.id}>
                    <Tag
                      _hover={{ cursor: 'pointer' }}
                      mr={2}
                      colorScheme='yellow'>
                      {genre.name}
                    </Tag>
                  </NextLink>
                ))}
              </Text>
              <Text color='fontColor.600' mt={4}>
                Sinopse
              </Text>
              <Text color='fontColor.400' textAlign='justify'>
                {data.overview || 'Não  há'}
              </Text>
              <Spacer />
              <Box>
                <IconButton
                  aria-label='favorite'
                  background='red.600'
                  onClick={toggleLikedSerie}
                  icon={
                    isSerieLiked ? (
                      <FaHeart color='white' />
                    ) : (
                      <FiHeart color='white' />
                    )
                  }
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Heading color='fontColor.600' mt={10} mb={4} fontSize='2xl'>
          Temporadas
        </Heading>
        <Accordion allowMultiple>
          {data.seasons.map(season => (
            <AccordionItem key={season.id}>
              <AccordionButton onClick={() => loadSeasonEpisodes(season)}>
                <Box color='fontColor.500' flex='1' textAlign='left'>
                  {season.name} - {season.episode_count} episodes
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                {!seasons[season.id]
                  ? 's'
                      .repeat(season.episode_count)
                      .split('')
                      .map((pre, i) => (
                        <EpisodeSkeleton key={`${pre}-${i}-${season.name}`} />
                      ))
                  : seasons[season.id].map(ep => (
                      <EpisodeItem
                        episode={ep}
                        key={ep.id}
                        checked={episodeIsWatched(data, ep)}
                        onChange={toggleEpisodeWatched(ep)}
                        defaultChecked={episodeIsWatched(data, ep)}
                      />
                    ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Template>
  )
}

export default Movie
