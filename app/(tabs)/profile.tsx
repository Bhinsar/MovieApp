import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { getMovies } from "@/services/storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const [movies, setMovies] = useState<SavedMovie[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchMovies = async () => {
        const result = await getMovies();
        setMovies(result ?? []);
      };
      fetchMovies();
    }, [])
  );

  return (
    <View className="flex-1 bg-primary pb-20">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 mt-5">
        <Text className="text-white text-2xl font-bold">Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* User Info */}
        <View className="flex items-center mt-5">
          <View className="size-24 rounded-full border-2 border-accent justify-center items-center overflow-hidden">
            <Image source={icons.person} className="size-" tintColor="#ccc" />
          </View>
          <Text className="text-white text-xl font-bold mt-3">John Doe</Text>
          <Text className="text-light-200 text-sm">@johndoe</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mt-8 px-10">
          <View className="items-center">
            <Text className="text-white text-lg font-bold">
              {movies.length}
            </Text>
            <Text className="text-light-200 text-xs">Watched</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">3.5k</Text>
            <Text className="text-light-200 text-xs">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">150</Text>
            <Text className="text-light-200 text-xs">Following</Text>
          </View>
        </View>

        {/* Favorite Movies */}
        <View className="mt-10 px-5">
          <Text className="text-white text-lg font-bold mb-4">
            Favorite Movies
          </Text>
          <FlatList
            horizontal
            data={movies}
            renderItem={({ item }) => (
              <View className="mr-4 w-32">
                <MovieCard {...item} className="w-full" />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <Text className="text-white text-center">
                No favorite movies yet
              </Text>
            }
          />
        </View>

        {/* Menu Options */}
        <View className="mt-10 px-5">
          <Text className="text-white text-lg font-bold mb-4">Settings</Text>
          <View className="bg-dark-100 rounded-2xl p-4">
            {[
              { label: "Edit Profile", icon: icons.person },
              { label: "Notifications", icon: icons.star }, // Using star as placeholder for notification
              { label: "Privacy", icon: icons.save }, // Using save as placeholder
              { label: "Logout", icon: icons.arrow },
            ].map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center py-3 ${
                  index !== 3 ? "border-b border-gray-800" : ""
                }`}
              >
                <Image
                  source={option.icon}
                  className="size-5 mr-4"
                  tintColor="white"
                />
                <Text className="text-white text-base flex-1">
                  {option.label}
                </Text>
                <Image
                  source={icons.arrow}
                  className="size-4 -rotate-90"
                  tintColor="gray"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
