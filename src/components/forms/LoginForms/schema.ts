import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'), // Ensures
  password: z.string().min(5, 'Password must be at least 8 characters') // Ensures the password is at least 8 characters
})
