import { Box, Button, Container, Flex, Heading, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FiMenu } from 'react-icons/fi'

const Header: React.FC = () => {
  return (
    <Flex py={[3, 10]} as='header'>
      <Container maxW='container.xl'>
        <Flex>
          <Heading mr={[2, 20]}>
            <Link href='/'>My Serie List</Link>
          </Heading>
          <Spacer />
          <Box ml={[2, 4]}>
            <Button>
              <FiMenu />
            </Button>
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Header
