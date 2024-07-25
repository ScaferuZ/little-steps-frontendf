import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ScreenLayout from 'src/components/ScreenLayout'
import SearchBar from 'src/components/SearchBar'
import { Feather } from '@expo/vector-icons'
import CalorieCounter from 'src/components/home/CalorieCounter'
import NutrientDetailCard from 'src/components/home/NutrientDetail'
import QuickMenuItem from 'src/components/home/QuickMenuItem'

export default function Beranda() {
  return (
    <ScreenLayout>
      <View className="bg-lightPink pt-8 pb-4 rounded-b-[25px]">
        <View className="flex flex-col items-center justify-center mx-6">
          {/* Profile bar */}
          <View className="flex flex-row items-center justify-between w-full mt-10 mb-6">
            <View className="flex flex-row items-center">
              <Image
                className="w-12 h-12 rounded-full"
                source={{ uri: 'https://via.placeholder.com/50' }}
              />
              <View className="ml-4">
                <Text className="text-lg font-bold text-primary">Halo, Putri Sari</Text>
                <Text className="text-sm text-gray-500">18 Januari 2024 | Kamis</Text>
              </View>
            </View>
            <TouchableOpacity className="flex items-center justify-center p-4 bg-background rounded-lg drop-shadow-sm">
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/* Search bar and filter */}
          <View className="flex flex-row items-center justify-center mb-24">
            <SearchBar />
            <TouchableOpacity className="flex items-center justify-center p-3 bg-primary rounded-lg ml-2">
              <Feather name="sliders" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex flex-col items-center justify-center mx-6  -mt-16">
        {/* Calories dashboard */}
        <View className="bg-[#FFF5F8] w-full rounded-lg">
          <CalorieCounter />
          <View className="flex flex-row justify-around px-4">
            <NutrientDetailCard icon="fitness-outline" amount="20g" label="Fat" color="#4caf50" />
            <NutrientDetailCard
              icon="restaurant-outline"
              amount="50g"
              label="Carbs"
              color="#ff9800"
            />
            <NutrientDetailCard
              icon="nutrition-outline"
              amount="24g"
              label="Protein"
              color="#f44336"
            />
          </View>
        </View>
        {/* Tabs */}
        <View className="flex flex-row items-center justify-between w-full mt-6">
          <QuickMenuItem
            icon={require('../../../src/assets/images/home/nutriwise.png')}
            label="Nutriwise"
          />
          <QuickMenuItem
            icon={require('../../../src/assets/images/home/diamond.png')}
            label="Diamond"
          />
          <QuickMenuItem
            icon={require('../../../src/assets/images/home/parentPro.png')}
            label="ParentPro Tips"
          />
          <QuickMenuItem
            icon={require('../../../src/assets/images/home/konsultasi.png')}
            label="Konsultasi"
          />
        </View>
      </View>
    </ScreenLayout>
  )
}
