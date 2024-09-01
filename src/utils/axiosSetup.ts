import axios from 'axios'
import { router } from 'expo-router'

export const setupAxiosInterceptors = (
  refreshAccessToken: () => Promise<void>,
  signOut: () => Promise<void>,
  getAccessToken: () => string | null
) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          await refreshAccessToken()

          const accessToken = getAccessToken()
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
          return axios(originalRequest)
        } catch (error) {
          await signOut()
          router.replace('/login')
          return Promise.reject(error)
        }
      }

      return Promise.reject(error)
    }
  )
}
