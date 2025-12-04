import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    // client.ping(); // ping() is not a method on Client
    console.log("Appwrite client initialized");
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
