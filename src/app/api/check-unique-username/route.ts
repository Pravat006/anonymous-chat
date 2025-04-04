import dbConnect from "@/lib/dbConnect";
import { z } from 'zod';
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }
        //validtae with zod
        const result = UsernameQuerySchema.safeParse(queryParams)
        if (!result.success) {
            const usernameError = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameError[0]
            }, {
                status: 400
            })
        }
        const { username } = result.data;
        const existingUsername = await UserModel.findOne({ username, isVerified: true })

        if (existingUsername) {
            return Response.json({
                success: false,
                message: "Username already taken"
            }, {
                status: 409
            })
        }
        return Response.json({
            success: true,
            message: "Username is available"
        }, {
            status: 200
        })

    } catch (error) {
        console.error("Error checking username", error)
        return Response.json({
            success: false,
            message: "Error checking username"
        }, {
            status: 500
        })
    }

}
