import axios, { AxiosResponse } from 'axios'
import { getBasicHeader, getBearerHeader } from 'src/utils/services'
import { getStorageItemAsync } from 'src/hooks/useStorageState'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

const getAllArticle = async ({
  page,
  limit
}: {
  page: number
  limit: number
}): Promise<ArticleResponse> => {
  const url = `${BASE_URL}/api/articles?page=${page}&limit=${limit}`
  const token = await getStorageItemAsync('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  const response = await axios.get<ArticleResponse>(url, { headers: getBearerHeader(token) })
  return response.data
}

// TODO: fix this function
async function getArticleById(id: string): Promise<Article | undefined> {
  const allArticles = await getAllArticle({ page: 1, limit: 10 })
  return allArticles.data.articles.find((article) => article.id === id)
}

async function getOneArticle(): Promise<oneArticleData | undefined> {
  const url = `${BASE_URL}/api/articles?limit=1&sort=desc`
  const token = await getStorageItemAsync('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  const response = await axios.get<oneArticleResponse>(url, { headers: getBearerHeader(token) })
  return response.data.data[0]
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
  formData.append('type', articleData.type.toString())
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

async function editArticle(
  id: string,
  articleData: Partial<EditArticleForm>
): Promise<AxiosResponse<CreateArticleResponse>> {
  const url = `${BASE_URL}/api/cms/articles?id=${id}`
  const token = await getStorageItemAsync('accessToken')

  if (!token) {
    throw new Error('No access token found')
  }

  const formData = new FormData()
  formData.append('id', id)
  if (articleData.title) formData.append('title', articleData.title)
  if (articleData.content) formData.append('content', articleData.content)
  if (articleData.category) formData.append('category', articleData.category)
  if (articleData.type !== undefined) formData.append('type', articleData.type.toString())
  if (articleData.thumbnailUri) formData.append('thumbnail_uri', articleData.thumbnailUri)
  if (articleData.videoUri) formData.append('video_uri', articleData.videoUri)

  return axios.patch(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

export const ArticleServices = {
  getAllArticle,
  createArticle,
  editArticle,
  getArticleById,
  getOneArticle
}
