import React, { ReactNode } from 'react'
import { View, Text, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native'

// Main Card component
interface CardProps {
  children: ReactNode
  containerStyle?: ViewStyle
  className?: string
  onPress?: () => void
}

const Card: React.FC<CardProps> = ({ children, containerStyle, className, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={className}
      style={[styles.cardContainer, containerStyle]}>
      {children}
    </Pressable>
  )
}

// CardBody component
interface CardBodyProps {
  children: ReactNode
  bodyStyle?: ViewStyle
}

const CardBody: React.FC<CardBodyProps> = ({ children, bodyStyle }) => {
  return <View style={[bodyStyle]}>{children}</View>
}

// CardTitle component
interface CardTitleProps {
  children: ReactNode
  titleStyle?: TextStyle
}

const CardTitle: React.FC<CardTitleProps> = ({ children, titleStyle }) => {
  return <Text style={[styles.cardTitle, titleStyle]}>{children}</Text>
}

// CardActions component
interface CardActionsProps {
  children: ReactNode
  actionsStyle?: ViewStyle
}

const CardActions: React.FC<CardActionsProps> = ({ children, actionsStyle }) => {
  return <View style={[styles.cardActions, actionsStyle]}>{children}</View>
}

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignSelf: 'flex-start', // Fit content width
    maxWidth: '100%' // Prevent overflow
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export { Card, CardBody, CardTitle, CardActions }
