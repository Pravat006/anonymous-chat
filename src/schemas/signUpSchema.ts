import {z} from 'zod';


export const usernameValidation = z
                                    .string()
                                    .min(2, "username must be at least 2 characters long")
                                    .max(20, "username must be at most 20 characters long")
                                    .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special characters")



export const SignUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z
        .string()
        .min(6, {message: "Password must be at least 6 characters long" })
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});





