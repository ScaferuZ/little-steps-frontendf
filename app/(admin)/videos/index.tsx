import React from 'react'
import { View, Text, FlatList, Pressable, Image } from 'react-native'
import { Link } from 'expo-router'
import { dummyVideos, Video } from '../constant'
import Navbar from 'src/components/Navbar'

const VideoItem = ({ item }: { item: Video }) => (
  <Link href={`/videos/${item.id}`} asChild>
    <Pressable className="bg-white p-4 mb-2 rounded-lg shadow">
      <Image source={{ uri: item.thumbnailUrl }} className="w-full h-40 rounded mb-2" />
      <Text className="text-lg font-bold mb-1">{item.title}</Text>
      <Text className="text-sm text-gray-600 mb-1">Duration: {item.duration}</Text>
      <Text className="text-sm text-gray-600 mb-1">Uploaded on: {item.uploadDate}</Text>
      <Text className="text-sm text-gray-600">
        Views: {item.views} | Likes: {item.likes}
      </Text>
    </Pressable>
  </Link>
)

export default function VideosManagement() {
  return (
    <View className="flex-1 p-4 bg-lightPink">
      <Navbar title="Video" />
      <View className="h-4" />
      <Link href="/videos/create" asChild>
        <Pressable className="bg-green-500 p-3 rounded mb-4">
          <Text className="text-white text-center font-bold">Upload New Video</Text>
        </Pressable>
      </Link>
      <FlatList
        data={dummyVideos}
        renderItem={({ item }) => <VideoItem item={item} />}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
    </View>
  )
}
