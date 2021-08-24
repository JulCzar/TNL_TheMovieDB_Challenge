import { Box, Flex, Text } from '@chakra-ui/layout'
import NextLink from 'next/link'
import { Image } from '@chakra-ui/react'
import React from 'react'
import { GiTomato } from 'react-icons/gi'
import { SerieInfo } from '../models'

interface SerieCardProps {
  serie: SerieInfo
  genres: string[]
}

const accessibleSelection = {
  cursor: 'pointer',
  shadow: '2xl',
  transform: 'scale(1.01)',
}

const SerieCard: React.FC<SerieCardProps> = ({ serie, genres }) => (
  <NextLink href={`/serie/${serie.id}`}>
    <Box
      shadow='md'
      tabIndex={0}
      overflow='hidden'
      borderRadius='md'
      transition='300ms'
      position='relative'
      _focus={accessibleSelection}
      _hover={accessibleSelection}>
      <Image
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${serie.poster_path}`}
        loading='lazy'
        width='3xs'
        alt=''
      />
      <Box
        p={4}
        h={140}
        bottom={0}
        width='100%'
        position='absolute'
        backgroundSize='cover'
        backgroundPosition='bottom'
        backgroundRepeat='no-repeat'
        backdropFilter='blur(10px) brightness(0.4)'
        bgGradient='radial(transparent, #fff2)'>
        <Flex>
          <Text color='fontColor.500'>
            {serie.origin_country},{' '}
            <Text as='span' fontWeight='bold' color='yellow.400'>
              {new Date(serie.first_air_date).getFullYear()}
            </Text>
          </Text>
        </Flex>
        <Text
          color='fontColor.600'
          fontSize='xl'
          fontWeight='900'
          noOfLines={1}>
          {serie.name}
        </Text>
        <Flex color='fontColor.500'>
          <GiTomato color='#e30c0d' size={20} /> {serie.vote_average * 10}%
        </Flex>
        <Box
          color='fontColor.400'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'>
          {genres.filter(i => i !== '').join(', ')}
        </Box>
      </Box>
    </Box>
  </NextLink>
)

export default SerieCard
