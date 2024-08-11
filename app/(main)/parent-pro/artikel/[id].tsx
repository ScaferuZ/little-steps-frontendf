import { useLocalSearchParams, useRouter } from 'expo-router'
import { differenceInHours, format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { useAllArticles, useOneArticle } from 'src/services/Articles/Articles.url'
import { Text, ScrollView, View, ActivityIndicator } from 'react-native'
import ScreenLayout from 'src/components/ScreenLayout'
import Navbar from 'src/components/Navbar'

function formatArticleDate(dateString: string): string {
  const date = parseISO(dateString)
  const now = new Date()
  const hoursDifference = differenceInHours(now, date)

  if (hoursDifference < 24) {
    return `kurang dari ${hoursDifference} jam`
  } else {
    return format(date, 'EEEE, dd MMMM', { locale: id })
  }
}

const ArticleDetail = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { data, isLoading, error } = useAllArticles()

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />
  if (error) return <Text>Error: {(error as Error).message}</Text>

  const flattenedData = data?.pages.flatMap((page) => page.data) || []
  const article = flattenedData.find((article) => article.id === id)

  if (!article) {
    return (
      <ScreenLayout>
        <Text>Article not found</Text>
      </ScreenLayout>
    )
  }

  const formattedDate = formatArticleDate(article.createdAt)
  return (
    <ScreenLayout>
      <ScrollView className="p-6">
        <Navbar title="Detail Artikel" />
        <Text className="text-3xl font-bold mb-4">{article.title}</Text>
        <Text className="text-sm text-gray-500 mb-6">{formattedDate}</Text>
        <View className="h-[1px] bg-grey w-full" />
        <View className="h-4" />
        <Text className="text-base">{article.content}</Text>
      </ScrollView>
    </ScreenLayout>
  )
}

export default ArticleDetail
