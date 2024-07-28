import { useSession } from 'app/ctx'
import { Redirect, Stack } from 'expo-router'
import Spinner from 'src/components/Spinner'

export default function AppLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return <Spinner />
  }

  if (!session) {
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="notifikasi" options={{ headerShown: false }} />
      <Stack.Screen name="nutriwise" options={{ headerShown: false }} />
    </Stack>
  )
}
