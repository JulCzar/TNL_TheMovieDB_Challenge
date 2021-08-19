import { Spinner } from '@chakra-ui/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Spinner
        thickness='4px'
        speed='1s'
        emptyColor='gray.400'
        color='blue.500'
        size='xl'
      />
    </div>
  )
}

export default Home
