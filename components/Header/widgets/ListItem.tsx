import {
  AccordionButton,
  AccordionButtonProps,
  AccordionItem,
  ResponsiveValue,
  Text,
} from '@chakra-ui/react'
import React from 'react'

interface ListItemProps extends AccordionButtonProps {
  title: string
  icon: React.ReactNode
  spacing?: any
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  icon,
  spacing,
  ...rest
}) => {
  return (
    <AccordionItem>
      <AccordionButton {...rest}>
        {icon}
        <Text ml={spacing}>{title}</Text>
      </AccordionButton>
    </AccordionItem>
  )
}

export default ListItem
