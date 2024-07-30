import { View, Text, Image } from 'react-native'
import ScreenLayout from 'src/components/ScreenLayout'
import ProfileFunction from 'src/components/profil/ProfileFunction'

export default function Profile() {
  return (
    <ScreenLayout>
      <View className="flex flex-col bg-lightPink py-16 items-center justify-center">
        <Text className="text-primary font-semibold text-lg">User Profile</Text>
        <Image
          className="w-24 h-24 rounded-full mt-3"
          source={{ uri: 'https://via.placeholder.com/50' }}
        />
        <Text className="text-primary font-semibold text-xl mt-3">Putri Sari</Text>
      </View>
      <View className="bg-background -mt-3 rounded-t-2xl h-full">
        <View className="mx-6 my-5 px-4 py-6 bg-white rounded-xl">
          <ProfileFunction
            icon="user-o"
            title="Akun Saya"
            subTitle="Edit Profile"
            href="/profile/edit"
          />
          <View className="h-4"></View>
          <ProfileFunction icon="star-o" title="Diamond" subTitle="Diamond Saya" />
          <View className="h-4"></View>
          <ProfileFunction icon="wrench" title="Pengaturan" subTitle="Atur pengaturanmu disini" />
          <View className="h-4"></View>
          <ProfileFunction icon="sign-out" title="Keluar" subTitle="Keluar dari akun" />
        </View>
        <Text className="mx-6 font-medium">Lainnya</Text>
        <View className="mx-6 my-5 px-4 py-6 bg-white rounded-xl">
          <ProfileFunction icon="bell-o" title="Bantuan & Dukungan" />
          <View className="h-4"></View>
          <ProfileFunction icon="heart-o" title="Tentang Aplikasi" />
        </View>
      </View>
    </ScreenLayout>
  )
}
