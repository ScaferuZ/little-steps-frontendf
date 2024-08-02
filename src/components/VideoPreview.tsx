import { View, Text, Image } from 'react-native'
import React from 'react'
import { Feather, FontAwesome6 } from '@expo/vector-icons'

interface VideoPreviewProps {
  className?: string
  title: string
  duration: string
  comment: number
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ className, title, duration, comment }) => {
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3 // for Android
      }}
      className={`${className} flex flex-col bg-white p-2 w-48 justify-center rounded-2xl`}>
      <Image
        className="h-36 rounded-2xl"
        source={{ uri: 'https://via.placeholder.com/50' }}
        resizeMode="stretch"
      />
      <Text className="font-semibold text-lg mt-3">{title}</Text>
      <View className="flex flex-row justify-between items-center mt-3">
        <View className="flex flex-row items-center justify-center">
          <Feather name="clock" size={12} color="pink" />
          <Text className="text-xs font-medium ml-1">{duration}</Text>
        </View>
        <View className="flex flex-row items-center justify-center ">
          <FontAwesome6 name="comment" size={12} color="pink" />
          <Text className="text-xs font-medium ml-1">{comment} Comment</Text>
        </View>
        <Feather name="bookmark" size={12} color="pink" />
      </View>
    </View>
  )
}

export default VideoPreview
