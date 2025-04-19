import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    const connectionResponse = await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Database Connection Failed", error.message);
    process.exit(0);
  }
};
