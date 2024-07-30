import React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { useClientOnlyValue } from 'src/hooks/useClientOnlyValue'
import { appTheme } from 'src/config/theme'

import '../../global.css'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
  return <Feather size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: appTheme.primary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="wiseguard"
        options={{
          title: 'WiseGuard',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />
        }}
      />
      <Tabs.Screen
        name="moms-connect/index"
        options={{
          title: 'Moms Connect',
          tabBarIcon: ({ color }) => <TabBarIcon name="message-circle" color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />
    </Tabs>
  )
}
