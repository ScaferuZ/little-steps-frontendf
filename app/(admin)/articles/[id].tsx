import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Navbar from 'src/components/Navbar'
import { useAllArticles } from 'src/services/Articles/Articles.url'

export default function EditArticle() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const { data, isLoading, error } = useAllArticles()

  useEffect(() => {
    if (data && data.data) {
      const foundArticle = data.data.find((a) => a.id === id)
      if (foundArticle) {
        setArticle(foundArticle)
      }
    }
  }, [id, data])

  const handleSave = () => {
    console.log('Saving article:', article)
    // Here you would typically call an API to update the article
    router.push('/articles')
  }

  if (isLoading) return <Text className="p-4">Loading...</Text>
  if (error)
    return <Text className="p-4 text-red-500">An error occurred: {(error as Error).message}</Text>
  if (!article) return <Text className="p-4 text-red-500">Article not found</Text>

  return (
    <ScrollView className="flex-1 p-4 bg-lightPink">
      <Navbar title="Edit Article" />
      <View className="h-4" />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={article.title}
        onChangeText={(text) => setArticle({ ...article, title: text })}
        placeholder="Title"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={article.content}
        onChangeText={(text) => setArticle({ ...article, content: text })}
        placeholder="Content"
        multiline
        textAlignVertical="top"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={article.category}
        onChangeText={(text) => setArticle({ ...article, category: text })}
        placeholder="Category"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={article.thumbnailUri || ''}
        onChangeText={(text) => setArticle({ ...article, thumbnailUri: text })}
        placeholder="Thumbnail URI"
      />
      <Pressable className="bg-green-500 p-3 rounded" onPress={handleSave}>
        <Text className="text-white text-center font-bold">Save Changes</Text>
      </Pressable>
    </ScrollView>
  )
}
