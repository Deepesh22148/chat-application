import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import {PORT} from "./config.js";
import {connectToDB} from "./database/database.connect.js";
import {searchRouter} from "./routes/search.route.js";
import chatRouter from "./routes/chat.route.js";

const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/",authRouter)
app.use("/user/", searchRouter)
app.use("/chat/" , chatRouter)

app.get("/" , (req , res) => {
    console.log("Hello World!");
    res.send("Hello World!");
})

app.listen(PORT , async () => {
    console.log("Server started on port http://localhost:3000");
    await connectToDB();
});