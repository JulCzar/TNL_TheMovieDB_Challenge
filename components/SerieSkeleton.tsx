import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const SerieSkeleton: React.FC = () => {
  return (
    <Box borderRadius='md' pos='relative' overflow='hidden'>
      <Skeleton w={224} h={336} />
      <Box
        pos='absolute'
        bottom={0}
        background='#0008'
        bgGradient='linear(to-b, transparent 40%, #fff8)'
        zIndex={1}
        w='100%'
        p={4}>
        <SkeletonText noOfLines={5} />
      </Box>
    </Box>
  )
}

export default SerieSkeleton
