import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import '../../../app/global.css'

interface QuickMenuItemProps {
  icon: any
  href: string
  label: string
  backgroundColor?: boolean
  className?: string
  customSize?: number
}

const QuickMenuItem: React.FC<QuickMenuItemProps> = ({
  icon,
  label,
  href,
  backgroundColor,
  className,
  customSize = 14 // Default size is 14
}) => {
  const sizeClass = customSize ? `w-${customSize} h-${customSize}` : 'w-14 h-14'

  return (
    <Link href={href} asChild>
      <TouchableOpacity className={`flex flex-col items-center justify-center ${className}`}>
        <View
          className={`flex items-center justify-center p-3 bg-lightPink rounded-lg mb-2 ${backgroundColor ? 'bg-white' : ''}`}>
          <Image className={sizeClass} source={icon} resizeMode="stretch" />
        </View>
        <Text className="font-medium text-black text-xs">{label}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default QuickMenuItem
