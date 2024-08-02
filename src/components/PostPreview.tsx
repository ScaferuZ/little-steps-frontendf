import React from 'react'
import { View, Text, Image } from 'react-native'
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons'

interface PostPreviewCardProps {
  username: string
  timeAgo: string
  content: string
  likes: number
  replies: number
  views: number
}

const PostPreviewCard: React.FC<PostPreviewCardProps> = ({
  username,
  timeAgo,
  content,
  likes,
  replies,
  views
}) => {
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
      className="bg-white p-4 rounded-3xl ">
      <View className="flex-row items-center mb-2">
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View>
          <Text className="font-bold text-lg">{username}</Text>
          <Text className="text-grey">{timeAgo}</Text>
        </View>
      </View>
      <Text className="text-base mb-4">{content}</Text>
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Feather name="thumbs-up" size={18} color="gray" />
          <Text className="ml-1 text-grey">{likes} likes</Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="message-square" size={18} color="gray" />
          <Text className="ml-1 text-grey">{replies} replies</Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="eye" size={18} color="gray" />
          <Text className="ml-1 text-grey">{views} views</Text>
        </View>
      </View>
    </View>
  )
}

export default PostPreviewCard
