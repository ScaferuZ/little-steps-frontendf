import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import Navbar from 'src/components/Navbar'
import ScreenLayout from 'src/components/ScreenLayout'

export default function CreateArticle() {
  return (
    <ScreenLayout>
      <View className="bg-lightPink px-6">
        <Navbar title="Create Article" />
      </View>
    </ScreenLayout>
  )
}
