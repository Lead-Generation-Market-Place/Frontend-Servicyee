// hooks/mutations/useRegister.ts
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const REGISTER_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/register/`

export const useRegister = () =>
  useMutation({
    mutationFn: async ({ username, email, password }: { username: string; email: string; password: string }) => {
      const res = await axios.post(REGISTER_URL, {
        full_name: username, // match backend field
        email,
        password,
        confirm_password: password // if required
      })
      return res.data
    },
  })
