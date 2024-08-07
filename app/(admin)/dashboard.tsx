import React from 'react'
import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import ScreenLayout from 'src/components/ScreenLayout'
import Button from 'src/components/Button'
import Navbar from 'src/components/Navbar'

export default function AdminDashboard() {
  return (
    <ScreenLayout>
      <View className="bg-lightPink px-6 flex-col gap-3 h-full">
        <Navbar title="Admin Dashboard" />
        <Link href="/articles" asChild>
          <Button className="mt-4" variant="secondary">
            Manage Articles
          </Button>
        </Link>
        <Link href="/videos" asChild>
          <Button variant="secondary">Manage Videos</Button>
        </Link>
      </View>
    </ScreenLayout>
  )
}
