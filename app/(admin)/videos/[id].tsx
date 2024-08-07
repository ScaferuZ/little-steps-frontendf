import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { dummyVideos, Video } from '../constant'
import Navbar from 'src/components/Navbar'

export default function EditVideo() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [video, setVideo] = useState<Video | null>(null)

  useEffect(() => {
    const foundVideo = dummyVideos.find((v) => v.id === id)
    if (foundVideo) {
      setVideo(foundVideo)
    }
  }, [id])

  const handleSave = () => {
    // In a real app, you would save the changes to your backend here
    console.log('Saving video:', video)
    router.push('/videos')
  }

  if (!video) {
    return <Text className="p-4 text-red-500">Video not found</Text>
  }

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <Navbar title="Edit Video" />
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
        placeholder="Duration"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={video.uploadDate}
        onChangeText={(text) => setVideo({ ...video, uploadDate: text })}
        placeholder="Upload Date"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={video.views.toString()}
        onChangeText={(text) => setVideo({ ...video, views: parseInt(text) || 0 })}
        placeholder="Views"
        keyboardType="numeric"
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        value={video.likes.toString()}
        onChangeText={(text) => setVideo({ ...video, likes: parseInt(text) || 0 })}
        placeholder="Likes"
        keyboardType="numeric"
      />
      <Pressable className="bg-green-500 p-3 rounded" onPress={handleSave}>
        <Text className="text-white text-center font-bold">Save Changes</Text>
      </Pressable>
    </ScrollView>
  )
}
