import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import Select from 'react-select'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import type { APISeriesResponse, Genre } from '../models'
import SerieCard from '../components/SerieCard'
import SerieSkeleton from '../components/SerieSkeleton'
import Header from '../components/Header'
import Presentation from '../components/Presentation'

const Home: NextPage = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [series, setSeries] = useState<APISeriesResponse | null>(null)

  useEffect(() => {
    axios.get('/api/genres').then(({ data }) => setGenres(data))
    axios.get('/api/popularToday').then(({ data }) => setSeries(data))
  }, [])

  return (
    <Container maxW='none' minH='100vh'>
      <Header />
      {/* Content Container */}
      <Container maxW='container.xl'>
        <Presentation />

        {/* Content Wrapper */}
        <Box>
          <Flex>
            <InputGroup mr={4}>
              <InputLeftElement>
                <FiSearch />
              </InputLeftElement>
              <Input placeholder='Digite o nome da serie' />
            </InputGroup>
            <Select
              isMulti
              options={genres}
              placeholder='Tags'
              hideSelectedOptions
              getOptionLabel={o => o.name}
              getOptionValue={o => o.id.toString()}
              styles={{
                container: provided => ({
                  ...provided,
                  width: 300,
                }),
              }}
            />
          </Flex>
          <Wrap spacing={8} mt={4}>
            {!series
              ? 's'
                  .repeat(20)
                  .split('')
                  .map((pre, i) => <SerieSkeleton key={pre + i} />)
              : series.results.map((serie, key) => (
                  <SerieCard
                    key={key}
                    serie={serie}
                    genres={serie.genre_ids.map(id => {
                      for (const genre of genres)
                        if (genre.id === id) return genre.name
                      return ''
                    })}
                  />
                ))}
          </Wrap>
        </Box>
      </Container>
    </Container>
  )
}

export default Home
