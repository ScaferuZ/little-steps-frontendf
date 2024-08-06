import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import { View, ViewStyle, Animated, Easing, StyleSheet } from 'react-native'

interface SkeletonProps {
  width: number | string
  height: number | string
  style?: ViewStyle
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, style }) => {
  const translateX = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 100,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ).start()
  }, [translateX])

  return (
    <View
      style={[{ width, height, backgroundColor: '#FFEAF1', overflow: 'hidden' }, style]}
      className="rounded-md">
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
          backgroundColor: '#FFEAF1',
          opacity: 0.5
        }}>
        <LinearGradient
          colors={['transparent', '#E6407B', 'transparent']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </View>
  )
}

export default Skeleton
