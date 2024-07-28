import { View, Text } from 'react-native'
import React from 'react'
import NavWithSearch from 'src/components/NavWithSearch'

const artikel = () => {
  return (
    <View className="bg-lightPink pt-8 pb-4 rounded-b-[20px] -mb-40">
      <View className="flex flex-col items-center justify-center mx-6 mb-44">
        <NavWithSearch placeholder="Cari artikel atau video..." />
      </View>
    </View>
  )
}

export default artikel
