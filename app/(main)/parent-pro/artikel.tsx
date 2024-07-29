import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import NavWithSearch from 'src/components/NavWithSearch'
import ScreenLayout from 'src/components/ScreenLayout'
import ArtikelPreview from 'src/components/ArtikelPreview'

const artikel = () => {
  return (
    <ScreenLayout>
      <ScrollView>
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
        <ArtikelPreview />
        <ArtikelPreview />
        <ArtikelPreview />
      </ScrollView>
    </ScreenLayout>
  )
}

export default artikel
