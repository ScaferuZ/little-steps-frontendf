import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import NavWithSearch from 'src/components/NavWithSearch'

import { AntDesign, FontAwesome } from '@expo/vector-icons'

import ScreenLayout from 'src/components/ScreenLayout'
import SearchBar from 'src/components/SearchBar'
import QuickMenuItem from 'src/components/home/QuickMenuItem'
import PostPreviewCard from 'src/components/PostPreview'

export default function MomsConnect() {
  return (
    <ScreenLayout testID="second-screen-layout">
      <View className="bg-lightPink pt-8 pb-4 rounded-b-[40px] -mb-20 ">
        <View className="flex flex-col mx-6 mb-16">
          <View className="flex-row items-center mt-14">
            <SearchBar
              placeholder="Cari Forum..."
              rightIcon={<FontAwesome name="sliders" size={18} color="grey" />}
            />
          </View>
          {/* tabs */}
          <View className="flex flex-row justify-between mt-3">
            <Pressable className="bg-[#FFCBDC] px-4 py-3 rounded-lg">
              <Text className="text-primary font-medium">Popular</Text>
            </Pressable>
            <Pressable className="bg-white px-4 py-3 rounded-lg">
              <Text className="text-black font-medium">Rekomendasi</Text>
            </Pressable>
            <Pressable className="bg-white px-4 py-3 rounded-lg">
              <Text className="text-black font-medium">Post Terbaru</Text>
            </Pressable>
          </View>
          <Text className="font-semibold text-base text-black mt-4">Popular Topics</Text>
        </View>
      </View>
      <View className="mx-6">
        {/* topics */}
        <View className="flex flex-row items-center justify-between w-full mt-6">
          <QuickMenuItem
            className="flex-1"
            customSize={20}
            backgroundColor
            href="/moms-connect"
            icon={require('../../../../src/assets/images/moms/skincare.png')}
            label="Skincare Bayi"
          />
          <QuickMenuItem
            className="flex-1"
            customSize={20}
            backgroundColor
            href="/moms-connect"
            icon={require('../../../../src/assets/images/moms/obat.png')}
            label="Obat Gatal"
          />
          <QuickMenuItem
            className="flex-1"
            customSize={20}
            backgroundColor
            href="/moms-connect"
            icon={require('../../../../src/assets/images/moms/sarapan.png')}
            label="Ide Sarapan Anak"
          />
        </View>
        {/* trending post */}
        <Text className="mt-6 mb-3 font-semibold text-base text-black">Trending Post</Text>
        <PostPreviewCard
          username="Ratnasari Suryaningrat"
          timeAgo="1h ago"
          content="Skincare bayi yang bagus itu apa ya bund? kebetulan anak saya satu badan gatal semua dan sudah coba periksa tetap saja..."
          likes={34}
          replies={12}
          views={200}
        />
      </View>
    </ScreenLayout>
  )
}
