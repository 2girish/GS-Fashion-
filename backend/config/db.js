import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ DB Connected Successfully");
    } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
}
};

export default connectDb;