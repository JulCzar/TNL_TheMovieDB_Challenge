import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React from 'react'
import { GiTomato } from 'react-icons/gi'
import { SerieInfo } from '../models'

interface SerieCardProps {
  serie: SerieInfo,
  genres: string[]
}

const SerieCard: React.FC<SerieCardProps> = ({ serie, genres }) => (
  <Box borderRadius='md' position='relative' overflow='hidden'>
    <Image
      src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${serie.poster_path}`}
      loading='lazy'
      width='3xs'
      alt=''
    />
    <Box position='absolute' bottom={0} background='#fffb' width='100%' p={5}>
      <Flex>
        <Text>
          {serie.origin_country},{' '}
          <Text as='span' fontWeight='bold' color='yellow.400'>
            {new Date(serie.first_air_date).getFullYear()}
          </Text>
        </Text>
      </Flex>
      <Text fontSize='xl' fontWeight='900'>
        {serie.name}
      </Text>
      <Flex>
        <GiTomato color='#e30c0d' size={20} /> {serie.vote_average*10}%
      </Flex>
      <Box overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
        {genres.filter(i => i !== '').join(', ')}
      </Box>
    </Box>
  </Box>
)

export default SerieCard
