import { Container } from '@chakra-ui/react'
import React from 'react'
import { Footer, Header } from '../components'

interface TemplateProps {
  containerRef?: React.LegacyRef<HTMLDivElement>
}

const Template: React.FC<TemplateProps> = ({
  children,
  containerRef,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      ref={containerRef}
      bgColor={'background'}
      maxW='none'
      minH='100vh'
      p={[0, 0, 2, 4, 6, 8]}>
      <Header />
      {/* Content Container */}
      <Container maxW='container.xl' p={[1, 2, 4, 6]}>
        {children}
      </Container>

      <Footer />
    </Container>
  )
}

export default Template
