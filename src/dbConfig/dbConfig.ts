import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MogoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Error in connection: ", err);
      process.exit();
    });
    
  } catch (error) {
    console.log("Error while connecting: ", error);
  }
}
