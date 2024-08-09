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
import Button from 'src/components/Button'
import { useRouter } from 'expo-router'
import { useNutriwiseAnalysis } from 'src/services/Nutriwise/Nutriwise.url'

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

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View className="flex flex-1 justify-center mx-6">
        <Text className="text-center pb-3">
          Tolng berikan permission jika ingin menggunakan kamera
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

  // Mock function to send photo to backend
  const sendPhotoToBackend = async () => {
    if (!capturedImage) return

    analyzeFood(capturedImage, {
      onSuccess: (data) => {
        try {
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
          Alert.alert('Error', 'Failed to process the analysis results. Please try again.')
        }
      },
      onError: (error) => {
        console.error('Failed to analyze food:', error)
        Alert.alert('Error', 'Failed to analyze the food. Please try again.')
      }
    })
  }

  const parseAnalysisResponse = (response: string) => {
    const lines = response.split('\n').filter((line) => line.trim() !== '')
    let foodType = 'Unknown Food'
    const healthBenefits: string[] = []
    const macronutrients = {
      protein: 0,
      carbs: 0,
      fat: 0
    }

    let currentSection = ''

    lines.forEach((line) => {
      line = line.trim()
      if (line.startsWith('The image shows')) {
        foodType = line.replace('The image shows', '').replace('**', '').trim()
      } else if (line.toLowerCase().includes('health benefits:')) {
        currentSection = 'health'
      } else if (line.toLowerCase().includes('macronutrients')) {
        currentSection = 'macro'
      } else if (currentSection === 'health' && line.startsWith('*')) {
        const benefit = line.replace('*', '').replace('**', '').trim()
        healthBenefits.push(benefit)
      } else if (currentSection === 'macro' && line.includes(':')) {
        const [nutrient, value] = line.split(':')
        if (nutrient && value) {
          const numMatch = value.match(/\d+(\.\d+)?/)
          if (numMatch) {
            const numValue = parseFloat(numMatch[0])
            if (!isNaN(numValue)) {
              if (nutrient.toLowerCase().includes('protein')) macronutrients.protein = numValue
              else if (nutrient.toLowerCase().includes('carb')) macronutrients.carbs = numValue
              else if (nutrient.toLowerCase().includes('fat')) macronutrients.fat = numValue
            }
          }
        }
      }
    })

    return { foodType, healthBenefits, macronutrients }
  }

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
                <TouchableOpacity
                  className="p-4 bg-darkPink/50 rounded-full"
                  onPress={toggleCameraFacing}>
                  <Ionicons name="camera-reverse" size={24} color="white" />
                </TouchableOpacity>
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
