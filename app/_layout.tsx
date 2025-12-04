import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-url-polyfill/auto";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    // client.ping(); // ping() is not a method on Client
    console.log("Appwrite client initialized");
  }, []);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
