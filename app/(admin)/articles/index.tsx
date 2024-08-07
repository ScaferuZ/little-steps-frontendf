import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, FlatList } from 'react-native'
import ArtikelPreview from 'src/components/ArtikelPreview'
import Button from 'src/components/Button'
import Navbar from 'src/components/Navbar'
import Spinner from 'src/components/Spinner'
import { useAllArticles } from 'src/services/Articles/Articles.url'

const ArtikelList: React.FC = () => {
  const { data, isLoading, error } = useAllArticles()
  const router = useRouter()

  if (isLoading) return <Spinner />
  if (error) return <Text>An error occurred: {(error as Error).message}</Text>

  console.log('Data:', data)

  if (!data) return <Text>No data received</Text>
  if (!data.data) return <Text>No articles data found</Text>
  if (!Array.isArray(data.data)) return <Text>Articles data is not an array</Text>
  if (data.data.length === 0) return <Text>No articles found</Text>

  return (
    <View style={{ flex: 1 }}>
      <View className="mb-4 mx-6">
        <Navbar title="Article Management" />
        <Button variant="primary" onPress={() => router.push('/articles/create')}>
          Add Article
        </Button>
      </View>
      <FlatList
        data={data.data}
        renderItem={({ item }) => (
          <ArtikelPreview
            title={item.title}
            content={item.content}
            thumbnailUri={item.thumbnailUri}
            type={item.type}
            category={item.category}
            onPress={() => router.push(`/articles/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  )
}

export default ArtikelList
