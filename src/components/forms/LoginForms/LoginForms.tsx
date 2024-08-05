import { Link, router } from 'expo-router'
import React, { useReducer } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { View } from 'react-native'
import Input from 'src/components/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './schema'
import Button from 'src/components/Button'
import { useSession } from 'app/ctx'
import EyePassword from 'src/components/elements/EyePassword'
import ToastMessage from 'src/components/elements/ToastMessage'
import { useLogin } from 'src/services/Auth/Auth.url'

interface LoginFormInputs {
  email: string
  password: string
}

const LoginForms = () => {
  const { signIn } = useSession()
  const [hideEye, dispatch] = useReducer((state: boolean) => !state, true)

  const { mutate: doLogin, isPending } = useLogin({
    onSuccess: ({ data }: LoginResponse) => {
      ToastMessage({ message: 'Berhasil Login', variant: 'success' })
      setTimeout(() => {
        signIn({
          email: data.email,
          id: data.id,
          access: data.access,
          refresh: data.refresh
        })
      }, 1500)
    },
    onError: (error) => {
      console.log('error', error)
      ToastMessage({ message: 'Email atau password salah', variant: 'danger' })
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    doLogin(data)
  }

  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Email"
            placeholder="Masukkan email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.email?.message}
          />
        )}
      />
      <View className="h-4" />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            secureTextEntry={hideEye}
            rightIcon={
              <EyePassword name="password" isHide={hideEye} handleHidingEye={() => dispatch()} />
            }
            label="Kata Sandi"
            placeholder="Masukkan Kata Sandi"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.password?.message}
          />
        )}
      />
      <View className="flex flex-row justify-end mt-3">
        <Link asChild href="/forgot-password">
          <Text className="text-primary font-normal">Lupa Kata Sandi?</Text>
        </Link>
      </View>
      <View className="mt-36">
        <Button variant="primary" onPress={handleSubmit(onSubmit)} className="w-full">
          {isPending ? <ActivityIndicator size="small" className="size-5" /> : 'Masuk'}
        </Button>
        <View className="flex flex-row items-center justify-center mt-4 gap-1">
          <Text className="">Belum punya akun?</Text>
          <Link asChild href="/signup">
            <Text className="text-primary font-semibold">Daftar Sekarang</Text>
          </Link>
        </View>
      </View>
    </>
  )
}

export default LoginForms
