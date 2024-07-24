import { TextInput, TextInputProps, Text, View } from 'react-native'
import React from 'react'

type InputProps = {
  label: string
  error?: undefined
  secureTextEntry?: boolean
  className?: string
} & TextInputProps

export default function Input({ className, label, secureTextEntry }: InputProps) {
  return (
    <View className={` w-full ${className}`}>
      <Text className="font-normal text-sm text-black opacity-50 mb-3">{label}</Text>
      <View className="flex"></View>
      <TextInput className="pb-3 border-b-[1px] border-primary" secureTextEntry={secureTextEntry} />
    </View>
  )
}
