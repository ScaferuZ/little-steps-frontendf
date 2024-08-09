import { useMutation } from '@tanstack/react-query'
import { NutriwiseService } from './Nutriwise.query'

export function useNutriwiseAnalysis() {
  return useMutation({
    mutationFn: NutriwiseService.analyzeFood
  })
}
