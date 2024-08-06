import React, { useState } from 'react'
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
  SafeAreaView
} from 'react-native'
import { Card, CardBody, CardTitle, CardActions } from 'src/components/shared/Card'
import Ionicons from '@expo/vector-icons/Ionicons'

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'

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
      className="overflow-hidden mx-6 mt-24"
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
        source={require('../../src/assets/images/image-salad.png')}
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

  const handleScroll = (event: any) => {
    const slideWidth = Dimensions.get('window').width * 0.9 + 20
    const offset = event.nativeEvent.contentOffset.x
    const index = Math.round(offset / slideWidth)
    setActiveIndex(index)
  }

  const openCamera = async () => {
    if (!permission?.granted) {
      const newPermission = await requestPermission()
      if (!newPermission.granted) {
        alert('Camera permission is required to use this feature')
        return
      }
    }
    setCameraVisible(true)
  }

  const closeCamera = () => {
    setCameraVisible(false)
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  if (cameraVisible) {
    return (
      <View className="flex justify-center">
        <CameraView facing={facing} className="flex"></CameraView>
      </View>
    )
  }

  return (
    <View>
      <View className="bg-lightPink pt-8 pb-4 rounded-b-[20px]">
        <View className="flex flex-col items-center justify-center mx-6 mb-24">
          <Navbar title="Nutriwise" />
        </View>
      </View>
      <View className="-mt-40">
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
