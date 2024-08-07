import React from 'react'
import { Redirect } from 'expo-router'
import { useProfile } from 'src/services/Profile/Profile.url'
import Spinner from 'src/components/Spinner'

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: profile, isLoading, error } = useProfile()

  if (isLoading) {
    return <Spinner />
  }

  if (error || profile?.role !== 'admin') {
    return <Redirect href="/" />
  }

  return <>{children}</>
}

export default AdminRoute
