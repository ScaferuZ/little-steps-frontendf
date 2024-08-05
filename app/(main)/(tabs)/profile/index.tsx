import { useSession } from 'app/ctx'
import { View, Text, Image, Pressable } from 'react-native'
import ScreenLayout from 'src/components/ScreenLayout'
import Spinner from 'src/components/Spinner'
import ProfileFunction from 'src/components/profil/ProfileFunction'
import { useProfile } from 'src/services/Profile/Profile.url'

export default function Profile() {
  const { signOut, session } = useSession()
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

  return (
    <ScreenLayout>
      <View className="flex flex-col bg-lightPink py-16 items-center justify-center">
        <Text className="text-primary font-semibold text-lg">User Profile</Text>
        <Image
          className="w-24 h-24 rounded-full mt-3 "
          source={{ uri: profile?.profilePictureUri }}
        />
        <Text className="text-primary font-semibold text-xl mt-3">{profile?.name}</Text>
      </View>
      <View className="bg-background -mt-3 rounded-t-2xl h-full">
        <View className="mx-6 my-5 px-4 py-6 bg-white rounded-xl">
          <ProfileFunction
            icon="user"
            title="Akun Saya"
            subTitle="Edit Profile"
            href="/profile/edit"
          />
          <View className="h-4"></View>
          <ProfileFunction icon="star" title="Diamond" subTitle="Diamond Saya" />
          <View className="h-4"></View>
          <ProfileFunction icon="tool" title="Pengaturan" subTitle="Atur pengaturanmu disini" />
          <View className="h-4"></View>
          <ProfileFunction
            icon="log-out"
            title="Keluar"
            subTitle="Keluar dari akun"
            onPress={() => signOut()}
          />
        </View>
        <Text className="mx-6 font-medium">Lainnya</Text>
        <View className="mx-6 my-5 px-4 py-6 bg-white rounded-xl">
          <ProfileFunction icon="bell" title="Bantuan & Dukungan" />
          <View className="h-4"></View>
          <ProfileFunction icon="heart" title="Tentang Aplikasi" />
        </View>
      </View>
    </ScreenLayout>
  )
}
