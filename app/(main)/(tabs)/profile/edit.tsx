import { View, Text, Image, TouchableOpacity } from 'react-native'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import ScreenLayout from 'src/components/ScreenLayout'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useProfile } from 'src/services/Profile/Profile.url'
import Spinner from 'src/components/Spinner'

export default function Profile() {
  const { data: profile, isLoading, error } = useProfile()

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <ScreenLayout>
        <View className="flex-1 items-center justify-center">
          <Text>Error loading profile: {error.message}</Text>
        </View>
      </ScreenLayout>
    )
  }

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
            source={
              profile?.profilePictureUri
                ? { uri: profile.profilePictureUri }
                : require('src/assets/images/default_avatar.png')
            }
          />
          <Text className="text-primary font-semibold text-xl mt-3">{profile?.name}</Text>
        </View>
      </View>
      <View className="bg-background -mt-3 rounded-t-2xl h-full">
        <View className="mx-6 mt-9">
          <Input label="Nama Lengkap" value={profile?.name} />
          <View className="h-4"></View>
          <Input label="Email" value={profile?.email} />
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
