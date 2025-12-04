import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFetch";
import { getMovies, removeMovie, saveMovie } from "@/services/storage";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = (props: SavedMovie) => {
  const [isSaved, setIsSaved] = React.useState(false);

  const { id, title, poster_path, release_date, vote_average } = props;
  const { data: movies } = useFetch(() => getMovies());

  useEffect(() => {
    movies?.some((movie: SavedMovie) => movie.id === id)
      ? setIsSaved(true)
      : setIsSaved(false);
  }, [movies]);

  const handleSave = async () => {
    if (!isSaved) {
      await saveMovie(props);
    } else {
      await removeMovie(id);
    }
    setIsSaved(!isSaved);
  };

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={handleSave}
          className="absolute top-2 right-2"
        >
          {isSaved ? (
            <Image source={icons.saved} className="w-5 h-6" />
          ) : (
            <Image source={icons.save} className="size-5" />
          )}
        </TouchableOpacity>
        <Text className="text-white mt-2 text-sm font-bold" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-light-200 text-xs font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default React.memo(MovieCard);
