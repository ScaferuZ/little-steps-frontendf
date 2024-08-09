import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { articleSchema } from './schema'
import Input from 'src/components/Input'
import { View, Text } from 'react-native'
import Select from 'src/components/shared/Select'
import Button from 'src/components/Button'
import { useEditArticle, useArticleById, useAllArticles } from 'src/services/Articles/Articles.url'
import ToastMessage from 'src/components/elements/ToastMessage'
import { useEffect } from 'react'

interface ArticleFormData {
  title: string
  content: string
  type: boolean
  category: string
  thumbnailUri: string | undefined
  videoUri: string | undefined
}

const typeData = [
  { label: 'Draft', value: false },
  { label: 'Published', value: true }
]

const categoryData = [
  { label: 'ParentProTips', value: 'ParentProtips' },
  { label: 'WiseGuard', value: 'WiseGuard' }
]

const EditArticleForm = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const editArticleMutation = useEditArticle()
  const { data, isLoading, error } = useAllArticles()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ArticleFormData>({
    defaultValues: {
      title: '',
      content: '',
      type: false,
      category: '',
      thumbnailUri: undefined,
      videoUri: undefined
    },
    resolver: zodResolver(articleSchema)
  })

  useEffect(() => {
    console.log('useEffect triggered. data:', data)
    if (data && data.data) {
      const foundArticle = data.data.find((a: any) => a.id === id)
      if (foundArticle) {
        console.log('Populating form with article:', foundArticle)
        reset({
          title: foundArticle.title,
          content: foundArticle.content,
          type: foundArticle.type,
          category: foundArticle.category,
          thumbnailUri: foundArticle.thumbnailUri,
          videoUri: foundArticle.videoUri
        })
      } else {
        console.log('Article not found for current page')
      }
    }
  }, [data, reset, id])

  const onSubmit = (formData: ArticleFormData) => {
    if (!id) {
      console.error('No article ID found')
      ToastMessage({
        message: 'Error: No article ID found',
        variant: 'danger'
      })
      return
    }

    console.log(id)

    editArticleMutation.mutate(
      { id, ...formData },
      {
        onSuccess: (response) => {
          console.log('Article updated successfully:', response)
          ToastMessage({
            message: 'Article updated successfully',
            variant: 'success'
          })
          router.push('/articles')
        },
        onError: (error: any) => {
          console.error('Failed to update article:', error.response?.data || error)
          ToastMessage({
            message:
              'Failed to update article: ' + (error.response?.data?.message || error.message),
            variant: 'danger'
          })
        }
      }
    )
  }

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Judul Artikel"
            placeholder="Masukkan judul artikel"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.title?.message}
          />
        )}
      />
      <View className="h-2" />
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Isi Konten"
            placeholder="Isi konten artikel"
            multiline={true}
            numberOfLines={10}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.content?.message}
          />
        )}
      />
      <View className="h-2" />
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Category"
            placeholder="Pilih category"
            options={categoryData}
            value={value}
            onValueChange={onChange}
            error={errors.category?.message as string}
          />
        )}
      />
      <View className="h-4" />
      <Button
        variant="primary"
        onPress={handleSubmit(onSubmit)}
        className="w-full"
        disabled={editArticleMutation.isPending}>
        {editArticleMutation.isPending ? 'Updating...' : 'Update Artikel'}
      </Button>
    </>
  )
}

export default EditArticleForm
