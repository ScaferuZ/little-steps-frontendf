import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../url'
import { getBasicHeader, getBearerHeader } from 'src/utils/services'

function login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
  const url = `${BASE_URL}/api/auth/login`
  const token = btoa(`${email}:${password}`)

  return axios.post(url, { email, password }, { headers: getBasicHeader(token) })
}

function logout() {
  const url = `${BASE_URL}/api/auth/logout`
  const refreshToken = localStorage.getItem('refresh_token')

  if (refreshToken) return axios.patch(url, {}, { headers: getBearerHeader(refreshToken) })
  else console.error('No refresh token found')
}

export const AuthServices = {
  login,
  logout
}
