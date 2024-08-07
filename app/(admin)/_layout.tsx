import React from 'react'
import { Slot } from 'expo-router'
import AdminRoute from 'src/route/AdminRoute'

export default function AdminLayout() {
  return (
    <AdminRoute>
      <Slot />
    </AdminRoute>
  )
}
