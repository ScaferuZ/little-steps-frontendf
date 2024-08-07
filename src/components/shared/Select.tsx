import React, { forwardRef, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather'

export interface SelectOption {
  label: string
  value: string | number
}

interface SelectProps {
  label?: string
  labelAlt?: string
  labelBottomLeft?: string
  labelBottomRight?: string
  error?: string
  className?: string
  options: SelectOption[]
  value?: string | number
  onValueChange?: (value: string | number) => void
  placeholder?: string
}

const Select = forwardRef<TouchableOpacity, SelectProps>(
  (
    {
      label,
      labelAlt,
      labelBottomLeft,
      labelBottomRight,
      error,
      className = '',
      options,
      value,
      onValueChange,
      placeholder = 'Pilih Opsi',
      ...props
    },
    ref
  ) => {
    const [modalVisible, setModalVisible] = useState(false)
    const selectedOption = options.find((option) => option.value === value)

    return (
      <View className={`w-full ${className}`}>
        {(label || labelAlt) && (
          <View className="flex-row justify-between mb-1">
            {label && <Text className="text-base font-medium">{label}</Text>}
            {labelAlt && <Text className="text-base font-medium">{labelAlt}</Text>}
          </View>
        )}
        <Pressable
          ref={ref}
          onPress={() => setModalVisible(true)}
          className={`flex flex-row justify-between border-b-2 rounded-md py-4 px-6  border-primary ${error ? 'border-red-500' : 'border-grey'}`}
          {...props}>
          <Text className={selectedOption ? 'text-black' : 'text-grey'}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          {selectedOption ? null : <Feather name="chevron-down" size={18} color="gray" />}
        </Pressable>
        {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        {(labelBottomLeft || labelBottomRight) && (
          <View className="flex-row justify-between mt-1">
            {labelBottomLeft && <Text className="text-sm">{labelBottomLeft}</Text>}
            {labelBottomRight && <Text className="text-sm">{labelBottomRight}</Text>}
          </View>
        )}

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.8)'
            }}
            className="flex-1 justify-end">
            <View className="bg-white rounded-t-lg pb-9">
              <FlatList
                data={options}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    className="py-3 px-4 "
                    onPress={() => {
                      onValueChange?.(item.value)
                      setModalVisible(false)
                    }}>
                    <Text>{item.label}</Text>
                  </Pressable>
                )}
              />
              <TouchableOpacity
                className="py-3 px-4 bg-gray-100"
                onPress={() => setModalVisible(false)}>
                <Text className="text-center font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
)

Select.displayName = 'Select'

export default Select
