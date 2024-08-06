import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useProfile } from 'src/services/Profile/Profile.url'
import Skeleton from '../elements/Skeleton'
import { Link } from 'expo-router'

const getDayName = (dayIndex: number): string => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  return days[dayIndex]
}

const getMonthName = (monthIndex: number): string => {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]
  return months[monthIndex]
}

const formatDate = (date: Date): string => {
  const day = date.getDate()
  const month = getMonthName(date.getMonth())
  const year = date.getFullYear()
  const dayName = getDayName(date.getDay())
  return `${day} ${month} ${year} | ${dayName}`
}

const AvatarName = () => {
  const { data: profile, isLoading, error } = useProfile()
  const today = formatDate(new Date())

  return (
    <Link href="/profile" asChild>
      <Pressable>
        {({ pressed }) => (
          <View className={`flex flex-row items-center ${pressed ? 'opacity-70' : ''}`}>
            <Image
              className="w-16 h-16 rounded-full"
              source={
                profile?.profilePictureUri
                  ? { uri: profile.profilePictureUri }
                  : require('src/assets/images/default_avatar.png')
              }
            />
            <View className="ml-4">
              <Text className="text-lg font-bold text-primary">
                Halo, {isLoading ? <Skeleton width={100} height={24} /> : profile?.name}
              </Text>
              <Text className="text-sm text-gray-500">{today}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  )
}

export default AvatarName
