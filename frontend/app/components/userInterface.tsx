import {Pressable, Text, View} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";
import {router, useRouter} from "expo-router";

export default function UserInterface(
    {
        item , user_id
    }: {
        item : {
            username : string ,
            id : string,
        },
        user_id : string
    }
){

    const router = useRouter();
    const [check , setCheck] = useState<boolean>(false);
    useEffect(() => {
        if (item.id === user_id) {
            setCheck(true);
        }
    }, [item.id, user_id]);

    const handleUser = async ()=> {
        try{
            const response = await axios.post("http://192.168.1.34:3000/user/add/recent" , {
                start_id :user_id,
                recent_id : item.id
            })
            console.log(response);

            router.push(`/chat/${user_id}/${item.id}`);


        }
        catch(error){
            console.log("from userINterface")
            console.log(error)
        }
    }

    return (
    <View>
        {!check ? (
            <Pressable onPress={handleUser}>
                <View className="mt-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <Text className="text-base text-gray-800">{item.username}</Text>
                </View>
            </Pressable>
        ) : null
        }
    </View>
    );
}