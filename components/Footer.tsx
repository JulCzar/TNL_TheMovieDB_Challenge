import { Container, Link, Heading, Flex } from '@chakra-ui/react'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <Flex as='footer' borderTopWidth='1px' borderTopColor='#0003' mt={6}>
      <Container maxW='container.xl' p={10}>
        <Heading color='fontColor.500' fontSize='xl'>
          Um site desenvolvido por{' '}
          <Link href='https://github.com/JulCzar'>JulCzar</Link>
        </Heading>
      </Container>
    </Flex>
  )
}

export default Footer
