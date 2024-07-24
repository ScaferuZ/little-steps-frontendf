import { PropsWithChildren, createContext, useContext } from 'react'
import { useStorageState } from 'src/hooks/useStorageState'

const AuthContext = createContext<{
  signIn: () => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
})

// hook to access user info
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
  const [[isLoading, session], setSession] = useStorageState('session')

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setSession('123'),
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading
      }}>
      {children}
    </AuthContext.Provider>
  )
}
