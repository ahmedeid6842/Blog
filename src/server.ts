import config from "config";

import MongoConnect from "./utils/connectDB"
import app from "./app";


const port = config.get<number>("PORT") || 3000;
const host = config.get<string>("HOST") || "localhost";



MongoConnect()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`server starting at http://${host}:${port}  🚀🎉`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
