import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMovie = async (movie: SavedMovie) => {
  try {
    const movies = await AsyncStorage.getItem("movies");
    if (movies) {
      const parsedMovies = JSON.parse(movies);
      const updatedMovies = [...parsedMovies, movie];
      await AsyncStorage.setItem("movies", JSON.stringify(updatedMovies));
    } else {
      await AsyncStorage.setItem("movies", JSON.stringify([movie]));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMovies = async (): Promise<SavedMovie[] | undefined> => {
  try {
    const movies = await AsyncStorage.getItem("movies");
    if (movies) {
      return JSON.parse(movies);
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeMovie = async (id: number) => {
  try {
    const movies = await AsyncStorage.getItem("movies");
    if (movies) {
      const parsedMovies = JSON.parse(movies);
      const updatedMovies = parsedMovies.filter((movie: SavedMovie) => movie.id !== id);
      await AsyncStorage.setItem("movies", JSON.stringify(updatedMovies));
    }
  } catch (error) {
    console.error(error);
  }
};
