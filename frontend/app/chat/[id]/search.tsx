import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import UserInterface from "~/app/components/userInterface";
import {useLocalSearchParams} from "expo-router";

export default function Search() {
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const {id} = useLocalSearchParams();

    useEffect(() => {
        if (query.trim() === "") {
            setFilteredData([]);
            return;
        }

        setLoading(true);
        const timeout = setTimeout(async () => {
            const response = await axios.post("http://192.168.1.34:3000/user/search" , {username: query})
            if(response.status === 201){
                const users = response.data.map(user => ({
                    username: user.username,
                    id: user._id
                }))

                setFilteredData(users);
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <View className="flex-1 bg-gray-100 p-4 pt-16">
            <Text className="text-2xl font-bold mb-4">Search your friends</Text>

            <TextInput
                className="bg-white p-3 rounded-xl border border-gray-300 text-base"
                placeholder="Search something..."
                value={query}
                onChangeText={setQuery}
            />

            {loading ? (
                <ActivityIndicator className="mt-6" size="large" color="#007AFF" />
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <UserInterface item={item} user_id={id} />
                    )}
                />

            )}
        </View>
    );
}
