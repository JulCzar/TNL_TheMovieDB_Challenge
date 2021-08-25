import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const SerieSkeleton: React.FC = () => {
  return (
    <Flex justify='center'>
      <Box borderRadius='md' pos='relative' overflow='hidden'>
        <Skeleton w={224} h={336} />
        <Box
          pos='absolute'
          bottom={0}
          background='#0008'
          bgGradient='radial(transparent, #fff4)'
          zIndex={1}
          w='100%'
          p={4}>
          <SkeletonText noOfLines={5} />
        </Box>
      </Box>
    </Flex>
  )
}

export default SerieSkeleton
