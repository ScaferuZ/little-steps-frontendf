import axios from 'axios'
import { getStorageItemAsync } from 'src/hooks/useStorageState'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

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
