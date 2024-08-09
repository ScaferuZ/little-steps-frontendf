import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface NavbarProps {
  title: string
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const router = useRouter()

  return (
    <View className="flex flex-row items-center justify-between my-7">
      <TouchableOpacity className="bg-white p-2 rounded-xl" onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={18} color="black" />
      </TouchableOpacity>
      <View className="flex-1 items-center">
        <Text className="font-semibold text-center">{title}</Text>
      </View>
      <View style={{ width: 36 }} />
    </View>
  )
}

export default Navbar
