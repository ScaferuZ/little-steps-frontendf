import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Octicons from '@expo/vector-icons/Octicons'
import NutrientDetailCard from 'src/components/home/NutrientDetail'
import { FontAwesome6 } from '@expo/vector-icons'
import { getStorageItemAsync, setStorageItemAsync } from 'src/hooks/useStorageState'

interface AnalysisData {
  foodTypes: string[]
  quantities: number[]
  healthBenefits: string[]
  nutritionalInfo: {
    calories: number
    protein: number
    carbohydrates: number
    sugars: number
    dietaryFiber: number
    fat: number
    potassium: number
  }
}

const FoodAnalysisScreen = () => {
  const { imageUri, analysisData } = useLocalSearchParams<{
    imageUri: string
    analysisData: string
  }>()
  const router = useRouter()

  let data: AnalysisData | null = null

  try {
    if (analysisData) {
      data = JSON.parse(analysisData)
    } else {
      throw new Error('No analysis data provided')
    }
  } catch (error) {
    console.error('Failed to parse analysis data:', error)
    Alert.alert('Error', 'Failed to load analysis data. Please try again.')
    router.back()
    return null
  }

  if (!data) {
    return null
  }

  console.log('data: ', data)

  return (
    <ScrollView className="flex-1 px-6 py-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="mb-4 flex flex-row justify-between">
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text className="text-2xl font-bold mb-4">{data.foodTypes.join(', ')} </Text>
        <Octicons name="bookmark" size={24} color="black" />
      </TouchableOpacity>

      {imageUri && (
        <View className="flex items-center justify-center mb-4">
          <Image
            source={{ uri: imageUri }}
            className="w-5/12 h-48 rounded-[45px] mb-4"
            resizeMode="cover"
          />
          <Text className="text-3xl text-[#2C3968] font-bold">
            {data.nutritionalInfo.calories} kcal
          </Text>
          <Text className="text-sm">
            (for {data.quantities.reduce((a, b) => a + b, 0)}{' '}
            {data.quantities.length > 1 ? 'pieces' : 'piece'})
          </Text>
        </View>
      )}

      <View className="flex flex-row justify-around px-4 mt-9">
        <NutrientDetailCard
          icon="percent"
          amount={data.nutritionalInfo.fat}
          label="Fat"
          color="#0AA7FF"
          bgColor="#FFF"
        />
        <NutrientDetailCard
          icon="apple-whole"
          amount={data.nutritionalInfo.carbohydrates}
          label="Carbs"
          color="#ff9800"
          bgColor="#FFF"
        />
        <NutrientDetailCard
          icon="egg"
          amount={data.nutritionalInfo.protein}
          label="Protein"
          color="#f44336"
          bgColor="#FFF"
        />
      </View>

      <Text className="text-3xl text-[#2C3968] font-bold ">✨ Health Benefits</Text>
      {data.healthBenefits.map((benefit, index) => (
        <Text key={index} className="mt-2">
          • {benefit}
        </Text>
      ))}

      <Text className="text-3xl text-[#2C3968] font-bold mt-6">✨ Nutrition Facts</Text>

      <View className="flex flex-row justify-between items-center mt-4">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Total Fat</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.fat ? `${data.nutritionalInfo.fat}g` : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-4">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Calories</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.calories ? `${data.nutritionalInfo.calories} kcal` : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-4">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Protein</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.protein ? `${data.nutritionalInfo.protein}g` : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-4">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Carbohydrates</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.carbohydrates
              ? `${data.nutritionalInfo.carbohydrates}g`
              : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-4">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Sugars</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.sugars ? `${data.nutritionalInfo.sugars}g` : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-4">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Carbohydrates</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.sugars ? `${data.nutritionalInfo.sugars}g` : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-4">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Dietary Fiber</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.dietaryFiber
              ? `${data.nutritionalInfo.dietaryFiber}g`
              : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <View className="flex flex-row justify-between items-center mt-4 mb-16">
        <View className="p-1.5 rounded-full bg-primary">
          <FontAwesome6 name="bolt" size={10} color="white" />
        </View>
        <Text className="font-semibold flex-1 ml-5">
          <Text className="text-secondaryBlack">Potassium</Text>{' '}
          <Text className="text-[#3AC7BF]">
            {data.nutritionalInfo.potassium ? `${data.nutritionalInfo.potassium}g` : 'Not found'}
          </Text>
        </Text>
        <Text className="font-semibold text-accent">0%</Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          const macronutrients = {
            calories: data?.nutritionalInfo.calories,
            protein: data?.nutritionalInfo.protein,
            carbohydrates: data?.nutritionalInfo.carbohydrates,
            fat: data?.nutritionalInfo.fat
          }

          try {
            const existingData = await getStorageItemAsync('savedFood')
            let updatedData = macronutrients

            if (existingData) {
              const parsedExistingData = JSON.parse(existingData)
              updatedData = {
                calories: (parsedExistingData.calories || 0) + (macronutrients.calories || 0),
                protein: (parsedExistingData.protein || 0) + (macronutrients.protein || 0),
                carbohydrates:
                  (parsedExistingData.carbohydrates || 0) + (macronutrients.carbohydrates || 0),
                fat: (parsedExistingData.fat || 0) + (macronutrients.fat || 0)
              }
            }

            await setStorageItemAsync('savedFood', JSON.stringify(updatedData))
            Alert.alert('Success', 'Food information updated successfully!')
          } catch (error) {
            console.error('Error updating food information:', error)
            Alert.alert('Error', 'Failed to update food information. Please try again.')
          }
        }}
        className="bg-primary py-3 px-6 rounded-full mb-8">
        <Text className="text-white text-center font-bold">Update saved food</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default FoodAnalysisScreen
