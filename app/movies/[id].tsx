import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { formatDuration, formatReleaseDate } from "@/utils/helper";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

const MovieInfo = ({ label, value, className }: MovieInfoProps) => {
  return (
    <View className={`flex-col items-start justify-center ${className}`}>
      <Text className="text-light-200 font-normal text-lg">{label}</Text>
      <Text className="text-light-200 font-bold text-lg mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const Card = ({ label }: { label: React.ReactNode }) => {
  return (
    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 my-2">
      {label}
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails({ id: id as string }));
  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white text-xl font-bold">{movie?.title}</Text>
            <View className="flex-row items-center gap-2 mt-2 mb-4">
              <Text className="text-light-200 text-lg">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <View className="w-1 h-1 bg-light-200 rounded-full" />
              <Text className="text-light-200 text-lg ">
                {formatDuration(movie?.runtime || 0)}
              </Text>
            </View>
            <Card
              label={
                <>
                  <Image source={icons.star} className="size-4" />
                  <Text className="text-light-200 text-md font-bold">
                    {Math.round(movie?.vote_average || 0)} / 10
                  </Text>
                  <Text className="text-light-200 text-md ">
                    ({movie?.vote_count} votes)
                  </Text>
                </>
              }
            />
            <MovieInfo
              label="Overview"
              value={movie?.overview}
              className="mt-5"
            />
            <View className="flex-row justify-between w-full mt-5 bg-dark-100 p-3 rounded-lg px-4">
              <MovieInfo
                label="Release Date"
                value={formatReleaseDate(movie?.release_date || "")}
              />
              <MovieInfo
                label="Country"
                value={movie?.production_countries
                  ?.map((country) => country.name)
                  .join(" • ")}
                className="items-end"
              />
            </View>
            <Text className="text-light-200 text-lg font-bold mt-5">
              Genres
            </Text>
            <View className="flex-row items-center gap-2 mt-2">
              {movie?.genres?.map((genre) => (
                <Card
                  key={genre.id}
                  label={
                    <Text className="text-light-200 text-md font-bold">
                      {genre.name}
                    </Text>
                  }
                />
              ))}
            </View>
            <View className="flex flex-row justify-between w-1/2 mt-5">
              <MovieInfo
                label="Budget"
                value={
                  movie?.budget
                    ? `$${Math.round(movie?.budget / 1_000_000)} million`
                    : "N/A"
                }
              />
              <MovieInfo
                label="Revenue"
                value={
                  movie?.revenue
                    ? `$${Math.round(movie?.revenue / 1_000_000)} million`
                    : "N/A"
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex flex-row items-center justify-center z-50 gap-2 py-3.5 bg-accent rounded-lg absolute bottom-5 left-0 mx-5 right-0"
      >
        <Text className="text-white text-lg font-bold ">Visit Home</Text>
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5"
          tintColor={"#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
