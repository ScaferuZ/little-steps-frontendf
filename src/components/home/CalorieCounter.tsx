import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

const CalorieCounter = () => {
  const size = 160
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const segments = 5
  const segmentLength = circumference / (segments * 1.2) // Adjust to control segment and gap size
  const gapLength = segmentLength / 5 // Adjust to control gap size
  const strokeDasharray = `${segmentLength} ${gapLength}`
  const progress = 0.75 // 75% progress, adjust as needed
  const strokeDashoffset = circumference - progress * circumference

  return (
    <View className="flex items-center justify-center p-6 bg-pink-100 rounded-lg m-4">
      <View className="flex items-center justify-center">
        <Svg width={size} height={size}>
          <Circle
            stroke="none" // background color of circle
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <G rotation="-70" origin={`${size / 2}, ${size / 2}`}>
            <Circle
              stroke="#D1235E" // progress bar color
              fill="white"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset - (segmentLength + gapLength) / progress}
              strokeLinecap="butt" // Ensure segment edges are not rounded
            />
          </G>
        </Svg>
        <View className="absolute items-center justify-center">
          <Text className="text-4xl font-bold text-accent">0</Text>
          <Text className="text-lg font-light text-gray-500">Calories</Text>
        </View>
      </View>
    </View>
  )
}

export default CalorieCounter
