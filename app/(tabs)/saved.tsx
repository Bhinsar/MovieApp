import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/services/storage";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

const Saved = () => {
  const [movies, setMovies] = useState<SavedMovie[]>([]);

  useFocusEffect(() => {
    const fetchMovies = async () => {
      const result = await getMovies();
      setMovies(result ?? []);
    };
    fetchMovies();
  });

  const renderMovieItem = ({ item }: { item: SavedMovie }) => (
    <MovieCard {...item} />
  );

  return (
    <View className="flex-1 bg-primary pt-2 px-5">
      <Text className="text-2xl font-bold text-white mt-5 mb-3">
        Saved Movies
      </Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
          minHeight: "100%",
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <Text className="text-white text-center mt-5">No saved movies</Text>
        }
      />
    </View>
  );
};

export default Saved;
