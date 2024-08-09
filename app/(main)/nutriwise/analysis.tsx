import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

interface AnalysisData {
  foodType: string
  healthBenefits: string[]
  macronutrients: {
    protein: number
    carbs: number
    fat: number
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

  return (
    <ScrollView className="flex-1 p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-48 rounded-lg mb-4"
          resizeMode="cover"
        />
      )}

      <Text className="text-2xl font-bold mb-4">{data.foodType}</Text>

      <Text className="text-xl font-semibold mb-2">Health Benefits:</Text>
      {data.healthBenefits.map((benefit, index) => (
        <Text key={index} className="mb-1">
          • {benefit}
        </Text>
      ))}

      <Text className="text-xl font-semibold mt-4 mb-2">Macronutrients:</Text>
      <Text>Protein: {data.macronutrients.protein}g</Text>
      <Text>Carbs: {data.macronutrients.carbs}g</Text>
      <Text>Fat: {data.macronutrients.fat}g</Text>
    </ScrollView>
  )
}

export default FoodAnalysisScreen
