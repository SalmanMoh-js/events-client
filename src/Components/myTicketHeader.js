import { Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { Surface } from "@react-native-material/core";

const MyTicketHeader = () => {
  return (
    <Surface
      style={tw.style(
        "w-full flex flex-row justify-between p-3 py-4 bg-white opacity-78 shadow-lg"
      )}
    >
      <Text className="text-3xl font-bold text-gray-800 my-auto">
        My Tickets
      </Text>
    </Surface>
  );
};

export default MyTicketHeader;
