import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Using existing connection");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB successfully");
    } catch (error: any) {
        if (error.name === "MongoNetworkError" && error.message.includes("querySrv ENOTFOUND")) {
            console.error("DNS resolution failed for MongoDB SRV record. Please check your connection string and network.");
        } else {
            console.error("Error connecting to MongoDB:", error.message);
        }
        process.exit(1);
    }
}

export default dbConnect;