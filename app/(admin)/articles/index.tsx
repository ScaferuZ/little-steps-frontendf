import React from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { dummyArticles, Article } from '../constant'
import Navbar from 'src/components/Navbar'

const ArticleItem = ({ item }: { item: Article }) => (
  <Link href={`/articles/${item.id}`} asChild>
    <Pressable className="bg-white p-4 mb-2 rounded-lg shadow">
      <Text className="text-lg font-bold mb-1">{item.title}</Text>
      <Text className="text-sm text-gray-600 mb-1">
        By {item.author} on {item.publishDate}
      </Text>
      <Text className="text-base text-gray-800" numberOfLines={2}>
        {item.content}
      </Text>
    </Pressable>
  </Link>
)

export default function ArticlesManagement() {
  return (
    <View className="flex-1 p-4 bg-lightPink">
      <Navbar title="Article" />
      <View className="h-4" />
      <Link href="/articles/create" asChild>
        <Pressable className="bg-green-500 p-3 rounded mb-4">
          <Text className="text-white text-center font-bold">Create New Article</Text>
        </Pressable>
      </Link>
      <FlatList
        data={dummyArticles}
        renderItem={({ item }) => <ArticleItem item={item} />}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
    </View>
  )
}
