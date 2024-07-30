import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ScreenLayout from 'src/components/ScreenLayout'
import Navbar from 'src/components/Navbar'
import CalorieCounter from 'src/components/home/CalorieCounter'
import NutrientDetailCard from 'src/components/home/NutrientDetail'

import { FontAwesome6 } from '@expo/vector-icons'

const Nutriwise = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <View className="bg-lightPink pt-8 pb-4 rounded-b-[20px]">
          <View className="flex flex-col items-center justify-center mx-6 mb-44">
            <Navbar title="Nutriwise" />
          </View>
        </View>
        <View className="flex flex-col justify-center mx-6 -mt-40">
          <View className="bg-white w-full rounded-lg">
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
          <Text className="text-lg text-accent font-semibold mt-6">✨ Nutrition Facts</Text>
          <View className="flex flex-col mt-7 space-y-2">
            {/* Total Fat Row */}
            <View className="flex flex-row justify-between items-center">
              <View className="p-1.5 rounded-full bg-primary">
                <FontAwesome6 name="bolt" size={10} color="white" />
              </View>
              <Text className="font-semibold flex-1 ml-5">
                <Text className="text-secondaryBlack">Total Fat</Text>{' '}
                <Text className="text-[#3AC7BF]">20g</Text>
              </Text>
              <Text className="font-semibold text-accent">25%</Text>
            </View>

            {/* Saturated Fat Row */}
            <View className="flex flex-row justify-between items-center mx-12 mt-6">
              <View className="h-full bg-primary w-[2px]"></View>
              <View className="p-1.5 rounded-full bg-[#FADFC7] ml-5">
                <FontAwesome6 name="bolt" size={10} color="#FD7900" />
              </View>
              <View className="items-start justify-center flex-1 ml-5">
                <Text className="text-secondaryBlack font-medium mb-2">Saturated Fat</Text>
                <Text className="text-lightGrey">20g</Text>
              </View>
              <Text className="text-lightGrey">33%</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center mt-7">
            <View className="p-1.5 rounded-full bg-primary">
              <FontAwesome6 name="bolt" size={10} color="white" />
            </View>
            <Text className="font-semibold flex-1 ml-5">
              <Text className="text-secondaryBlack">Total Fat</Text>{' '}
              <Text className="text-[#3AC7BF]">20g</Text>
            </Text>
            <Text className="font-semibold text-accent">25%</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  )
}

export default Nutriwise
