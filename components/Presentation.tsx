import { Divider, Flex, Link, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'

// import { Container } from './styles';

const Presentation: React.FC = () => {
  return (
    <Flex>
      <Text fontSize={['3xl', '6xl']} maxW='xl'>
        Seja Muito Bem Vindo ao My Serie List (MSL)!
      </Text>
      <Spacer />
      <VStack spacing={4} maxW='md'>
        <Text fontSize={['sm', 'md']} textAlign='justify'>
          MSL é um serviço que utiliza a api do{' '}
          <Link href='https://www.themoviedb.org/'>The Movie DB</Link> para
          listar os seriados mais populares e manter o controle sobre os
          episódios já assistidos.
          <Divider my={2} />
          Para usar é simples, basta buscar o seriado na lista abaixo com a
          ajuda de nossos filtros e então marcar os episódios vistos, o
          histórico será mantido junto ao seu navegador, então lembre-se de
          exportá-lo caso deseje salvar o progresso antes de formatar o
          computador ou trocar de navegador
        </Text>
      </VStack>
    </Flex>)
}

export default Presentation
