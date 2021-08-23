import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

interface InputWithIconProps extends InputProps {
  icon?: React.ReactNode
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon = <FiSearch />,
  ...rest
}) => {
  return (
    <InputGroup>
      <InputLeftElement>{icon}</InputLeftElement>
      <Input {...rest} />
    </InputGroup>
  )
}

export default InputWithIcon
