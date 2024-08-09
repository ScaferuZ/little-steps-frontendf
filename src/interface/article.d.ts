interface Article {
  id: string
  title: string
  content: string
  thumbnailUri: string | null
  videoUri: string | null
  type: bool
  category: string
}

interface ArticleResponseData {
  articles: Article[]
  find?: any
}

interface ArticleResponse {
  code: number
  status: string
  recordsTotal: number
  message: string
  data: ArticleResponseData
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
