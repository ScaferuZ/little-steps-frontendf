import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../url'
import { getBearerHeader } from 'src/utils/services'
import { getStorageItemAsync } from 'src/hooks/useStorageState'

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
