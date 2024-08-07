import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { articleSchema } from './schema'
import Input from 'src/components/Input'
import { View, Text } from 'react-native'
import Select from 'src/components/shared/Select'
import Button from 'src/components/Button'
import { useCreateArticle } from 'src/services/Articles/Articles.url'
import ToastMessage from 'src/components/elements/ToastMessage'

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

const CreateArticleForm = () => {
  const router = useRouter()
  const createArticleMutation = useCreateArticle()

  const {
    control,
    handleSubmit,
    formState: { errors }
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

  const onSubmit = (data: ArticleFormData) => {
    console.log('Form submitted with data:', data)
    createArticleMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Article created successfully:', response)
        ToastMessage({
          message: 'Article created successfully',
          variant: 'success'
        })
        router.push('/articles')
      },
      onError: (error: any) => {
        console.error('Failed to create article:', error.response?.data || error)
        ToastMessage({
          message: 'Failed to create article: ' + (error.response?.data?.message || error.message),
          variant: 'danger'
        })
      }
    })
  }

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
      {/* <View className="h-2" /> */}
      {/* <Controller */}
      {/*   control={control} */}
      {/*   name="type" */}
      {/*   render={({ field: { onChange, value } }) => ( */}
      {/*     <Select */}
      {/*       label="Type" */}
      {/*       placeholder="Pilih type" */}
      {/*       options={typeData} */}
      {/*       value={value} */}
      {/*       onValueChange={onChange} */}
      {/*       error={errors.type?.message as string} */}
      {/*     /> */}
      {/*   )} */}
      {/* /> */}
      {/* <View className="h-2" /> */}
      {/* <Controller */}
      {/*   control={control} */}
      {/*   name="thumbnailUri" */}
      {/*   render={({ field: { value, onChange, onBlur } }) => ( */}
      {/*     <Input */}
      {/*       label="Thumbnail URI" */}
      {/*       placeholder="Enter thumbnail URI" */}
      {/*       value={value} */}
      {/*       onChangeText={onChange} */}
      {/*       onBlur={onBlur} */}
      {/*       error={errors?.thumbnailUri?.message} */}
      {/*     /> */}
      {/*   )} */}
      {/* /> */}
      {/* <View className="h-2" /> */}
      {/* <Controller */}
      {/*   control={control} */}
      {/*   name="videoUri" */}
      {/*   render={({ field: { value, onChange, onBlur } }) => ( */}
      {/*     <Input */}
      {/*       label="Video URI" */}
      {/*       placeholder="Enter video URI" */}
      {/*       value={value} */}
      {/*       onChangeText={onChange} */}
      {/*       onBlur={onBlur} */}
      {/*       error={errors?.videoUri?.message} */}
      {/*     /> */}
      {/*   )} */}
      {/* /> */}
      <View className="h-4" />
      <Button
        variant="primary"
        onPress={handleSubmit(onSubmit)}
        className="w-full"
        disabled={createArticleMutation.isPending}>
        {createArticleMutation.isPending ? 'Creating...' : 'Tambah Artikel'}
      </Button>
    </>
  )
}

export default CreateArticleForm
