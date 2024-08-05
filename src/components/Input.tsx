import React, { forwardRef } from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  label?: string
  labelAlt?: string
  labelBottomLeft?: string
  labelBottomRight?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  readonlyPlaceholder?: boolean
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      labelAlt,
      labelBottomLeft,
      labelBottomRight,
      error,
      leftIcon,
      rightIcon,
      className = '',
      readonlyPlaceholder = false,
      ...props
    },
    ref
  ) => {
    return (
      <View className={`w-full ${className}`}>
        {(label || labelAlt) && (
          <View className="flex-row justify-between mb-1">
            {label && <Text className="text-base font-medium text-grey">{label}</Text>}
            {labelAlt && <Text className="text-base font-medium">{labelAlt}</Text>}
          </View>
        )}
        <View className="relative">
          {leftIcon && (
            <View className="absolute left-3 top-0 bottom-0 justify-center">{leftIcon}</View>
          )}
          <TextInput
            ref={ref}
            editable={!readonlyPlaceholder}
            className={`border-b-primary border-b-2 py-4 w-full ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${error ? 'border-red-500' : 'border-[#DADAE0]'} ${readonlyPlaceholder ? 'bg-gray-100' : 'bg-transparent'}`}
            placeholderTextColor="#9CA3AF"
            {...props}
          />
          {rightIcon && (
            <View className="absolute right-3 top-0 bottom-0 justify-center">{rightIcon}</View>
          )}
        </View>
        {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        {(labelBottomLeft || labelBottomRight) && (
          <View className="flex-row justify-between mt-1">
            {labelBottomLeft && <Text className="text-sm">{labelBottomLeft}</Text>}
            {labelBottomRight && <Text className="text-sm">{labelBottomRight}</Text>}
          </View>
        )}
      </View>
    )
  }
)

Input.displayName = 'Input'

export default Input
