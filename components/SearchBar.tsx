import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = ({
  onPress,
  placeholder,
}: {
  onPress?: () => void;
  placeholder: string;
}) => {
  return (
    <View className="flex-row items-center justify-between bg-dark-200 rounded-full px-5 py-2">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        className="flex-1 ml-2 text-white"
        value=""
        onChangeText={() => {}}
      />
    </View>
  );
};

export default SearchBar;
