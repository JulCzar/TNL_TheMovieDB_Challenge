import { Accordion } from '@chakra-ui/react'
import React from 'react'

const List: React.FC = ({ children }) => {
  return <Accordion>{children}</Accordion>
}

export default List
