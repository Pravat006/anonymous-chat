import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return Response.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exist",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 400 }
        );
      }else{
        const hashedPassword = await bcrypt.hash(password,15)
        existingUserByEmail.password= hashedPassword;
        existingUserByEmail.verifyCode= verifyCode;
        existingUserByEmail.verifyCodeExpires= new Date(Date.now()+3600000);
        await existingUserByEmail.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 15);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        isVerified: false,
        verifyCodeExpires: expiryDate,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
    }
    // send the verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "UUser registered successfully , please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/sign-up:", error);
    return Response.json({ error: "Error restering user" }, { status: 500 });
  }
}
