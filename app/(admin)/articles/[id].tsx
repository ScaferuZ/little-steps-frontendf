import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { dummyArticles, Article } from '../constant'
import Navbar from 'src/components/Navbar'

export default function EditArticle() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const foundArticle = dummyArticles.find((a) => a.id === id)
    if (foundArticle) {
      setArticle(foundArticle)
    }
  }, [id])

  const handleSave = () => {
    console.log('Saving article:', article)
    router.push('/articles')
  }

  if (!article) {
    return <Text className="p-4 text-red-500">Article not found</Text>
  }

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
        value={article.author}
        onChangeText={(text) => setArticle({ ...article, author: text })}
        placeholder="Author"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={article.publishDate}
        onChangeText={(text) => setArticle({ ...article, publishDate: text })}
        placeholder="Publish Date"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4 h-40"
        value={article.content}
        onChangeText={(text) => setArticle({ ...article, content: text })}
        placeholder="Content"
        multiline
        textAlignVertical="top"
      />
      <Pressable className="bg-green-500 p-3 rounded" onPress={handleSave}>
        <Text className="text-white text-center font-bold">Save Changes</Text>
      </Pressable>
    </ScrollView>
  )
}
