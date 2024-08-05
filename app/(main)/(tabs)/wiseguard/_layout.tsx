import { useSession } from 'app/ctx'
import { Redirect, Stack } from 'expo-router'
import Spinner from 'src/components/Spinner'

export default function AppLayout() {
  const { user, accessToken, isLoading } = useSession()

  if (isLoading) {
    return <Spinner />
  }

  if (!user || !accessToken) {
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="artikel" options={{ headerShown: false }} />
      <Stack.Screen name="video" options={{ headerShown: false }} />
    </Stack>
  )
}
