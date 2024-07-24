import { dimensions, height, width } from 'src/utils/dimensions'

/**
 * Theme For Styled Components
 * -
 */
export const appTheme = {
  background: '#FAFAFA',
  black: '#121212',
  primary: '#E6407B',
  secondary: '#CCC',
  highlight: '#FF2353',
  grey: '#605B57',
  size: dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`
}

/**
 * Theme For Expo Navigation Header
 * -
 */
export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.secondary,
    card: appTheme.background,
    notification: appTheme.highlight,
    primary: appTheme.primary,
    text: appTheme.black
  }
}
