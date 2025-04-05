import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";


export async function POST(request: Request) {

    await dbConnect()
    const { username, content } = await request.json();
    if (!username || !content) {
        return new Response(JSON.stringify({ error: "Username and content are required" }), { status: 400 });
    }
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: true,
                message: "User not found",
            }, {
                status: 404
            })
        }

        // check if user is accepting messages
        if (!user.isAcceptingMessages) {
            return Response.json({
                success: true,
                message: "User is not accepting messages",
            }, {
                status: 403
            })
        }
        // check if user is verified
        if (!user.isVerified) {
            return Response.json({
                success: true,
                message: "User is not verified",
            }, {
                status: 403
            })
        }
        const newMessage = {
            content,
            createdAt: new Date(),
        }
        user.messages.push(newMessage as Message);
        await user.save();
        return Response.json({
            success: true,
            message: "Message sent successfully",
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Internal server error ! error with sending message",
        }, {
            status: 500
        })
    }
}








