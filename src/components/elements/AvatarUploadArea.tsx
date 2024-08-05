import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

type AvatarUploadAreaProps = {
  value: { uri: string; type: string; name: string } | null
  onChange: (file: { uri: string; type: string; name: string } | null) => void
  error?: string
}

const AvatarUploadArea: React.FC<AvatarUploadAreaProps> = ({ value, onChange, error }) => {
  const handleAvatarUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      })

      if (!result.canceled) {
        const file = result.assets[0]
        onChange({
          uri: file.uri,
          type: 'image/jpeg',
          name: 'avatar.jpg'
        })
      }
    } catch (error) {
      console.error('Error picking image:', error)
    }
  }

  return (
    <View className="items-center">
      <Pressable
        onPress={handleAvatarUpload}
        className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary items-center justify-center">
        {value && value.uri ? (
          <Image source={{ uri: value.uri }} className="w-full h-full" />
        ) : (
          <View className="w-full h-full bg-background items-center justify-center">
            <Ionicons name="person" size={24} color="#E6407B" />
          </View>
        )}
      </Pressable>
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  )
}

export default AvatarUploadArea
