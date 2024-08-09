import { useMutation, useQuery } from '@tanstack/react-query'
import { ArticleServices } from './Articles.query'

export function useAllArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: ArticleServices.getAllArticle
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
