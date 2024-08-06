import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { registerSchema } from './schema'
import Input from 'src/components/Input'
import EyePassword from 'src/components/elements/EyePassword'
import { useState } from 'react'
import { useSignup } from 'src/services/Auth/Auth.url'
import { View, Text, Alert, ActivityIndicator } from 'react-native'
import Button from 'src/components/Button'
import LinkButton from 'src/components/LinkButton'
import AvatarUploadArea from 'src/components/elements/AvatarUploadArea'
import { useRouter } from 'expo-router'
import ToastMessage from 'src/components/elements/ToastMessage'

interface FormData {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
  avatar: { uri: string; type: string; name: string } | null
}

const RegisterForm = () => {
  const router = useRouter()
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

  const signupMutation = useSignup({
    onSuccess: (response) => {
      console.log('Registration successful:', response)
      ToastMessage({
        message: 'Registration successful. Please log in with your new account.',
        variant: 'success'
      })

      setTimeout(() => {
        router.replace('/login')
      }, 2000)
    },
    onError: (error) => {
      console.error('Registration failed:', error)
      ToastMessage({ message: 'Registration failed. Please try again.', variant: 'danger' })
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: null
    },
    resolver: zodResolver(registerSchema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Remove confirmPassword from the data sent to the server
    const { confirmPassword, ...signupData } = data

    // Create the final data object to submit
    const dataToSubmit: SignUpForm = {
      ...signupData,
      avatar: signupData.avatar || null // This ensures avatar is never undefined
    }

    signupMutation.mutate(dataToSubmit)
  }

  return (
    <>
      <View className="h-2" />
      <Controller
        control={control}
        name={'avatar'}
        render={({ field: { value, onChange } }) => (
          <AvatarUploadArea value={value} onChange={onChange} error={errors?.avatar?.message} />
        )}
      />
      <Controller
        control={control}
        name={'name'}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Nama"
            placeholder="Masukkan nama"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.name?.message}
          />
        )}
      />
      <View className="h-2" />
      <Controller
        control={control}
        name={'username'}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Username"
            placeholder="Masukkan username"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.username?.message}
          />
        )}
      />
      <View className="h-2" />
      <Controller
        control={control}
        name={'email'}
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
      <View className="h-2" />
      <Controller
        control={control}
        name={'password'}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            secureTextEntry={hidePassword}
            rightIcon={
              <EyePassword
                name="password"
                isHide={hidePassword}
                handleHidingEye={() => setHidePassword(!hidePassword)}
              />
            }
            label="Kata Sandi"
            placeholder="Masukkan kata sandi"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.password?.message}
          />
        )}
      />
      <View className="h-2" />
      <Controller
        control={control}
        name={'confirmPassword'}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            secureTextEntry={hideConfirmPassword}
            rightIcon={
              <EyePassword
                name="confirmPassword"
                isHide={hideConfirmPassword}
                handleHidingEye={() => setHideConfirmPassword(!hideConfirmPassword)}
              />
            }
            label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kembali kata sandi"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors?.confirmPassword?.message}
          />
        )}
      />

      <View className="mt-8">
        <Button
          variant="primary"
          onPress={handleSubmit(onSubmit)}
          className="w-full"
          disabled={signupMutation.isPending}>
          {signupMutation.isPending ? 'Registering...' : 'Daftar'}
        </Button>
        <View className="flex flex-row w-full justify-center items-center mt-4">
          <Text className="text-center text-sm text-grey">Sudah memiliki akun? </Text>
          <LinkButton
            href="/login"
            className="text-center text-sm font-bold text-primary ml-1"
            text="Masuk"
          />
        </View>
      </View>
    </>
  )
}

export default RegisterForm
