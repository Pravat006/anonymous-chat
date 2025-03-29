import mongoose ,{Schema, Document} from "mongoose";


export interface Message extends Document{
    content: string;
    createdAt: Date
}


const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, {
    timestamps: true,
})


// const MessageModel = mongoose.model<Message>("Message", MessageSchema);


export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpires: Date,
    isAcceptingMessages: boolean,
    messages: Message[]
}


const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verification code is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyCodeExpires: {
        type: Date,
        required: true,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
}, {
    timestamps: true,
})
const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;

