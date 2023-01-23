import express from "express";

import user from "./user.routes";
import plugin from "./plugin.routes";
import session from "./session.routes";

const app = express();

app.use("/user", user);
app.use("/plugin", plugin);
app.use("/session", session);

export default app;
