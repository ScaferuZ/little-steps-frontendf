import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ScreenLayout from 'src/components/ScreenLayout'
import SearchBar from 'src/components/SearchBar'
import { Feather } from '@expo/vector-icons'
import CalorieCounter from 'src/components/home/CalorieCounter'
import NutrientDetailCard from 'src/components/home/NutrientDetail'
import QuickMenuItem from 'src/components/home/QuickMenuItem'
import Artikelcard from 'src/components/home/Artikelcard'
import { Link } from 'expo-router'
import { useSession } from 'app/ctx'
import Spinner from 'src/components/Spinner'
import { useProfile } from 'src/services/Profile/Profile.url'
import Skeleton from 'src/components/elements/Skeleton'
import AvatarName from 'src/components/shared/AvatarName'

export default function Beranda() {
  const { user, signOut } = useSession()

  const { data: profile, isLoading, error } = useProfile()

  // if (isLoading) {
  //   return <Spinner />
  // }

  if (error) {
    return (
      <ScreenLayout>
        <View className="flex-1 items-center justify-center">
          <Text>Error loading profile: {error.message}</Text>
        </View>
      </ScreenLayout>
    )
  }
  return (
    <ScreenLayout>
      <ScrollView>
        <View className="bg-lightPink pt-8 pb-4 rounded-b-[25px]">
          <View className="flex flex-col items-center justify-center mx-6">
            {/* Profile bar */}
            <View className="flex flex-row items-center justify-between w-full mt-10 mb-6">
              <AvatarName />
              <Link asChild href="/notifikasi">
                <TouchableOpacity className="flex items-center justify-center p-4 bg-background rounded-lg drop-shadow-sm">
                  <Ionicons name="notifications-outline" size={24} color="black" />
                </TouchableOpacity>
              </Link>
            </View>
            {/* Search bar and filter */}
            <View className="flex flex-row items-center justify-center mb-24">
              <SearchBar placeholder="Cari" />
            </View>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center mx-6  -mt-16">
          {/* Calories dashboard */}
          <Link asChild href="/nutriwiseDashboard" className="w-full">
            <Pressable>
              <View className="bg-[#FFF5F8] w-full rounded-lg">
                <CalorieCounter />
                <View className="flex flex-row justify-around px-4 mt-3">
                  <NutrientDetailCard icon="percent" amount="0g" label="Fat" color="#0AA7FF" />
                  <NutrientDetailCard
                    icon="apple-whole"
                    amount="0g"
                    label="Carbs"
                    color="#ff9800"
                  />
                  <NutrientDetailCard icon="egg" amount="0g" label="Protein" color="#f44336" />
                </View>
              </View>
            </Pressable>
          </Link>
          {/* Tabs */}
          <View className="flex flex-row items-center justify-between w-full mt-6">
            <QuickMenuItem
              href="/nutriwise"
              icon={require('../../../src/assets/images/home/nutriwise.png')}
              label="Nutriwise"
            />
            <QuickMenuItem
              href="/diamond"
              icon={require('../../../src/assets/images/home/diamond.png')}
              label="Diamond"
            />
            <QuickMenuItem
              href="/parent-pro"
              icon={require('../../../src/assets/images/home/parentPro.png')}
              label="ParentPro Tips"
            />
            <QuickMenuItem
              href="/konsultasi"
              icon={require('../../../src/assets/images/home/konsultasi.png')}
              label="Konsultasi"
            />
          </View>
          {/* Artikel */}
          <View className="flex flex-row w-full justify-between items-center mb-6">
            <Text className="text-lg font-bold text-black mt-6">WiseGuard Terbaru</Text>
            <TouchableOpacity>
              <Text className="text-sm text-black mt-6 font-bold">Lihat Lainnya</Text>
            </TouchableOpacity>
          </View>
          <Artikelcard />
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}
