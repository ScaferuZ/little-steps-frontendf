import { AuthServices } from './Auth.query'
import { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

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
