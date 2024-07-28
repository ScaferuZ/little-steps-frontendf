import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import SearchBar from './SearchBar'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface NavbarProps {
  placeholder: string
}

const NavWithSearch: React.FC<NavbarProps> = ({ placeholder }) => {
  const router = useRouter()
  return (
    <View className="flex flex-row items-center justify-between mt-14">
      <TouchableOpacity className="bg-white p-3 rounded-xl" onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={18} color="black" />
      </TouchableOpacity>
      <View className="flex-1 items-center ml-4">
        <SearchBar
          placeholder={placeholder}
          rightIcon={<FontAwesome name="sliders" size={18} color="grey" />}
        />
      </View>
    </View>
  )
}

export default NavWithSearch
