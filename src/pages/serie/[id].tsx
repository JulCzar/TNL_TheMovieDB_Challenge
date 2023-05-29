import type {
  Episode,
  EpisodeRequest,
  Genre,
  Season,
  SerieDetails,
} from '../../models';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Spacer,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Duration } from 'persistor-node';

import {
  EpisodeItem,
  EpisodeSkeleton,
  SerieDetailSkeleton,
} from '../../components';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import {
  episodeIsWatched,
  likeSerie,
  markEpisodeAsWatched,
  removeEpisodeFromWatchedList,
  serieIsLiked,
  unlikeSerie,
} from '../../services/serie';
import Template from '../../styles/template';
import { persistentStorage } from '../../services/persistentStorage';
import { storageKeys } from '../../constants/storageKeys';

const Movie: NextPage = () => {
  const [seasons, setSeason] = useState<{ [x: string]: Episode[] }>({});
  const [data, setData] = useState<SerieDetails | null>(null);
  const [isSerieLiked, setLiked] = useState(false);
  const toast = useToast();

  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    if (!id) return;

    axios
      .get<SerieDetails>(`/api/serie/${id}`)
      .then(({ data }) => setData(data))
      .catch(() =>
        toast({
          title: 'Não foi possível carregar a serie',
          status: 'warning',
        })
      );
  }, [id]); // eslint-disable-line

  useEffect(() => {
    if (!data) return;

    const isSerieLiked = serieIsLiked(data);

    setLiked(isSerieLiked);
  }, [data]);

  async function loadSeasonEpisodes(season: Season) {
    if (!!seasons[season.id]) return;

    axios
      .get<EpisodeRequest>(`/api/serie/${id}/episodes/${season.season_number}`)
      .then(({ data }) => {
        setSeason({ ...seasons, [season.id]: data.episodes });
      })
      .catch(console.warn);
  }

  function toggleLikedSerie() {
    if (!data) return;

    if (serieIsLiked(data)) {
      unlikeSerie(data);
      setLiked(false);
    } else {
      likeSerie(data);
      setLiked(true);
    }
  }

  function toggleEpisodeWatched(episode: Episode) {
    return () => {
      if (!data) return;

      if (episodeIsWatched(data, episode))
        removeEpisodeFromWatchedList(data, episode);
      else markEpisodeAsWatched(data, episode);
    };
  }

  const searchTag = (tag: Genre) => () => {
    persistentStorage.setItem(storageKeys.TAGS, [tag], {
      expireIn: new Duration({ minutes: 5 }),
    });

    route.push('/');
  };

  if (!data || ['error'].includes(data.status.toLowerCase()))
    return <SerieDetailSkeleton />;

  return (
    <Template>
      <Box
        p={0}
        overflow='hidden'
        borderRadius='md'
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
        backgroundImage={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`}>
        <Box
          p={[0, 0, 1, 2, 4, 6]}
          background='#0008'
          backdropFilter='blur(10px)'>
          <Flex wrap='wrap' justify={['center', 'auto']}>
            <Image
              alt=''
              w='100%'
              maxW='300px'
              loading='lazy'
              borderRadius='md'
              boxSize={['auto']}
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
            />
            <Flex direction='column' p={[1, 2, 4, 6]} w={['100%', '3xl']}>
              <Heading color='fontColor.600' fontSize='4xl'>
                {data.name} ({new Date(data.first_air_date).getFullYear()})
              </Heading>
              <Text color='fontColor.400'>{data.tagline}</Text>
              <Divider my={6} />
              <Text color='fontColor.600'>Tags</Text>
              <Flex wrap='wrap' gridGap={1}>
                {!data.genres.length && (
                  <Text color='fontColor.400' textAlign='justify'>
                    Não há
                  </Text>
                )}
                {data.genres.map(genre => (
                  <Tag
                    key={genre.id}
                    onClick={searchTag(genre)}
                    _hover={{ cursor: 'pointer' }}
                    colorScheme='yellow'>
                    {genre.name}
                  </Tag>
                ))}
              </Flex>
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
                <AccordionIcon color='fontColor.500' />
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
  );
};

export default Movie;
