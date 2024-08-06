import { View, Text, Image } from 'react-native'
import React from 'react'
import ScreenLayout from 'src/components/ScreenLayout'
import AvatarName from 'src/components/shared/AvatarName'
import { useProfile } from 'src/services/Profile/Profile.url'

export default function index() {
  const { data: profile, isLoading, error } = useProfile()
  return (
    <ScreenLayout>
      <View className="bg-lightPink pt-8 pb-4">
        <View className="flex flex-col items-center justify-center mx-6">
          <View className="flex flex-row items-center justify-between w-full mt-10 mb-20">
            <AvatarName />
          </View>
        </View>
      </View>
      <View className="bg-darkPink p-4 rounded-2xl justify-between flex flex-row mx-6 -mt-16">
        <View className="flex flex-col">
          <Text className="text-white/50 text-sm"> Diamond kamu</Text>
          <Text className="text-white text-3xl font-extrabold mt-3">{profile?.diamond}</Text>
          <Text className="text-white/80 text-sm mt-5">{profile?.name}</Text>
        </View>
        <Image className="w-44 h-44" source={require('src/assets/images/diamond-icon.png')} />
      </View>
    </ScreenLayout>
  )
}
