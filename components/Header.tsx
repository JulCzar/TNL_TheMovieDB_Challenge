import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import { FiMenu } from 'react-icons/fi'

const Header: React.FC = () => {
  return (
    <Flex p={[3, 10]} as='header'>
      <Heading mr={[2, 20]}>My Serie List</Heading>
      <Spacer />
      <Box ml={[2, 4]}>
        <Button>
          <FiMenu />
        </Button>
      </Box>
    </Flex>
  )
}

export default Header
