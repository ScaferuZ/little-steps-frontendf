import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import '../../app/global.css'

interface SearchBarProps {
  placeholder: string
  rightIcon?: React.ReactNode
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, rightIcon }) => {
  return (
    <View className="flex flex-row flex-1 items-center justify-between p-3 rounded-lg bg-white w-full">
      <AntDesign name="search1" size={14} color="gray" />
      <TextInput placeholder={placeholder} className="ml-4 flex-1" />
      {rightIcon && <View className="">{rightIcon}</View>}
    </View>
  )
}

export default SearchBar
