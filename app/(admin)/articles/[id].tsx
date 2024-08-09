import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Navbar from 'src/components/Navbar'
import { useAllArticles } from 'src/services/Articles/Articles.url'
import EditArticleForm from 'src/components/forms/CreateArticleForm/EditArticleForm'

export default function EditArticle() {
  // const { id } = useLocalSearchParams()
  // const router = useRouter()
  // const [article, setArticle] = useState<Article | null>(null)
  // const { data, isLoading, error } = useAllArticles()

  // useEffect(() => {
  //   if (data && data.data) {
  //     const foundArticle = data.data.find((a) => a.id === id)
  //     if (foundArticle) {
  //       setArticle(foundArticle)
  //     }
  //   }
  // }, [id, data])

  // const handleSave = () => {
  //   console.log('Saving article:', article)
  //   // Here you would typically call an API to update the article
  //   router.push('/articles')
  // }

  // if (isLoading) return <Text className="p-4">Loading...</Text>
  // if (error)
  //   return <Text className="p-4 text-red-500">An error occurred: {(error as Error).message}</Text>
  // if (!article) return <Text className="p-4 text-red-500">Article not found</Text>

  return (
    <ScrollView className="flex-1 p-4">
      <Navbar title="Edit Article" />
      <View className="h-4" />
      <EditArticleForm />
    </ScrollView>
  )
}
