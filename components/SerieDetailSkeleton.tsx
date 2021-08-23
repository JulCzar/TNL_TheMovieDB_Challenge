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
import Footer from './Footer'
import Header from './Header'

const SerieDetailSkeleton: React.FC = () => {
  return (
    <Container maxW='none'>
      <Header />
      <Container maxW='container.xl'>
        <Box borderRadius='md' overflow='hidden'>
          <Box p={6} background='#0008' backdropFilter='blur(10px)'>
            <Flex>
              <Skeleton alt='' w={300} h={450} borderRadius='md' />
              <Flex direction='column' gridGap={2} p={6}>
                <SkeletonText noOfLines={1} w={400} />
                <SkeletonText noOfLines={1} w={150} />
                <Divider my={6} />
                <SkeletonText w={50} noOfLines={1} />
                <SkeletonText w={250} noOfLines={1} />
                <SkeletonText w={50} noOfLines={1} />
                <SkeletonText noOfLines={6} mt={4} />
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
        <Flex direction='column' gridGap={2} mt={10} mb={4}>
          <Skeleton w={100} h={10} />
          <Skeleton h={10} mt={1} />
          <Skeleton h={10} mt={1} />
          <Skeleton h={10} mt={1} />
        </Flex>
      </Container>
      <Footer />
    </Container>
  )
}

export default SerieDetailSkeleton
