import {
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React, { ChangeEventHandler, useRef, useState } from 'react'
import { useCallback } from 'react'
import { FiFile } from 'react-icons/fi'

interface FileUploadProps {
  name?: string
  placeholder?: string
  acceptedFileTypes?: string
  label?: string
  required?: boolean
  onUpload?: (f: File) => void
  helperText?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  placeholder,
  required = false,
  acceptedFileTypes,
  helperText,
  onUpload,
}) => {
  const [selected, setSelected] = useState<File | null>(null)
  const inputRef = useRef<any>()

  const handleUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    evt => {
      const files = evt?.target?.files

      if (!files) return

      const file = files.item(0)
      if (!file) return

      if (onUpload) onUpload(file)
      setSelected(file)
    },
    [onUpload]
  )

  return (
    <FormControl isRequired={required}>
      <FormLabel htmlFor='writeUpFile'>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={FiFile} />
        </InputLeftElement>
        <input
          type='file'
          name={name}
          ref={inputRef}
          multiple={false}
          onChange={handleUpload}
          accept={acceptedFileTypes}
          style={{ display: 'none' }}></input>
        <Input
          placeholder={placeholder || 'Your file ...'}
          onClick={() => inputRef.current.click()}
          value={selected ? selected.name : ''}
          readOnly
        />
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default FileUpload
