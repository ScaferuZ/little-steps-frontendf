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
