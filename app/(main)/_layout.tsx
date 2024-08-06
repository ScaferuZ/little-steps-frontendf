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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="notifikasi" options={{ headerShown: false }} />
      <Stack.Screen name="nutriwise" options={{ headerShown: false }} />
      <Stack.Screen name="nutriwiseDashboard" options={{ headerShown: false }} />
      <Stack.Screen name="parent-pro" options={{ headerShown: false }} />
      <Stack.Screen name="diamond/index" options={{ headerShown: false }} />
    </Stack>
  )
}
