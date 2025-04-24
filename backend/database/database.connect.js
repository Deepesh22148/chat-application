import mongoose from "mongoose";
import {DATABASE_URL} from "../config.js";
export const connectToDB = async ()=>{
    try{
        const response= await mongoose.connect(DATABASE_URL);
        console.log("Connected to DB...");
    }
    catch(err){
        console.log(err);
    }
}