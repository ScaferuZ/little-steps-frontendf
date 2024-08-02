import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'

interface NutrientDetailCardProps {
  icon: keyof typeof FontAwesome6.glyphMap
  amount: string
  label: string
  color: string
  bgColor?: string
}

const NutrientDetailCard: React.FC<NutrientDetailCardProps> = ({
  icon,
  amount,
  label,
  color,
  bgColor = '#FFF5F8'
}) => {
  return (
    <View className="flex flex-1 items-center justify-center p-4 bg-background rounded-lg m-2 mb-8">
      <View style={{ backgroundColor: bgColor }} className="absolute p-2 rounded-full -top-7">
        <View
          style={{
            backgroundColor: color
          }}
          className="p-2 rounded-full">
          <FontAwesome6 name={icon} size={10} color="white" />
        </View>
      </View>
      <Text className="text-lg font-semibold text-black">{amount}</Text>
      <Text className="text-sm text-grey">{label}</Text>
    </View>
  )
}

export default NutrientDetailCard
