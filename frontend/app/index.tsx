import {useEffect, useState} from "react";
import {Button, Pressable, Text, TextInput, View} from "react-native";
import axios from "axios";
import {router} from "expo-router"


export default function Auth() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignUp = async () => {

        try{
            const response = await axios.post("http://192.168.1.34:3000/api/v1/signup", {
                username,
                password,
            });
            console.log("Status: ",response.status);
            if(response.status === 201){

                // @ts-ignore
                router.push(`/chat/${response.data.id}`);

            }
            console.log(response);
        }
        catch(err){
            console.log("err");
            console.log(err);
        }
    };

    const handleLogIn = async () => {

        try{
            const response = await axios.post("http://192.168.1.34:3000/api/v1/login", {
                username,
                password,
            });
            console.log("Status: ",response.status);
            if(response.status === 201){

                // @ts-ignore
                router.push(`/chat/${response.data.id}`);

            }
            console.log(response);
        }
        catch(err){
            console.log("err");
            console.log(err);
        }

    };


    const [toggleValue , setToggleValue] = useState<string>("Sign Up")

    useEffect(() => {
        console.log(toggleValue)
    }, [toggleValue]);

    return (
        <View className="h-[100vh] w-[100vw] flex justify-center items-center bg-gray-100 ">
            <View className={"bg-gray-100 rounded-2xl p-3 h-[70vh] w-[80vw] gap-y-4 pb-3"}>
                <View className = {"flex flex-row items-center justify-center"}>
                    <Pressable
                        className="w-[40vw] py-2 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 rounded-l-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onPress={() => setToggleValue("Sign Up")}
                    >
                        <Text className="text-white text-sm font-medium">Sign Up</Text>
                    </Pressable>
                    <Pressable
                        className="w-[40vw] py-2 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800  rounded-r-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onPress={() => setToggleValue("Login")}
                    >
                        <Text className="text-white text-sm font-medium">Login</Text>
                    </Pressable>
                </View>

                <View className = {"w-full h-[40vh] bg-white shadow-2xl rounded-2xl p-3"}>
                    {
                        toggleValue === "Sign Up" ? (
                            <View className="gap-y-3">
                                <Text>Sign Up</Text>
                                <Text className="text-gray-700">Username</Text>
                                <TextInput
                                    placeholder="Enter username"
                                    className="border rounded px-3 py-2"
                                    placeholderTextColor="#aaa"
                                    onChangeText={(text)=>{
                                        setUsername(text)
                                    }}
                                />

                                <Text className="text-gray-700">Password</Text>
                                <TextInput
                                    placeholder="Enter password"
                                    secureTextEntry
                                    className="border rounded px-3 py-2"
                                    placeholderTextColor="#aaa"
                                    onChangeText={(text)=>{
                                        setPassword(text)
                                    }}
                                />

                                <Pressable
                                    className="bg-blue-600 px-5 py-2.5 rounded-lg items-center"
                                    onPress={handleSignUp}
                                >
                                    <Text className="text-white font-medium">Sign Up</Text>
                                </Pressable>
                            </View>
                        ) : (
                            <View className="gap-y-3">
                                <Text>Login </Text>
                                <Text className="text-gray-700">Username</Text>
                                <TextInput
                                    placeholder="Enter username"
                                    className="border rounded px-3 py-2"
                                    placeholderTextColor="#aaa"
                                    onChangeText={(text)=>{
                                        setUsername(text);
                                    }}
                                />

                                <Text className="text-gray-700">Password</Text>
                                <TextInput
                                    placeholder="Enter password"
                                    secureTextEntry
                                    className="border rounded px-3 py-2"
                                    placeholderTextColor="#aaa"
                                    onChangeText={(text)=>{
                                        setPassword(text)
                                    }}
                                />
                                <Pressable
                                    className="bg-blue-600 px-5 py-2.5 rounded-lg items-center"
                                    onPress={handleLogIn}
                                >
                                    <Text className="text-white font-medium">Login</Text>
                                </Pressable>
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    );
}
