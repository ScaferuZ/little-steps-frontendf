import { useMutation, useQuery } from '@tanstack/react-query'
import { ArticleServices } from './Articles.query'

export function useAllArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: ArticleServices.getAllArticle
  })
}

export function useCreateArticle() {
  return useMutation({
    mutationFn: ArticleServices.createArticle
  })
}
