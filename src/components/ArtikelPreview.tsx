import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'

interface ArtikelProps {
  title: string
  content: string
  thumbnailUri: string | null
  type: boolean
  category: string
  onPress?: () => void
}

const ArtikelPreview: React.FC<ArtikelProps> = ({
  title,
  content,
  thumbnailUri,
  type,
  onPress,
  category
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-col mx-6 bg-white p-3 rounded-2xl mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3 // for Android
      }}>
      <View className="flex flex-row items-start justify-between">
        <Text className="font-bold text-xl w-6/12">{title}</Text>
        <Image
          className="w-36 h-36 rounded-2xl"
          source={{ uri: thumbnailUri || 'https://via.placeholder.com/50' }}
        />
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-grey text-xs font-normal">{category}</Text>
        <Text className="text-black text-xl font-normal mr-1">...</Text>
      </View>
      <Text className="mt-3 font-light text-black text-justify" numberOfLines={3}>
        {content}
      </Text>
    </Pressable>
  )
}

export default ArtikelPreview
