import mongoose from "mongoose";
import config from "config";

function connect() {
  // const MONGO_URI = config.get<string>("MONGO_URI");
  return mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log(`Connected to DataBase ${process.env.MONGO_URI}`);
    })
    .catch((error) => {
      console.log("Failed to Connect to DataBase");
      process.exit(1);
    });
}

export default connect;
