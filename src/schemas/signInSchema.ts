import { z } from "zod";


export const SignInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
       
});






