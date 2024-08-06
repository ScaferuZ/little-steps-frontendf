interface LoginResponseData {
  refresh: string
  access: string
  email: string
  id: string
}

interface LoginResponse {
  code: number
  status: string
  recordsTotal: number
  status: string
  message: string
  data: LoginResponseData
  error: null | string
}

interface LoginForm {
  email: string
  password: string
}

interface User {
  email: string
  id: string
}

interface SignUpForm {
  name: string
  username: string
  email: string
  password: string
  avatar: { uri: string; type: string; name: string } | null
}

interface SignupResponseData {
  message: string
}

interface SignupResponse {
  code: number
  status: string
  recordsTotal: number
  message: string
  data: SignupResponseData
  error: null | string
}
