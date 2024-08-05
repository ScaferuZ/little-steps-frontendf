import React from 'react'
import Toast from 'react-native-root-toast'

type ToastVariant = 'success' | 'danger' | 'info'

interface ToastMessageProps {
  message: string
  variant: ToastVariant
  duration?: number
}

const variantStyles = {
  success: {
    backgroundColor: 'green',
    textColor: '#FFFFFF'
  },
  danger: {
    backgroundColor: 'red',
    textColor: '#FFFFFF'
  },
  info: {
    backgroundColor: 'blue',
    textColor: '#FFFFFF'
  }
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  variant,
  duration = Toast.durations.LONG
}) => {
  const { backgroundColor, textColor } = variantStyles[variant]

  return Toast.show(message, {
    duration,
    shadow: false,
    textColor,
    position: Toast.positions.TOP,
    backgroundColor
  })
}

export default ToastMessage
