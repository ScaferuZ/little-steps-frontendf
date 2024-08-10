import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, FlatList } from 'react-native'
import React from 'react'
import ScreenLayout from 'src/components/ScreenLayout'
import NavWithSearch from 'src/components/NavWithSearch'
import ArtikelPreview from 'src/components/ArtikelPreview'
import VideoPreview from 'src/components/VideoPreview'
import { Link } from 'expo-router'
import { useOneArticle } from 'src/services/Articles/Articles.url'

import { format, differenceInHours, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

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

const ParentProHeader = () => {
  const { data: article, isLoading, error } = useOneArticle()

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>
  if (!article) return <Text>No article found</Text>

  function formatArticleDate(dateString: string): string {
    const date = parseISO(dateString)
    const now = new Date()
    const hoursDifference = differenceInHours(now, date)

    if (hoursDifference < 24) {
      return `kurang dari ${hoursDifference} jam`
    } else {
      return format(date, 'EEEE, dd MMMM', { locale: id })
    }
  }

  const formattedDate = formatArticleDate(article.createdAt)

  return (
    <View>
      <View className="bg-lightPink pt-8 pb-4 rounded-b-[20px]">
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
      <View className="-mt-40">
        <ArtikelPreview title={article.title} content={article.content} createdAt={formattedDate} />
        <View className="flex flex-row items-center justify-between mt-8 mx-6">
          <Text className="text-lg font-semibold text-darkBlue">Video Terbaru</Text>
          <Link asChild href="/parent-pro/video">
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

const ParentProTips = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <ParentProHeader />
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

export default ParentProTips
