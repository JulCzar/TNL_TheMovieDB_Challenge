import { Box, Checkbox, CheckboxProps, Text } from '@chakra-ui/react'
import React from 'react'
import { Episode } from '../models'

interface EpisodeItemProps extends CheckboxProps {
  episode: Episode
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode, ...rest }) => {
  return (
    <Box py={4} borderTopWidth='1px' borderTopColor='#0003'>
      <Checkbox {...rest} spacing={7}>
        <Text>
          {episode.episode_number} - {episode.name}
        </Text>
        <Text noOfLines={1}>{episode.overview}</Text>
      </Checkbox>
    </Box>
  )
}

export default EpisodeItem
