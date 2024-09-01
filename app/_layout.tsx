import 'expo-dev-client'
import { ThemeProvider as NavProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import styled, { ThemeProvider, type DefaultTheme } from 'styled-components/native'
import { appTheme, navTheme } from 'src/config/theme'
import { SessionProvider, useSession } from './ctx'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { setupAxiosInterceptors } from 'src/utils/axiosSetup'

import './global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'login'
}

SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  const [loaded, error] = useFonts({ helvetica: require('src/assets/fonts/helvetica.otf') })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootAppLayout />
}

function AxiosInterceptorSetup({ children }: { children: React.ReactNode }) {
  const { refreshAccessToken, signOut, accessToken } = useSession()

  useEffect(() => {
    setupAxiosInterceptors(refreshAccessToken, signOut, () => accessToken)
  }, [refreshAccessToken, signOut, accessToken])

  return <>{children}</>
}

function RootAppLayout() {
  return (
    <RootSiblingParent>
      <ThemeProvider theme={appTheme as DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <S.AppWrapper>
            <SessionProvider>
              <AxiosInterceptorSetup>
                <NavProvider value={navTheme}>
                  <Slot screenOptions={{ headerShown: false }} />
                </NavProvider>
              </AxiosInterceptorSetup>
            </SessionProvider>
          </S.AppWrapper>
        </QueryClientProvider>
      </ThemeProvider>
    </RootSiblingParent>
  )
}

const S = {
  AppWrapper: styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    background-color: ${appTheme.background};
  `
}
