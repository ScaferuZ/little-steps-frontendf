import { View, Text, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'
import ScreenLayout from 'src/components/ScreenLayout'
import NavWithSearch from 'src/components/NavWithSearch'
import ArtikelPreview from 'src/components/ArtikelPreview'
import VideoPreview from 'src/components/VideoPreview'
import { Link } from 'expo-router'

const ParentProTips = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <View className="bg-lightPink pt-8 pb-4 rounded-b-[20px] -mb-40">
          <View className="flex flex-col items-center justify-center mx-6 mb-44">
            <NavWithSearch placeholder="Cari artikel atau video..." />
            <View className="flex flex-row items-center justify-between mt-8 w-full">
              <Text className="text-lg font-semibold text-darkBlue">Artikel Terbaru</Text>
              <Link asChild href="/parent-pro/artikel">
                <Pressable>
                  <Text className="text-xs font-semibold text-darkBlue">Lihat Lainnya</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
        <ArtikelPreview
          title="Games Mengasah Otak Anak? Emang Ada?"
          description="Dalam kehidupan sehari-hari, kita sering kali tidak menyadari betapa pentingnya kesehatan mental bagi ibu hamil untuk kesehatan janin anak..."
          date={17}
        />
        <View className="flex flex-row items-center justify-between mt-8 mx-6">
          <Text className="text-lg font-semibold text-darkBlue">Video Terbaru</Text>
          <Link asChild href="/parent-pro/video">
            <Pressable>
              <Text className="text-xs font-semibold text-darkBlue">Lihat Lainnya</Text>
            </Pressable>
          </Link>
        </View>
        <ScrollView horizontal className="mx-6 mt-6">
          <VideoPreview className="mr-4" />
          <VideoPreview className="mr-4" />
          <VideoPreview />
        </ScrollView>
      </ScrollView>
    </ScreenLayout>
  )
}

export default ParentProTips
