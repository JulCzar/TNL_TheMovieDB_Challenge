import { Flex, Heading, Link, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'

// import { Container } from './styles';

const Presentation: React.FC = () => {
  return (
    <Flex wrap='wrap'>
      <Heading color='fontColor.600' fontSize={['3xl', '6xl']} w='lg'>
        Seja Bem Vindo ao{' '}
        <Text as='span' color='yellow.400'>
          My Serie List
        </Text>
        !
      </Heading>
      <Spacer />
      <VStack spacing={4} w={['100%', '100%', '100%', '100%', 'md']}>
        <Text color='fontColor.400' fontSize={['sm', 'md']} textAlign='justify'>
          My Serie List é um serviço que utiliza a api do{' '}
          <Link href='https://www.themoviedb.org/'>The Movie DB</Link> para
          listar os seriados mais populares e manter o controle sobre os
          episódios já assistidos.
          <br />
          Para usar é simples, basta buscar o seriado na lista abaixo com a
          ajuda de nossos filtros e então marcar os episódios vistos, o
          histórico será mantido junto ao seu navegador, então lembre-se de
          exportá-lo caso deseje salvar o progresso antes de formatar o
          computador ou trocar de navegador
        </Text>
      </VStack>
    </Flex>
  )
}

export default Presentation
