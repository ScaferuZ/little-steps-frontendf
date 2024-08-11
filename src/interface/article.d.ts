interface Article {
  id: string
  title: string
  content: string
  thumbnailUri: string | null
  videoUri: string | null
  type: bool
  category: string
  createdAt: string
}

interface ArticleResponseData {
  articles: Article[]
  find?: any
}

interface ArticleResponse {
  code: number
  status: string
  recordsTotal: number
  data: Article[]
  error: null | string
}

interface CreateArticleResponse {
  code: number
  status: string
  recordsTotal: number
  message: string
  data: CreateArticleResponseData
  error: null | string
}

interface CreateArticleResponseData {
  message: string
}

interface CreateArticleForm {
  title: string
  content: string
  category: string
  type?: boolean
  thumbnailUri?: string | null
  videoUri?: string | null
}

interface EditArticleForm {
  id: string
  title?: string
  content?: string
  category?: string
  type?: boolean
  thumbnailUri?: string | null
  videoUri?: string | null
}

interface oneArticleData {
  id: string
  title: string
  content: string
  thumbnailUri: string | null
  videoUri: string | null
  type: boolean
  category: string
  createdAt: string
}

interface oneArticleResponse {
  code: number
  status: string
  recordsTotal: number
  message: string
  data: oneArticleData
  error: null | string
}

interface ArticleParams {
  page: number
  limit: number
}
