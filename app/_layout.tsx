import 'expo-dev-client'
import { ThemeProvider as NavProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import styled, { ThemeProvider, type DefaultTheme } from 'styled-components/native'
import { appTheme, navTheme } from 'src/config/theme'
import { SessionProvider } from './ctx'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on any route keeps a back button present
  initialRouteName: 'login'
}

// SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  return (
    <ThemeProvider theme={appTheme as DefaultTheme}>
      <StatusBar style="light" />
      <S.AppWrapper>
        <SessionProvider>
          <NavProvider value={navTheme}>
            <Slot screenOptions={{ headerShown: false }} />
          </NavProvider>
        </SessionProvider>
      </S.AppWrapper>
    </ThemeProvider>
  )
}

const S = {
  AppWrapper: styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    background-color: ${appTheme.background};
  `
}
