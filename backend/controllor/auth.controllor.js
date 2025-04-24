import User from "../models/user.model.js";

export const signUp = async (req, res) => {
    try{
        const { username , password } = req.body;
        const user = await User.findOne({username: username});

        if(user){
            return res.status(400).send({message:"Username already taken"});
        }

        const object = await User.create({username: username, password: password});
        return res.status(201).send(
            {message:"Signup successful" ,
            id : object.id}
        );
    }
    catch(err){
        console.log(err);
        return res.status(400).send({message:"SignUp failed"});

    }
}

export const login = async (req, res) => {
    try{
        const { username , password } = req.body;
        const user = await User.findOne({username: username});

        if(!user){
            return res.status(400).send({message:"Username doesn't exist"});
        }

        return res.status(201).send(
            {message:"Login successful" ,
                id : user.id}
        );
    }
    catch(err){
        console.log(err);
        return res.status(400).send({message:"Login failed"});

    }
}