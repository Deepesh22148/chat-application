import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ChatDialog() {
    const { id, id2 } = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiverName, setReceiverName] = useState("Loading...");
    const flatListRef = useRef(null);

    const fetchData = async () => {
        try {
            const response = await axios.post("http://192.168.1.34:3000/chat/get", {
                sender_id: id,
                receiver_id: id2,
            });
            setMessages(response.data.data);
        } catch (e) {
            console.error("Fetch error:", e);
        }
    };

    const getReceiverName = async () => {
        try {
            const res = await axios.post("http://192.168.1.34:3000/user/search/name", { id: id2 });
            setReceiverName(res.data.username || "Unknown");
        } catch (e) {
            console.error("Name fetch error:", e);
            setReceiverName("Unknown");
        }
    };

    const sendData = async () => {
        if (!message.trim()) return;
        try {
            await axios.post("http://192.168.1.34:3000/chat/post", {
                sender_id: id,
                receiver_id: id2,
                message: message,
            });
            setMessage("");
            fetchData();
        } catch (e) {
            console.error("Send error:", e);
        }
    };

    const renderItem = ({ item }) => {
        const isSender = item.sender === id;
        return (
            <View
                className={`px-4 py-2 my-1 max-w-[80%] rounded-2xl ${
                    isSender ? "bg-blue-500 self-end" : "bg-gray-300 self-start"
                }`}
            >
                <Text className={`text-sm ${isSender ? "text-white" : "text-black"}`}>
                    {item.message}
                </Text>
                <Text className={`text-[10px] mt-1 ${isSender ? "text-blue-100" : "text-gray-600"}`}>
                    {new Date(item.createdAt).toLocaleTimeString()}
                </Text>
            </View>
        );
    };

    const redirectToMain = () => {
        router.push(`/chat/${id}`)
    }

    useEffect(() => {
        fetchData();
        getReceiverName();

        const interval = setInterval(() => {
            fetchData();
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);

    }, []);


    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    {/* Top Bar */}
                    <View className="flex-row items-center px-4 py-3 border-b border-gray-200 bg-white">
                        <Pressable onPress={redirectToMain}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </Pressable>
                        <Text className="ml-4 text-lg font-semibold">{receiverName}</Text>
                    </View>

                    <View className="flex-1 justify-between">
                        <FlatList
                            data={messages}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            ref={flatListRef}
                            contentContainerStyle={{ padding: 10, paddingBottom: 60 }}
                            showsVerticalScrollIndicator={false}
                            onContentSizeChange={() =>
                                flatListRef.current?.scrollToEnd({ animated: true })
                            }
                        />

                        {/* Message Input */}
                        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex-row items-center">
                            <TextInput
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Type a message..."
                                multiline={true}
                                className="flex-1 bg-gray-100 p-3 rounded-full text-sm"
                            />
                            <Pressable
                                onPress={sendData}
                                className="ml-2 bg-blue-500 px-4 py-2 rounded-full"
                            >
                                <Text className="text-white font-semibold">Send</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
