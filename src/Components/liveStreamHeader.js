import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { IconButton, Surface } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const LiveScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full flex flex-row justify-start p-3 bg-white opacity-78 shadow-lg"
      )}
    >
      <View className="flex flex-row">
        <IconButton
          icon={(props) => <Icon name="arrow-left" {...props} />}
          onPress={() => navigation.goBack()}
        />
        <Text className="mx-3 text-3xl font-bold text-gray-800 my-auto">
          Live
        </Text>
      </View>
    </Surface>
  );
};

export default LiveScreenHeader;
