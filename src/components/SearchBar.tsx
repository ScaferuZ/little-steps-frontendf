import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import '../../app/global.css'

const SearchBar = () => {
  return (
    <View className="flex flex-row flex-1 items-center justify-start p-3 rounded-lg bg-background w-full">
      <AntDesign name="search1" size={14} color="gray" />
      <TextInput placeholder="Cari" className="ml-4" />
    </View>
  )
}

export default SearchBar
