import {resend} from "../lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{

    try {
        // Send the email using Resend
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to:email,
            subject: 'Annonymous Chat | Verification code',
            react: VerificationEmail({username, otp: verifyCode}) 
        })

        return {
                success: true,
            message: "verification email sent successfully",
        };
        
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        return {
            success: false,
            message: "Failed to send verification email.",
        };
    }
}





























