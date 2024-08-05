import React, { forwardRef } from 'react'
import { Pressable, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'text' | 'disabled'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ children, variant = 'primary', className = '', style, ...props }, ref) => {
    const baseButtonClasses = 'flex items-center justify-center rounded-lg py-4 px-3 '
    const baseTextClasses = 'font-medium'

    const buttonVariantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: { backgroundColor: '#E6407B' },
      secondary: { backgroundColor: '#FFFFFF', borderColor: '#E6407B', borderWidth: 1 },
      outline: { borderColor: '#E6407B', borderWidth: 1 },
      danger: { backgroundColor: '#DC3545' },
      text: { backgroundColor: 'transparent' },
      disabled: { backgroundColor: '#DADAE0' }
    }

    const textVariantClasses = {
      primary: 'text-white',
      secondary: 'text-primary',
      outline: 'text-primary',
      danger: 'text-white',
      text: 'text-primary',
      disabled: 'text-textgrey'
    }

    const buttonClasses = `${baseButtonClasses} ${className}`
    const textClasses = `${baseTextClasses} ${textVariantClasses[variant]}`

    return (
      <Pressable
        ref={ref}
        className={buttonClasses}
        style={[buttonVariantStyles[variant], style]}
        {...props}>
        <Text className={textClasses}>{children}</Text>
      </Pressable>
    )
  }
)

Button.displayName = 'Button'

export default Button
