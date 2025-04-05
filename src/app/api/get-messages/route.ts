import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";



export async function GET(request:Request) {
    await dbConnect()

    const session  = await getServerSession(authOptions)
    const user:User = session?.user;

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }
    const userId = new mongoose.Types.ObjectId(user?._id)

    try {
        const user = await UserModel.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {
                $unwind: "$messages"
            },
            {
                $sort:{
                    'messages.createdAt': -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    messages: {
                        $push: "$messages"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    messages: 1
                }
            },
            {
                $limit: 20
            }
        ])
        console.log("get-messages route: ",user)

        if(!user || user.length === 0){
            return Response.json({
                success:false,
                message:"No messages found"
            },{status:404})
        }
        return Response.json({
            success:true,
            messages:user[0].messages
        },{status:200})
        
    } catch (error) {
        console.log("get-messages route error: ",error)
        return Response.json({
            success:false,
            message:"Internal server error ! failed to get user messages",
            error:error
        },{status:500})
    }
}











