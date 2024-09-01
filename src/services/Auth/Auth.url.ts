import { AuthServices } from './Auth.query'
import { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'app/ctx'

// Define the useAdminLogin hook
export function useLogin(options?: UseMutationOptions<LoginResponse, unknown, LoginForm>) {
  const { mutate, isPending, isSuccess } = useMutation<LoginResponse, unknown, LoginForm>({
    mutationFn: async ({ email, password }: LoginForm) => {
      console.log(email, password)
      const response = await AuthServices.login(email, password)
      return response.data // This should now correctly match LoginResponse
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError
  })

  return { mutate, isPending, isSuccess }
}

// Define the useAdminLogout hook
export function useLogout(options?: UseMutationOptions<void, unknown, void>) {
  const { mutate, isPending, isSuccess } = useMutation<void, unknown, void>({
    mutationFn: async () => {
      const response = await AuthServices.logout()
      return response?.data
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError
  })

  return { mutate, isPending, isSuccess }
}

// useSignup hook
export function useSignup(options?: UseMutationOptions<SignupResponse, unknown, SignUpForm>) {
  return useMutation<SignupResponse, unknown, SignUpForm>({
    mutationFn: async (signupData: SignUpForm) => {
      const response = await AuthServices.signup(signupData)
      return response.data
    },
    ...options
  })
}

export function useRefreshToken(options?: UseMutationOptions<RefreshTokenResponse, unknown, void>) {
  const { refreshToken, updateAccessToken } = useSession()

  return useMutation<RefreshTokenResponse, unknown, void>({
    mutationFn: async () => {
      if (!refreshToken) throw new Error('No refresh token available')
      const response = await AuthServices.refreshToken(refreshToken)
      return response.data
    },
    onSuccess: (data) => {
      if (data.status === 'success' && data.data.access) {
        updateAccessToken(data.data.access)
        options?.onSuccess?.(data, undefined, undefined)
      } else {
        throw new Error('Failed to refresh token')
      }
    },
    onError: options?.onError
  })
}
