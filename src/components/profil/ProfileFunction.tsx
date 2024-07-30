import { View, Text, Pressable } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link } from 'expo-router'

interface ProfileFunctionProps {
  icon: React.ComponentProps<typeof FontAwesome>['name']
  title: string
  subTitle?: string
  href?: string
}

const ProfileFunction: React.FC<ProfileFunctionProps> = ({ icon, title, subTitle, href }) => {
  const content = (
    <View className="flex flex-row items-center justify-between">
      <View className="bg-lightPink p-3 rounded-full">
        <FontAwesome name={icon} size={18} color="#D1235E" />
      </View>
      <View className={`flex ${subTitle ? 'flex-col' : ''} justify-center flex-1 ml-4`}>
        <Text className="font-medium text-black text-sm">{title}</Text>
        {subTitle && <Text className="font-normal text-grey text-xs">{subTitle}</Text>}
      </View>
      <FontAwesome name="angle-right" size={18} color="black" />
    </View>
  )

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable>{content}</Pressable>
      </Link>
    )
  }

  return <Pressable>{content}</Pressable>
}

export default ProfileFunction
