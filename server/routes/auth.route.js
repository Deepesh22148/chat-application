import {Router} from "express";
import {login, signUp} from "../controllor/auth.controllor.js";

const authRouter = Router();

authRouter.post("/signup",signUp);

authRouter.post("/login",login)

export default authRouter;