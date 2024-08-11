import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { ArticleServices } from './Articles.query'

export function useAllArticles() {
  return useInfiniteQuery<ArticleResponse, Error>({
    queryKey: ['articles'],
    queryFn: ({ pageParam = 1 }) =>
      ArticleServices.getAllArticle({ page: pageParam as number, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < 10) return undefined // No more pages
      return allPages.length + 1
    }
  })
}

export function useOneArticle() {
  return useQuery<oneArticleData | undefined, Error>({
    queryKey: ['article'],
    queryFn: ArticleServices.getOneArticle
  })
}

export function useArticleById(id: string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => ArticleServices.getArticleById(id)
  })
}

export function useEditArticle() {
  return useMutation({
    mutationFn: ({ id, ...articleData }: { id: string } & Partial<CreateArticleForm>) =>
      ArticleServices.editArticle(id, articleData)
  })
}

export function useCreateArticle() {
  return useMutation({
    mutationFn: ArticleServices.createArticle
  })
}
