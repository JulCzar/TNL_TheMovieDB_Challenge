import React from 'react'
import {
  Drawer as DrawerCk,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { FaCog, FaHeart } from 'react-icons/fa'
import List from './List'
import ListItem from './ListItem'
import { FiDownload, FiUpload } from 'react-icons/fi'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  return (
    <DrawerCk isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <List>
            <ListItem title='Favoritos' icon={<FaHeart />} spacing={4} />
            <ListItem
              title='Importar Configurações'
              icon={<FiUpload />}
              spacing={4}
            />
            <ListItem
              title='Exportar Configurações'
              icon={<FiDownload />}
              spacing={4}
            />
          </List>
        </DrawerBody>
      </DrawerContent>
    </DrawerCk>
  )
}

export default Drawer