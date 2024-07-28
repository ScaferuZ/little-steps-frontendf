import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ScreenLayout from 'src/components/ScreenLayout'
import Navbar from 'src/components/Navbar'

const Nutriwise = () => {
  return (
    <ScreenLayout>
      <ScrollView className="mx-6">
        <Navbar title="Nutriwise" />
      </ScrollView>
    </ScreenLayout>
  )
}

export default Nutriwise
