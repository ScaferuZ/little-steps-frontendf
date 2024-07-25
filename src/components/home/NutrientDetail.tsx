import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface NutrientDetailCardProps {
  icon: any
  amount: string
  label: string
  color: string
}

const NutrientDetailCard: React.FC<NutrientDetailCardProps> = ({ icon, amount, label, color }) => {
  return (
    <View className="flex flex-1 items-center justify-center p-4 bg-background rounded-lg m-2 mb-8">
      <View className="absolute p-1.5 rounded-full -top-5 bg-[#FFF5F8]">
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text className="text-lg font-semibold text-black">{amount}</Text>
      <Text className="text-sm text-grey">{label}</Text>
    </View>
  )
}

export default NutrientDetailCard
