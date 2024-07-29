import { View, Text, Image } from 'react-native'
import React from 'react'

interface ArtikelProps {
  title: string
  date: number
  description: string
}

const ArtikelPreview: React.FC<ArtikelProps> = ({ title, date, description }) => {
  return (
    <View className="flex flex-col mx-6 bg-white  p-3 rounded-2xl">
      <View className="flex flex-row items-start justify-between">
        <Text className="font-bold text-xl w-6/12">{title}</Text>
        <Image
          className="w-36 h-36 rounded-2xl "
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-grey text-xs font-normal">{date} jam yang lalu</Text>
        <Text className="text-black text-xl font-normal mr-1">...</Text>
      </View>
      <Text className="mt-3 font-light text-black text-justify">{description}</Text>
    </View>
  )
}

export default ArtikelPreview
