import express from "express";

import user from "./user.routes";
import blog from "./blog.routes";
import session from "./session.routes";

const app = express();

app.use("/user", user);
app.use("/blog", blog);
app.use("/session", session);

export default app;
