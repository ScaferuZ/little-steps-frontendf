import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { ProfileServices } from './Profile.query'

export function useProfile(
  options?: Omit<
    UseQueryOptions<ProfileResponse, Error, ProfileResponseData>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<ProfileResponse, Error, ProfileResponseData>({
    queryKey: ['profile'],
    queryFn: ProfileServices.getProfile,
    select: (data) => data.data,
    ...options
  })
}
