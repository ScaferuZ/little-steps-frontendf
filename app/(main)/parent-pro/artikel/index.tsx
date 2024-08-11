import { View, Text, Pressable, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import NavWithSearch from 'src/components/NavWithSearch'
import ScreenLayout from 'src/components/ScreenLayout'
import ArtikelPreview from 'src/components/ArtikelPreview'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAllArticles } from 'src/services/Articles/Articles.url'
import { router } from 'expo-router'

const StickyHeader = () => {
  return (
    <View className="bg-lightPink pt-2 pb-4 px-4 absolute top-0 left-0 right-0 z-10">
      <NavWithSearch placeholder="Cari artikel" />
      <View className="flex flex-row justify-between mt-3">
        <Pressable className="bg-[#FFCBDC] px-4 py-3 rounded-lg">
          <Text className="text-primary font-medium">Popular</Text>
        </Pressable>
        <Pressable className="bg-white px-4 py-3 rounded-lg">
          <Text className="text-black font-medium">Rekomendasi</Text>
        </Pressable>
        <Pressable className="bg-white px-4 py-3 rounded-lg">
          <Text className="text-black font-medium">Artikel Terbaru</Text>
        </Pressable>
      </View>
    </View>
  )
}

const ArtikelSeparator = () => {
  return <View className="h-4"></View>
}

const Artikel = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAllArticles()

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />
  if (error) return <Text>Error: {error.message}</Text>

  const flattenedData = data?.pages.flatMap((page) => page.data) || []

  const renderFooter = () => {
    if (isFetchingNextPage) return <ActivityIndicator size="small" color="#0000ff" />
    return null
  }

  const loadMore = () => {
    if (hasNextPage) fetchNextPage()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StickyHeader />
      <FlatList
        data={flattenedData}
        renderItem={({ item }) => (
          <ArtikelPreview onPress={() => router.push(`/parent-pro/artikel/${item.id}`)} {...item} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ArtikelSeparator}
        contentContainerStyle={{ paddingTop: 160 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  )
}

export default Artikel
