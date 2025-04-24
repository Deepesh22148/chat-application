import User from "../models/user.model.js";
import recent from "../models/recent.model.js";

export const search = async (req , res)=>{
    try{
        const {username} = req.body;

        const query = await User.find({username : {
                $regex: "^" + username, $options: "i"
            }
        }).select("username _id");

        return res.status(201).send(query)

    }
    catch(err){
        console.log(err);
        return res.status(400).send("No such user");
    }
}

export const recentUser = async (req , res)=>{
    console.log("Hello")
    try{
        const {start_id, recent_id} = req.body;
        console.log(start_id,recent_id);
        const user = await recent.findOne({
            startingUser : start_id,
            recentUser : recent_id
        })
        if(!user){
            await recent.create({
                startingUser : start_id,
                recentUser : recent_id
            })
            return res.status(201).send(
                {message : "recent has been updated successfully."}
            )
        }

        return res.status(201).send(
            {message : "recent has been updated successfully."}
        )

    }
    catch (e) {
        console.log(e);
        return res.status(500).send("DB Connection Error");
    }
}


export const getRecentUser = async (req , res)=>{
    try{
        const {user_id} = req.body;
        const users = await recent.find({
            startingUser : user_id
        })

        const usernames = await Promise.all(
            users.map(async (user) => {
                const foundUser = await User.findById(user.recentUser).select("username _id");
                return foundUser;
            })
        );

        res.status(200).send(usernames);

    }
    catch(err){
        console.log(err);
    }
}

export const getName = async (req , res)=>{
    try{
        const {id} = req.body;
        const user = await User.findById(id).select("username");
        return res.status(200).send({
            username : user.username,
        })
    }
    catch(err){
        console.log(err);
    }
}