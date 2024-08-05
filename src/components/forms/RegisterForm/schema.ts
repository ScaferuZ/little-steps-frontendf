import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Nama harus diisi minimal 3 karakter'),
    username: z.string().min(3, 'Username harus diisi minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8, 'Password harus paling tidak 8 karakter'),
    confirmPassword: z.string().min(8, 'Konfirmasi password harus paling tidak 8 karakter'),
    avatar: z
      .object({
        uri: z.string(),
        type: z.string(),
        name: z.string()
      })
      .nullable()
      .refine((value) => value !== null, { message: 'Avatar harus diunggah' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword']
  })
