import axios, { AxiosResponse } from 'axios'
import { getBearerHeader } from 'src/utils/services'
import { getStorageItemAsync } from 'src/hooks/useStorageState'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL
async function getProfile(): Promise<ProfileResponse> {
  const url = `${BASE_URL}/api/users/profile`
  const accessToken = await getStorageItemAsync('accessToken')

  if (!accessToken) {
    throw new Error('No access token found')
  }

  const response = await axios.get<ProfileResponse>(url, { headers: getBearerHeader(accessToken) })
  return response.data
}

export const ProfileServices = {
  getProfile
}
