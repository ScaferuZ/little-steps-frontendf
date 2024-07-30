import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'
import React from 'react'
import NavWithSearch from 'src/components/NavWithSearch'
import ScreenLayout from 'src/components/ScreenLayout'
import ArtikelPreview from 'src/components/ArtikelPreview'
import VideoPreview from 'src/components/VideoPreview'

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

const VideoHeader = () => {
  return (
    <View className="bg-lightPink pt-8 pb-4 rounded-b-[20px] -mb-40">
      <View className="flex flex-col mx-6 mb-44">
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
    </View>
  )
}

const VideoSeparator = () => {
  return <View className="h-4"></View>
}

const Video = () => {
  return (
    <ScreenLayout>
      {/* TODO: find a workaround to not use ScrollView */}
      <ScrollView>
        <VideoHeader />
        <FlatList
          ItemSeparatorComponent={VideoSeparator}
          data={data}
          renderItem={({ item }) => <VideoPreview className="w-full" {...item} />}
          contentContainerStyle={{ marginHorizontal: 24 }}
        />
      </ScrollView>
    </ScreenLayout>
  )
}

export default Video
