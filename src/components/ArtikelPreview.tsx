import { View, Text, Image } from 'react-native'
import React from 'react'

const ArtikelPreview = () => {
  return (
    <View className="flex flex-col mx-6 bg-white  p-3 rounded-2xl">
      <View className="flex flex-row items-start justify-between">
        <Text className="font-bold text-xl w-6/12">Games Mengasah Otak Anak? Emang Ada?</Text>
        <Image
          className="w-36 h-36 rounded-2xl "
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-grey text-xs font-normal">17 jam yang lalu</Text>
        <Text className="text-black text-xl font-normal mr-1">...</Text>
      </View>
      <Text className="mt-3 font-light text-black text-justify">
        Dalam kehidupan sehari-hari, kita sering kali tidak menyadari betapa pentingnya kesehatan
        mental bagi ibu hamil untuk kesehatan janin anak...
      </Text>
    </View>
  )
}

export default ArtikelPreview
