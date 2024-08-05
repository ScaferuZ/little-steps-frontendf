import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { registerSchema } from './schema'
import Input from 'src/components/Input'
import EyePassword from 'src/components/elements/EyePassword'
import { useReducer, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import Button from 'src/components/Button'
import { Link } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import LinkButton from 'src/components/LinkButton'
import AvatarUploadArea from 'src/components/elements/AvatarUploadArea'

interface FormData {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
  avatar: { uri: string; type: string; name: string }
}

const RegisterForm = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
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
    Alert.alert('Successful', JSON.stringify(data))
    console.log(data)

    // signIn()
    // router.replace('/')
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
        <Button variant="primary" onPress={handleSubmit(onSubmit)} className="w-full">
          Masuk
        </Button>
        {/* <View className="flex flex-row items-center mt-8"> */}
        {/*   <View className="flex-1 h-[1px] bg-grey" /> */}
        {/*   <View> */}
        {/*     <Text className="px-4 text-center text-sm text-grey">atau daftar dengan</Text> */}
        {/*   </View> */}
        {/*   <View className="flex-1 h-[1px] bg-grey" /> */}
        {/* </View> */}
        {/* <Button className="w-full mt-8 p-4 font-semibold drop-shadow-2xl" variant="outline"> */}
        {/*   <View className="flex flex-row items-center justify-center space-x-4"> */}
        {/*     <AntDesign name="google" size={16} /> */}
        {/*     <Text className="ml-4 font-bold">Google</Text> */}
        {/*   </View> */}
        {/* </Button> */}
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
