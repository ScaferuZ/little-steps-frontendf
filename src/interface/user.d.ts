interface ProfileResponseData {
  email: string
  id: string
  lastLogin: null | string
  username: string
  name: string
  diamond: number
  role: string
  profilePictureUri: string
}

interface ProfileResponse {
  code: number
  recordsTotal: number
  status: string
  data: ProfileResponseData
  error: null | string
}
