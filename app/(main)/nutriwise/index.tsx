import React, { useRef, useState } from 'react'
import Navbar from 'src/components/Navbar'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native'
import { Card, CardBody, CardTitle, CardActions } from 'src/components/shared/Card'
import Ionicons from '@expo/vector-icons/Ionicons'

import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useNutriwiseAnalysis } from 'src/services/Nutriwise/Nutriwise.url'
import Button from 'src/components/Button'

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

interface NutritionCardData {
  title: string
  by: string
}

const nutritionCardData: NutritionCardData[] = [
  {
    title: 'Ini Dia Kandungan Nutrisi Salmon Yang Dicari-Cari Ibu',
    by: 'the Mediterranean Diet'
  },
  {
    title: 'Ini Dia Kandungan Nutrisi Pecel Lele Yang Dicari-Cari Ibu',
    by: 'Bekicot Magetan'
  }
]

interface NutritionCardProps {
  item: NutritionCardData
}

const NutritionCard: React.FC<NutritionCardProps> = ({ item }) => {
  return (
    <Card
      className="overflow-hidden mx-6"
      containerStyle={{
        width: Dimensions.get('window').width * 0.9,
        alignSelf: 'center',
        backgroundColor: '#FFD8E5',
        borderRadius: 20,
        position: 'relative',
        paddingRight: 120,
        minHeight: 180,
        marginHorizontal: 10
      }}>
      <CardBody bodyStyle={{ flex: 1, padding: 16, alignItems: 'flex-start' }}>
        <CardTitle
          titleStyle={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
          {item.title}
        </CardTitle>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>by {item.by}</Text>
        <CardActions actionsStyle={{ marginLeft: 0 }}>
          <TouchableOpacity className="bg-darkPink px-4 py-2 rounded-[5px]">
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Cek Kandungannya</Text>
          </TouchableOpacity>
        </CardActions>
      </CardBody>
      <Image
        source={require('../../../src/assets/images/image-salad.png')}
        style={{
          width: 120,
          height: 120,
          position: 'absolute',
          bottom: 0,
          right: 0,
          borderTopLeftRadius: 20
        }}
        resizeMode="cover"
      />
    </Card>
  )
}

const PaginationDot: React.FC<{ active: boolean }> = ({ active }) => (
  <View
    style={{
      height: 8,
      width: active ? 24 : 8,
      borderRadius: 999,
      backgroundColor: active ? '#D1235E' : '#ccc',
      marginHorizontal: 4
    }}
  />
)

const NutriwiseScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cameraVisible, setCameraVisible] = useState(false)
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const router = useRouter()
  const { mutate: analyzeFood, isPending } = useNutriwiseAnalysis()

  const handleScroll = (event: any) => {
    const slideWidth = Dimensions.get('window').width * 0.9 + 20
    const offset = event.nativeEvent.contentOffset.x
    const index = Math.round(offset / slideWidth)
    setActiveIndex(index)
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  const openCamera = () => {
    setCameraVisible(true)
  }

  const closeCamera = () => {
    setCameraVisible(false)
    setCapturedImage(null)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri)
    }
  }

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View className="flex flex-1 justify-center mx-6">
        <Text className="text-center pb-3">
          Tolong berikan permission jika ingin menggunakan kamera
        </Text>
        <Button onPress={requestPermission}>Berikan Permission</Button>
      </View>
    )
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync()
        console.log('Photo taken:', photo)
        setCapturedImage(photo.uri)
      } catch (error) {
        console.error('Failed to take picture:', error)
      }
    }
  }

  const sendPhotoToBackend = async () => {
    if (!capturedImage) return

    analyzeFood(capturedImage, {
      onSuccess: (data) => {
        try {
          console.log(data.response)
          const parsedData = parseAnalysisResponse(data.response)
          console.log('Parsed Data:', JSON.stringify(parsedData, null, 2))
          router.push({
            pathname: '/nutriwise/analysis',
            params: {
              imageUri: capturedImage,
              analysisData: JSON.stringify(parsedData)
            }
          })
        } catch (error) {
          console.error('Failed to parse analysis response:', error)
          Alert.alert(
            'Error',
            'Failed to process the analysis results. Would you like to try again?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Retake Photo', onPress: retakePicture }
            ]
          )
        }
      },
      onError: (error) => {
        console.error('Failed to analyze food:', error)
        if (error && typeof error === 'object' && 'response' in error && error.response) {
          Alert.alert(
            'Server Error',
            'There was a problem on our end. Would you like to try again?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Retake Photo', onPress: retakePicture }
            ]
          )
        } else {
          Alert.alert('Error', 'Failed to analyze the food. Would you like to try again?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Retake Photo', onPress: retakePicture }
          ])
        }
      }
    })
  }

  const parseAnalysisResponse = (response: string): AnalysisData => {
    const lines = response.split('\n').filter((line) => line.trim() !== '')
    let foodTypes: string[] = []
    let quantities: number[] = []
    let healthBenefits: string[] = []
    let nutritionalInfo: { [key: string]: number } = {}

    try {
      // Extract food types and quantities
      const ingredientLine = lines.find((line) => line.startsWith('Visible ingredients:'))
      if (ingredientLine) {
        const ingredients = ingredientLine.substring('Visible ingredients:'.length).split(',')
        ingredients.forEach((ingredient) => {
          const match = ingredient.trim().match(/(.*?)\s*\((\d+).*?\)/)
          if (match) {
            foodTypes.push(match[1].trim())
            quantities.push(parseInt(match[2], 10))
          } else {
            foodTypes.push(ingredient.trim())
            quantities.push(1) // Default quantity if not specified
          }
        })
      }

      // Extract health benefits
      const healthBenefitsIndex = lines.findIndex((line) => line.includes('Health Benefits:'))
      if (healthBenefitsIndex !== -1) {
        for (let i = healthBenefitsIndex + 1; i < lines.length; i++) {
          if (lines[i].startsWith('-')) {
            healthBenefits.push(lines[i].substring(1).trim())
          } else {
            break
          }
        }
      }

      // Parse nutritional information
      const nutritionStartIndex = lines.findIndex((line) =>
        line.includes('Total approximate nutritional value')
      )
      if (nutritionStartIndex !== -1) {
        for (let i = nutritionStartIndex + 1; i < lines.length; i++) {
          const nutritionMatch = lines[i].match(/- ([\w\s]+):\s*([\d.]+)\s*(\w+)/)
          if (nutritionMatch) {
            let [, nutrient, value, unit] = nutritionMatch
            nutrient = nutrient.trim().toLowerCase()
            let numericValue = parseFloat(value)

            // Standardize units
            if (unit === 'kcal') nutrient = 'calories'
            if (unit === 'mg' && nutrient !== 'potassium') numericValue /= 1000 // convert to grams except for potassium

            nutritionalInfo[nutrient] = numericValue
          }
        }
      }

      return {
        foodTypes,
        quantities,
        healthBenefits,
        nutritionalInfo: nutritionalInfo as AnalysisData['nutritionalInfo']
      }
    } catch (error) {
      console.error('Error parsing analysis response:', error)
      return {
        foodTypes: ['Unknown Food'],
        quantities: [1],
        healthBenefits: [],
        nutritionalInfo: {
          calories: 0,
          protein: 0,
          carbohydrates: 0,
          sugars: 0,
          dietaryFiber: 0,
          fat: 0,
          potassium: 0
        }
      }
    }
  }

  const response = `
Ingredients: 
- Bananas (5)

Approximate nutritional value (per banana):
- Calories: 105
- Carbohydrates: 27g
- Sugars: 14g
- Dietary Fiber: 3g
- Protein: 1g
- Fat: 0.3g
- Potassium: 422mg
`
  const result = parseAnalysisResponse(response)
  console.log('result MockUP', result)

  const retakePicture = () => {
    setCapturedImage(null)
  }

  if (cameraVisible) {
    return (
      <SafeAreaView className="bg-black h-screen">
        {capturedImage ? (
          <View className="flex-1">
            <View className="bg-lightPink p-4">
              <TouchableOpacity onPress={retakePicture}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Image source={{ uri: capturedImage }} className="w-[450px] h-[690px]" />
            <View className="flex-row justify-around p-4 bg-lightPink">
              <Button onPress={retakePicture}>Foto Ulang</Button>
              <Button onPress={sendPhotoToBackend}>
                {isPending ? <ActivityIndicator /> : 'Cek Kandungan Makanan'}
              </Button>
            </View>
          </View>
        ) : (
          <CameraView ref={cameraRef} className="" facing={facing}>
            <View className=" justify-between">
              <View className="flex-row justify-between items-start m-6">
                <TouchableOpacity
                  className="p-4 bg-lightPink/50 rounded-full"
                  onPress={closeCamera}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
                <View className="flex-row">
                  <TouchableOpacity
                    className="p-4 bg-darkPink/50 rounded-full mr-2"
                    onPress={toggleCameraFacing}>
                    <Ionicons name="camera-reverse" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-4 bg-darkPink/50 rounded-full" onPress={pickImage}>
                    <Ionicons name="images" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="h-80" />
              <View className="h-80" />
              <View className="items-center mb-10">
                <TouchableOpacity className="p-6 bg-white rounded-full" onPress={takePicture}>
                  <View className="w-12 h-12 bg-darkPink rounded-full" />
                </TouchableOpacity>
              </View>
            </View>
          </CameraView>
        )}
      </SafeAreaView>
    )
  }

  return (
    <View>
      <View className="bg-lightPink pb-4 rounded-b-[20px]">
        <View className="flex flex-col items-center justify-center mx-6 mb-20">
          <Navbar title="Nutriwise" />
        </View>
      </View>
      <View className="-mt-20">
        <FlatList
          data={nutritionCardData}
          renderItem={({ item }) => <NutritionCard item={item} />}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          onScroll={handleScroll}
        />
      </View>
      <View className="flex-row justify-center mt-2.5">
        {nutritionCardData.map((_, index) => (
          <PaginationDot key={index} active={index === activeIndex} />
        ))}
      </View>
      <View className="mt-8 mx-6">
        <Pressable
          className="flex flex-row items-center justify-between bg-darkPink px-2 py-2 rounded-lg"
          onPress={openCamera}>
          <Text className="flex-1 text-center text-white text-base">
            Scan Nutrisi Makanan Anakmu Sekarang
          </Text>
          <Ionicons name="camera-outline" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

export default NutriwiseScreen
