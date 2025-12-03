import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, TouchableOpacity } from "react-native";

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
}: {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className="flex-row items-center justify-between bg-dark-200 rounded-full px-5 py-2"
    >
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        className="flex-1 ml-2 text-white"
        value={value}
        onChangeText={onChangeText}
        editable={!onPress}
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
