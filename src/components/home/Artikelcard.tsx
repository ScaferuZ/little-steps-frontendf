import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../Button'

const Artikelcard = () => {
  return (
    <View className="bg-[#F6F8FF] w-full px-3 py-6 rounded-xl">
      <View className="flex flex-row items-start">
        <Image
          className="w-24 h-24 rounded-xl"
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
        <View className="flex flex-col ml-4">
          <Text className="font-bold text-lg text-black">Judul Wiseguard</Text>
          <Text className="font-medium text-xs text-black w-9/12">
            Baby blues syndrome is a feeling of sadness that many women...
          </Text>
          <Button className="w-6/12 p-1 mt-2" variant="primary">
            Check
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Artikelcard
