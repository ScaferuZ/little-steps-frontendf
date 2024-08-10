import axios, { AxiosResponse } from 'axios'
import * as FileSystem from 'expo-file-system'
import { getBasicHeader, getBearerHeader } from 'src/utils/services'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL
function login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
  const url = `${BASE_URL}/api/auth/login`
  const token = btoa(`${email}:${password}`)

  return axios.post(url, { email, password }, { headers: getBasicHeader(token) })
}

async function signup(signupData: SignUpForm): Promise<AxiosResponse<SignupResponse>> {
  const url = `${BASE_URL}/api/auth/register`

  const formData = new FormData()
  formData.append('name', signupData.name)
  formData.append('username', signupData.username)
  formData.append('email', signupData.email)
  formData.append('password', signupData.password)

  if (signupData.avatar) {
    formData.append('profile_picture_uri', {
      uri: signupData.avatar.uri,
      type: signupData.avatar.type || 'image/jpeg',
      name: signupData.avatar.name || 'profile_picture.jpg'
    } as any)
  }

  console.log('Sending signup data:', formData)

  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: (data, headers) => {
      return formData // Return the FormData object directly
    }
  })
}

function logout() {
  const url = `${BASE_URL}/api/auth/logout`
  const refreshToken = localStorage.getItem('refresh_token')

  if (refreshToken) return axios.patch(url, {}, { headers: getBearerHeader(refreshToken) })
  else console.error('No refresh token found')
}

export const AuthServices = {
  login,
  signup,
  logout
}
