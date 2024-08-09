import axios from 'axios'
import { BASE_URL } from '../url'
import { getStorageItemAsync } from 'src/hooks/useStorageState'

interface NutriwiseAnalysisResponse {
  response: string
}

const analyzeFood = async (imageUri: string): Promise<NutriwiseAnalysisResponse> => {
  const token = await getStorageItemAsync('accessToken')
  const formData = new FormData()
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'food_image.jpg'
  } as any)
  formData.append(
    'message',
    'Analyze this food image. Determine the type of food/snack/water, list its health benefits, and provide its macronutrients (protein, carbs, fat).'
  )

  const response = await axios.post(`${BASE_URL}/api/ai`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const NutriwiseService = {
  analyzeFood
}
