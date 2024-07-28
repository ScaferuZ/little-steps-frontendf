import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const NotifikasiCard = () => {
  return (
    <View className="flex flex-row justify-between items-center bg-white w-full px-2 py-3 mb-4">
      <View className="flex items-center justify-center p-2 bg-primary rounded-2xl border-4 border-lightPink">
        <AntDesign name="checkcircle" size={24} color="white" />
      </View>
      <View className="flex flex-col flex-1 ml-2">
        <Text className="font-semibold text-sm text-black">Nutrisi anakmu sudah cukup!</Text>
        <Text className="text-sm font-normal text-grey">Yeyy, selamat..</Text>
      </View>
      <Text className="text-xs text-grey">14.07</Text>
    </View>
  )
}

export default NotifikasiCard
