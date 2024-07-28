import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenLayout from 'src/components/ScreenLayout'
import Navbar from 'src/components/Navbar'
import SearchBar from 'src/components/SearchBar'
import { Feather } from '@expo/vector-icons'
import NotifikasiCard from 'src/components/home/NotifikasiCard'

const Notifikasi = () => {
  return (
    <ScreenLayout>
      <ScrollView className="mx-6">
        <Navbar title="Notifikasi" />
        {/* Search bar and filter */}
        <View className="flex flex-row items-center justify-center mb-5 mt-11">
          <SearchBar placeholder="Cari Notifikasi" />
          <TouchableOpacity className="flex items-center justify-center p-3 bg-primary rounded-lg ml-2">
            <Feather name="sliders" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="font-bold text-sm mb-3">Hari ini</Text>
        <NotifikasiCard />
        <NotifikasiCard />
      </ScrollView>
    </ScreenLayout>
  )
}

export default Notifikasi
