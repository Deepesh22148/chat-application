import {Router} from "express";
import {getChat, updateChat} from "../controllor/chat.controllor.js";

const chatRouter = Router();

chatRouter.post("/get", getChat )
chatRouter.post("/post" , updateChat)

export default chatRouter;