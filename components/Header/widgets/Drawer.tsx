import React from 'react'
import {
  Drawer as DrawerCk,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  toast,
  useToast,
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import List from './List'
import ListItem from './ListItem'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { useRouter } from 'next/router'
import {
  exportUserData,
  importUserData,
} from '../../../services/manageUserData'
import FileUpload from '../../FileUpload'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const toast = useToast()

  const handleFileUpload = async (file: File) => {
    try {
      await importUserData(file)

      toast({
        title: 'Configurações importadas com sucesso!',
      })
    } catch (e) {
      toast({
        title:
          'Não foi possível importar as configurações, verifique o arquivo e tente novamente!',
        status: 'warning',
      })
    } finally {
      onClose()
    }
  }

  const navigateTo = (route: string) => () => router.push(route)
  return (
    <DrawerCk isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <List>
            <ListItem
              title='Favoritos'
              icon={<FaHeart />}
              spacing={4}
              onClick={navigateTo('/liked')}
            />
            <ListItem title='Importar Dados' icon={<FiUpload />} spacing={4}>
              <FileUpload
                helperText='Seus Favoritos e assistidos atuais serão perdidos!'
                onUpload={handleFileUpload}
                placeholder='Selecione o arquivo'
                acceptedFileTypes='application/json'
              />
            </ListItem>
            <ListItem
              onClick={exportUserData}
              title='Exportar Dados'
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
