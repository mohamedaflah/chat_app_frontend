import { string, z } from "zod"
 
export const formSchema = z.object({
  username: z.string().min(2).max(50),
  email:z.string().min(2).max(50),
  password:string().min(8)
})
export const loginFormSchema=z.object({
  email:z.string().email().min(2).max(50),
  password:z.string().min(8)
})
