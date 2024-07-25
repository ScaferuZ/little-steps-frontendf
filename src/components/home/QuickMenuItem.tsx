import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface QuickMenuItemProps {
  icon: any
  label: string
}

const QuickMenuItem: React.FC<QuickMenuItemProps> = ({ icon, label }) => {
  return (
    <TouchableOpacity className="flex flex-col items-center justify-center">
      <View className="p-3 bg-lightPink rounded-lg mb-2">
        <Image className="w-14 h-14" source={icon} />
      </View>
      <Text className="font-medium text-black text-xs">{label}</Text>
    </TouchableOpacity>
  )
}

export default QuickMenuItem
