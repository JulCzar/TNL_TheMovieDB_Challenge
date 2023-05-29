import {
  Box,
  Container,
  Divider,
  Flex,
  IconButton,
  Skeleton,
  SkeletonText,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { FiHeart } from 'react-icons/fi'
import Template from '../styles/template'
import Footer from './Footer'
import Header from './Header'

const SerieDetailSkeleton: React.FC = () => {
  return (
    <Template>
      <Box p={0} overflow='hidden' borderRadius='md'>
        <Box
          p={[0, 0, 1, 2, 4, 6]}
          background='#0008'
          backdropFilter='blur(10px)'>
          <Flex wrap='wrap' justify={['center', 'auto']}>
            <Skeleton alt='' w='100%' maxW='300px' h={450} borderRadius='md' />
            <Flex
              pt={8}
              gridGap={4}
              p={[2, 4, 6, 8]}
              direction='column'
              w={['100%', '3xl']}>
              <SkeletonText
                w={400}
                noOfLines={1}
                fontSize='4xl'
                color='fontColor.600'
              />
              <SkeletonText noOfLines={1} w={150} />
              <Divider my={6} />
              <SkeletonText w={50} noOfLines={1} />
              <SkeletonText w={250} noOfLines={1} />
              <SkeletonText w={50} noOfLines={1} />
              <SkeletonText noOfLines={6} mt={4} />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box mt={4}>
        <Skeleton w={100} h={10} />
        <Skeleton h={10} mt={1} />
        <Skeleton h={10} mt={1} />
        <Skeleton h={10} mt={1} />
      </Box>
    </Template>
  )
}

export default SerieDetailSkeleton
