import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../url'
import { getBasicHeader, getBearerHeader } from 'src/utils/services'
import { getStorageItemAsync } from 'src/hooks/useStorageState'

async function getAllArticle(): Promise<ArticleResponse> {
  const url = `${BASE_URL}/api/cms/articles`
  const token = await getStorageItemAsync('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  const response = await axios.get<ArticleResponse>(url, { headers: getBearerHeader(token) })
  return response.data
}

async function createArticle(
  articleData: CreateArticleForm
): Promise<AxiosResponse<CreateArticleResponse>> {
  const url = `${BASE_URL}/api/cms/articles`
  const token = await getStorageItemAsync('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  const formData = new FormData()
  formData.append('title', articleData.title)
  formData.append('content', articleData.content)
  formData.append('category', articleData.category)
  formData.append('type', articleData.type.toString()) // Convert boolean to string
  if (articleData.thumbnailUri) formData.append('thumbnail_uri', articleData.thumbnailUri)
  if (articleData.videoUri) formData.append('video_uri', articleData.videoUri)

  console.log('Sending article data:', formData)

  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

export const ArticleServices = { getAllArticle, createArticle }
