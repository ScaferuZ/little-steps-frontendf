import { router } from 'expo-router'
import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { useStorageState } from 'src/hooks/useStorageState'

const AuthContext = createContext<{
  signIn: (data: LoginResponseData) => void
  signOut: () => void
  accessToken?: string | null
  refreshToken?: string | null
  user: User | null
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false
})

export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [accessTokenState, setAccessToken] = useStorageState('accessToken')
  const [refreshTokenState, setRefreshToken] = useStorageState('refreshToken')
  const [userState, setUser] = useStorageState('user')
  const isLoading = accessTokenState[0] || refreshTokenState[0] || userState[0]

  const signIn = async (data: LoginResponseData) => {
    await setAccessToken(data.access)
    await setRefreshToken(data.refresh)
    await setUser(
      JSON.stringify({
        email: data.email,
        id: data.id
      })
    )
  }

  const signOut = async () => {
    try {
      await setAccessToken(null)
      await setRefreshToken(null)
      await setUser(null)
    } catch {
      console.error('Failed to sign out')
    }
  }

  useEffect(() => {
    if (accessTokenState[1] && userState[1]) {
      router.replace('/') // Redirect to home if tokens and roles are set
    }
  }, [isLoading, accessTokenState, userState])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        accessToken: accessTokenState[1],
        refreshToken: refreshTokenState[1],
        user: userState[1] ? JSON.parse(userState[1]) : null,
        isLoading
      }}>
      {children}
    </AuthContext.Provider>
  )
}
