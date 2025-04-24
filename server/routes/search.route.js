import {Router} from "express"
import {getName, getRecentUser, recentUser, search} from "../controllor/search.controllor.js";

export const searchRouter = Router();

searchRouter.post("/search",search);
searchRouter.post("/add/recent",recentUser);
searchRouter.post("/get/recent",getRecentUser);
searchRouter.post("/search/name",getName);