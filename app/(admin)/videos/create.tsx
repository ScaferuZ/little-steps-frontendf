import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import Navbar from 'src/components/Navbar'

export default function CreateVideo() {
  const router = useRouter()
  const [video, setVideo] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    duration: ''
  })

  const handleCreate = () => {
    console.log('Creating video:', video)
    router.push('/videos')
  }

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <Navbar title="Create Video" />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={video.title}
        onChangeText={(text) => setVideo({ ...video, title: text })}
        placeholder="Title"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4 h-32"
        value={video.description}
        onChangeText={(text) => setVideo({ ...video, description: text })}
        placeholder="Description"
        multiline
        textAlignVertical="top"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={video.thumbnailUrl}
        onChangeText={(text) => setVideo({ ...video, thumbnailUrl: text })}
        placeholder="Thumbnail URL"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={video.duration}
        onChangeText={(text) => setVideo({ ...video, duration: text })}
        placeholder="Duration (e.g., 15:30)"
      />
      <Pressable className="bg-green-500 p-3 rounded" onPress={handleCreate}>
        <Text className="text-white text-center font-bold">Create Video</Text>
      </Pressable>
    </ScrollView>
  )
}
