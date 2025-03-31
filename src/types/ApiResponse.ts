import { Message } from "@/model/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean;
    messages?: Array<Message>;
    // data?: any;
    // error?: string;
    // statusCode?: number;
    // status?: string;
}