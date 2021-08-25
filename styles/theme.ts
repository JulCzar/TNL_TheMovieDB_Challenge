import { extendTheme } from '@chakra-ui/react'
import { colors } from '../constants/colors'

const theme = extendTheme({
  colors: {
    yellow: {
      50: colors['accent.50'],
      100: colors['accent.100'],
      200: colors['accent.200'],
      300: colors['accent.300'],
      400: colors['accent.400'],
      500: colors['accent.500'],
      600: colors['accent.600'],
      700: colors['accent.700'],
      800: colors['accent.800'],
      900: colors['accent.900'],
    },
    background: colors.background,
    fontColor: {
      400: colors['font.400'],
      500: colors['font.500'],
      600: colors['font.600'],
    },
  },
  colorScheme: {
    theme: colors.backgroundSecondary,
  },
})

export default theme
