import { Episode, EpisodeRequest, Season, SerieDetails } from '../../models'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Header } from '../../components'
import NextLink from 'next/link'
import { FiHeart } from 'react-icons/fi'
import EpisodeSkeleton from '../../components/EpisodeSkeleton'
import EpisodeItem from '../../components/EpisodeItem'

const Movie: NextPage = () => {
  const route = useRouter()
  const [data, setData] = useState<SerieDetails | null>(null)
  const [seasons, setSeason] = useState<{ [x: string]: Episode[] }>({})
  const { id } = route.query

  useEffect(() => {
    if (!id) return

    axios
      .get<SerieDetails>(`/api/serie/${id}`)
      .then(({ data }) => setData(data))
  }, [id])

  async function loadSeasonEpisodes(season: Season) {
    if (!!seasons[season.id]) return

    axios
      .get<EpisodeRequest>(`/api/serie/${id}/episodes/${season.season_number}`)
      .then(({ data }) => {
        setSeason({ ...seasons, [season.id]: data.episodes })
      })
  }

  if (!data || ['error'].includes(data.status.toLowerCase())) return null

  return (
    <Container maxW='none'>
      <Header />
      <Container maxW='container.xl'>
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
                <Heading fontSize='4xl'>
                  {data.name} ({new Date(data.first_air_date).getFullYear()})
                </Heading>
                <Text>{data.tagline}</Text>
                <Divider my={6} />
                <Text>Tags</Text>
                <Text>
                  {data.genres.map((genre, i) => (
                    <NextLink href={`/?genres=${[genre.id]}`} key={genre.id}>
                      <a>
                        {i > 0 && ', '}
                        {genre.name}
                      </a>
                    </NextLink>
                  ))}
                </Text>
                <Text mt={4}>Sinopse</Text>
                <Text textAlign='justify'>{data.overview || 'Não  há'}</Text>
                <Spacer />
                <Box>
                  <IconButton
                    aria-label='favorite'
                    background='red.600'
                    icon={<FiHeart color='white' />}
                  />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box>
          <Heading mt={10} mb={4} fontSize='2xl'>
            Seasons
          </Heading>
          <Accordion allowMultiple>
            {data.seasons.map(season => (
              <AccordionItem key={season.id}>
                <AccordionButton onClick={() => loadSeasonEpisodes(season)}>
                  <Box flex='1' textAlign='left'>
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
                        <EpisodeItem episode={ep} key={ep.id} />
                      ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Container>
    </Container>
  )
}

export default Movie
