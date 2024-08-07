import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import Navbar from 'src/components/Navbar'
import ScreenLayout from 'src/components/ScreenLayout'
import CreateArticleForm from 'src/components/forms/CreateArticleForm/CreateArticleForm'

export default function CreateArticle() {
  return (
    <ScreenLayout>
      <View className=" px-6">
        <Navbar title="Create Article" />
        <View className="h-4" />
        <CreateArticleForm />
      </View>
    </ScreenLayout>
  )
}
