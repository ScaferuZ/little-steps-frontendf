import { View, Text, Image, TouchableOpacity } from 'react-native'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import ScreenLayout from 'src/components/ScreenLayout'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router = useRouter()
  return (
    <ScreenLayout>
      <View className="flex flex-col bg-lightPink py-16">
        <View className="flex flex-row items-center justify-between w-full mx-6">
          <TouchableOpacity className="bg-white p-3 rounded-xl" onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={18} color="black" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-primary font-semibold text-lg">User Profile</Text>
          </View>
          <View style={{ width: 72 }} />
        </View>
        <View className="items-center justify-center mt-3">
          <Image
            className="w-24 h-24 rounded-full"
            source={{ uri: 'https://via.placeholder.com/50' }}
          />
          <Text className="text-primary font-semibold text-xl mt-3">Putri Sari</Text>
        </View>
      </View>
      <View className="bg-background -mt-3 rounded-t-2xl h-full">
        <View className="mx-6 mt-9">
          <Input label="Nama Lengkap" />
          <View className="h-4"></View>
          <Input label="Email" />
          <View className="h-4"></View>
          <Input label="No Telepon" />
          <View className="h-4"></View>
          <Input label="Password" secureTextEntry />
          <View className="h-10"></View>
          <Button variant="primary" className="py-4">
            Simpan
          </Button>
        </View>
      </View>
    </ScreenLayout>
  )
}
