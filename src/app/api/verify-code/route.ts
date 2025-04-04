import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json()

        const decoadedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decoadedUsername })

        if (!user) {
            return Response.json({
                success: false,
                message: "Error while verifying user"
            },
                { status: 500 })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpires) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json({
                success: true,
                message: "account verified successfully"
            },
                { status: 200 })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "verification code has expired, sign up to get new code"
            },
                { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: "Incorrect verification code"
            },
                { status: 400 })
        }

    } catch (error) {
        console.log("Error in verify code", error);
        return Response.json({
            success: false,
            message: "Error with verifying code"
        },
            { status: 500 })
    }
}






