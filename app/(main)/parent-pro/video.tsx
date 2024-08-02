import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'
import React from 'react'
import NavWithSearch from 'src/components/NavWithSearch'
import ScreenLayout from 'src/components/ScreenLayout'
import ArtikelPreview from 'src/components/ArtikelPreview'
import VideoPreview from 'src/components/VideoPreview'
import { SafeAreaView } from 'react-native-safe-area-context'

const data = [
  {
    title: 'Tips Parenting Ibu Untuk Anak (Jaman Sekarang Sama Dulu Beda?)',
    duration: '5h 20m',
    comment: 20
  },
  {
    title: 'Tips Parenting Ibu Untuk Anak (Jaman Sekarang Sama Dulu Beda?)',
    duration: '5h 20m',
    comment: 20
  },
  {
    title: 'Tips Parenting Ibu Untuk Anak (Jaman Sekarang Sama Dulu Beda?)',
    duration: '5h 20m',
    comment: 20
  }
]

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

const VideoSeparator = () => {
  return <View className="h-4"></View>
}

const Video = () => {
  return (
    <SafeAreaView>
      <StickyHeader />
      <FlatList
        ItemSeparatorComponent={VideoSeparator}
        data={data}
        renderItem={({ item }) => <VideoPreview className="w-full" {...item} />}
        contentContainerStyle={{ marginHorizontal: 24, paddingTop: 160 }}
      />
    </SafeAreaView>
  )
}

export default Video
