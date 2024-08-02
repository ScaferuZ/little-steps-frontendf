import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, FlatList } from 'react-native'
import React from 'react'
import ScreenLayout from 'src/components/ScreenLayout'
import NavWithSearch from 'src/components/NavWithSearch'
import ArtikelPreview from 'src/components/ArtikelPreview'
import VideoPreview from 'src/components/VideoPreview'
import { Link } from 'expo-router'

const dataVideo = [
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

const WiseGuardHeader = () => {
  return (
    <View>
      <View className="bg-lightPink pt-8 pb-4 rounded-b-[20px]">
        <View className="flex flex-col items-center justify-center mx-6 mb-44">
          <NavWithSearch placeholder="Cari artikel atau video..." />
          <View className="flex flex-row items-center justify-between mt-8 w-full">
            <Text className="text-lg font-semibold text-darkBlue">Artikel Terbaru</Text>
            <Link asChild href="/wiseguard/artikel">
              <Pressable>
                <Text className="text-xs font-semibold text-darkBlue">Lihat Lainnya</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
      <View className="-mt-40">
        <ArtikelPreview
          title="Games Mengasah Otak Anak? Emang Ada?"
          description="Dalam kehidupan sehari-hari, kita sering kali tidak menyadari betapa pentingnya kesehatan mental bagi ibu hamil untuk kesehatan janin anak..."
          date={17}
        />
        <View className="flex flex-row items-center justify-between mt-8 mx-6 mb-3">
          <Text className="text-lg font-semibold text-darkBlue">Video Terbaru</Text>
          <Link asChild href="/wiseguard/video">
            <Pressable>
              <Text className="text-xs font-semibold text-darkBlue">Lihat Lainnya</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  )
}

const VideoSeparator = () => {
  return <View className="w-4"></View>
}

const WiseGuardScreen = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <WiseGuardHeader />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={VideoSeparator}
          data={dataVideo}
          renderItem={({ item }) => <VideoPreview {...item} />}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 5 }}
        />
      </ScrollView>
    </ScreenLayout>
  )
}

export default WiseGuardScreen
