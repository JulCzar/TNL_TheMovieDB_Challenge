import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import Drawer from './widgets/Drawer'

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex py={[3, 10]} as='header'>
        <Container maxW='container.xl'>
          <Flex>
            <Heading mr={[2, 20]}>
              <Link href='/'>My Serie List</Link>
            </Heading>
            <Spacer />
            <Box ml={[2, 4]}>
              <Button colorScheme='teal' onClick={onOpen}>
                <FiMenu />
              </Button>
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
