import React, { forwardRef, ReactNode } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { TouchableOpacityProps } from 'react-native'

interface ThemeProps {
  primary: string
  grey: string
}

const variants = {
  primary: (theme: ThemeProps) => ({
    button: {
      backgroundColor: theme.primary,
      borderColor: 'transparent'
    },
    text: {
      color: '#fff'
    }
  }),
  secondary: (theme: ThemeProps) => ({
    button: {
      backgroundColor: '#fff',
      borderColor: theme.primary
    },
    text: {
      color: theme.primary
    }
  }),
  outline: (theme: ThemeProps) => ({
    button: {
      backgroundColor: 'transparent',
      borderColor: theme.primary
    },
    text: {
      color: theme.primary
    }
  }),
  danger: (theme: ThemeProps) => ({
    button: {
      backgroundColor: '#dc3545',
      borderColor: 'transparent'
    },
    text: {
      color: '#fff'
    }
  }),
  google: (theme: ThemeProps) => ({
    button: {
      backgroundColor: '#FAFAFF',
      borderColor: 'transparent'
    },
    text: {
      color: theme.grey
    }
  })
}

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode
  className?: string
  variant?: keyof typeof variants
}

const Button = forwardRef<TouchableOpacityProps, ButtonProps>(
  ({ children, className, variant = 'primary', ...props }, ref) => {
    const theme = useTheme()
    const variantStyles = variants[variant](theme)

    return (
      <S.Button className={`${className}`} ref={ref} style={variantStyles.button} {...props}>
        <S.ButtonText style={variantStyles.text}>{children}</S.ButtonText>
      </S.Button>
    )
  }
)

Button.displayName = 'Button'

export default Button

const S = {
  Button: styled.TouchableOpacity`
    border-radius: ${(p) => p.theme.size(10, 'px')};
    align-items: center;
    justify-content: center;
  `,
  ButtonText: styled.Text`
    font-weight: 500;
  `
}
