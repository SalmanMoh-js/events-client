import { View, Text } from "react-native";
import React from "react";
import { IconButton, Surface } from "@react-native-material/core";
import tw from "twrnc";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function TicketHeader() {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full px-3 py-2 flex flex-row justify-between shadow-md"
      )}
    >
      <View className="flex flex-row justify-between w-full">
        <View className="flex flex-row">
          <IconButton
            icon={(props) => <Icon name="arrow-left" {...props} />}
            onPress={() => navigation.goBack()}
          />
          <Text className="text-2xl font-bold text-gray-500 my-auto mx-3">
            Ticket Details
          </Text>
          <Icon
            name="alert-circle-outline"
            size={24}
            style={tw.style("my-auto text-gray-500")}
          />
        </View>
      </View>
    </Surface>
  );
}
