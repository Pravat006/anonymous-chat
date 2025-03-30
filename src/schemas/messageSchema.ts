import { z } from "zod";


export const MessageSchema = z.object({
    content: z.string().min(1, { message: "Message must be at least 1 character long" }),
    // senderId: z.string(),
    // receiverId: z.string()

})
