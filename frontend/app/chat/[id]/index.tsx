import { useLocalSearchParams, router } from "expo-router";
import { View, TextInput, Pressable, FlatList, Text } from "react-native";
import React, { useState, useCallback } from "react";
import UserInterface from "~/app/components/userInterface";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Chat() {
    const { id } = useLocalSearchParams();
    const [recent, setRecent] = useState<{ username: string; id: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const directToSearch = () => {
        router.push(`/chat/${id}/search`);
    };

    const getRecentChat = async () => {
        try {
            const response = await axios.post("http://localhost:3000/user/get/recent", {
                user_id: id,
            });

            if (response.status === 200) {
                const users = response.data.map((user: any) => ({
                    username: user.username,
                    id: user._id,
                }));
                setRecent(users);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getRecentChat();

            return () => {
                setRecent([]);
            };
        }, [id]) // Re-run if `id` changes
    );

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <View className="mb-4">
                <Pressable onPress={directToSearch}>
                    <TextInput
                        className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-base"
                        placeholder="Search username..."
                        onFocus={directToSearch}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </Pressable>
            </View>

            <FlatList
                data={recent}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UserInterface item={item} user_id={id as string} />
                )}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500 mt-8">No recent users</Text>
                }
            />
        </View>
    );
}
