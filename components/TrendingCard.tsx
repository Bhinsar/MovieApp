import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie,
  index,
}: {
  movie: TrendingMovie;
  index: number;
}) => {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: movie.poster_url,
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-6 -left-3.5 px-2 py-1 rounded-full ">
          <MaskedView
            maskElement={
              <Text className="text-white mt-2 text-8xl font-bold">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="h-20"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="text-white mt-2 text-sm font-bold" numberOfLines={1}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
