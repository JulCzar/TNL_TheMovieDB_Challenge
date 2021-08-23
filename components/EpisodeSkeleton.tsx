import { Box, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const EpisodeSkeleton: React.FC = () => {
  return (
    <Box my={4}>
      <SkeletonText noOfLines={3} spacing='2' />
    </Box>
  )
}

export default EpisodeSkeleton
