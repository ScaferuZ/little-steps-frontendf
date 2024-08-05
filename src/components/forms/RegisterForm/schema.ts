import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Nama harus diisi minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8, 'Passowrd harus berisi minimal 8 karakter'),
    confirmPassword: z.string().min(8, 'Konfirmasi password harus berisi minimal 8 karakter')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword']
  })
