import { Link, router } from 'expo-router'
import React, { useReducer, useState } from 'react'
import { Alert, Text } from 'react-native'
import { View } from 'react-native'
import Input from 'src/components/Input'
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './schema'
import Button from 'src/components/Button'
import { useSession } from 'app/ctx'
import EyePassword from 'src/components/elements/EyePassword'

const LoginForms = () => {
  const { signIn } = useSession()
  const [isChecked, setIsChecked] = useState(false)
  const [hideEye, dispatch] = useReducer((state: boolean) => !state, true)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    Alert.alert('Successful', JSON.stringify(data))
    console.log(data)

    signIn()
    router.replace('/')
  }

  return (
    <>
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
      <View className="h-4" />
      <Controller
        control={control}
        name={'password'}
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
          Masuk
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
