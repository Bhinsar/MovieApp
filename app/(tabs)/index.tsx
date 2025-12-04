import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appWrite";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => getTrendingMovies());

  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchMoviesData = async (pageNum: number) => {
    setMoviesLoading(true);
    setMoviesError(null);
    try {
      const newMovies = await fetchMovies({ query: "", page: pageNum });
      if (pageNum === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      }
    } catch (error) {
      setMoviesError("Failed to fetch movies");
    } finally {
      setMoviesLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesData(1);
  }, []);

  const loadMoreMovies = () => {
    if (!moviesLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMoviesData(nextPage);
    }
  };

  const renderHeader = () => (
    <View>
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      {trendingMoviesError ? (
        <Text className="text-white text-center mt-10">
          Error loading trending movies
        </Text>
      ) : (
        <>
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search movies, series, etc."
          />
          {trendingMovies && (
            <View className="mt-10">
              <Text className="text-lg font-bold text-white mb-3">
                Trending Movies
              </Text>
              <FlatList
                className="mt-3 mb-4"
                data={trendingMovies}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => item.movie_id.toString()}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                contentContainerStyle={{ gap: 30 }}
              />
            </View>
          )}
          <Text className="text-lg font-bold text-white mt-5 mb-3">
            Latest Movies
          </Text>
        </>
      )}
    </View>
  );

  const renderFooter = () => {
    if (!moviesLoading) return null;
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="mt-10 self-center mb-20"
      />
    );
  };

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard {...item} />,
    []
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
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
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
