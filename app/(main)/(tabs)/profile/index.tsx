import { useSession } from 'app/ctx'
import { Link } from 'expo-router'
import { View, Text, Image, Pressable } from 'react-native'
import ScreenLayout from 'src/components/ScreenLayout'
import Spinner from 'src/components/Spinner'
import ProfileFunction from 'src/components/profil/ProfileFunction'
import { useProfile } from 'src/services/Profile/Profile.url'

export default function Profile() {
  const { signOut, session } = useSession()
  const { data: profile, isLoading, error } = useProfile()
  const isAdmin = profile?.role === 'admin'

  const renderProfileContent = () => {
    if (isLoading) {
      return <Spinner />
    }

    if (error) {
      return (
        <View className="py-8">
          <Text className="text-red-500 text-center">Error loading profile</Text>
        </View>
      )
    }

    return (
      <>
        <Image
          className="w-24 h-24 rounded-full mt-3 "
          source={
            profile?.profilePictureUri
              ? { uri: profile.profilePictureUri }
              : require('src/assets/images/default_avatar.png')
          }
        />
        <Text className="text-primary font-semibold text-xl mt-3">{profile?.name}</Text>
      </>
    )
  }

  return (
    <ScreenLayout>
      <View className="flex flex-col bg-lightPink py-16 items-center justify-center">
        <Text className="text-primary font-semibold text-lg">User Profile</Text>
        {renderProfileContent()}
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
          {isAdmin && (
            <>
              <View className="h-4"></View>
              <Link asChild href="/dashboard">
                <ProfileFunction icon="tool" title="Dashboard Admin" subTitle="Admin CMS" />
              </Link>
            </>
          )}
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
