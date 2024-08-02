import { View, Text, Pressable, ScrollView, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import NavWithSearch from 'src/components/NavWithSearch'
import ScreenLayout from 'src/components/ScreenLayout'
import ArtikelPreview from 'src/components/ArtikelPreview'

const data = [
  {
    title: 'Kenali Gejala dan Penyebab Penyakit Jantung Koroner',
    date: 2,
    description:
      'Penyakit jantung koroner merupakan penyakit yang disebabkan oleh adanya penyumbatan pada pembuluh darah jantung. Penyakit ini dapat menyerang siapa saja, baik pria maupun wanita.'
  },
  {
    title: 'Kenali Gejala dan Penyebab Penyakit Jantung Koroner',
    date: 2,
    description:
      'Penyakit jantung koroner merupakan penyakit yang disebabkan oleh adanya penyumbatan pada pembuluh darah jantung. Penyakit ini dapat menyerang siapa saja, baik pria maupun wanita.'
  },
  {
    title: 'Kenali Gejala dan Penyebab Penyakit Jantung Koroner',
    date: 2,
    description:
      'Penyakit jantung koroner merupakan penyakit yang disebabkan oleh adanya penyumbatan pada pembuluh darah jantung. Penyakit ini dapat menyerang siapa saja,'
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

const ArtikelSeparator = () => {
  return <View className="h-4"></View>
}

const Artikel = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StickyHeader />
      <FlatList
        contentContainerStyle={{ paddingTop: 160 }} // Adjust this value based on your header height
        ItemSeparatorComponent={ArtikelSeparator}
        data={data}
        renderItem={({ item }) => <ArtikelPreview {...item} />}
      />
    </SafeAreaView>
  )
}

export default Artikel
