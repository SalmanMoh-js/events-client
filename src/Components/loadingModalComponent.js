import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { ActivityIndicator } from "@react-native-material/core";

const LoadingModalComponent = () => {
  return (
    <View
      style={tw.style(
        "w-1/3 m-auto rounded-lg flex justify-center items-center p-4",
        {
          backgroundColor: "#1a1a25a6",
        }
      )}
    >
      <ActivityIndicator size="large" color="white" />
      <Text className="text-center text-sm mt-3 text-white">Processing...</Text>
    </View>
  );
};

export default LoadingModalComponent;
