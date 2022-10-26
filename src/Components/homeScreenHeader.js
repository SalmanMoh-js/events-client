import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { IconButton, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

const HomeScreenHeader = () => {
  return (
    <Surface
      style={tw.style(
        "w-full flex flex-row justify-between p-3 bg-white opacity-78 shadow-lg"
      )}
    >
      <Text className="text-3xl font-bold text-gray-800 my-auto">Events</Text>
      <View className="flex flex-row px-2">
        <IconButton
          icon={(props) => <Icon name="bell-outline" {...props} size={26} />}
        />
        <IconButton
          icon={(props) => (
            <Ionicons name="receipt-outline" {...props} size={26} />
          )}
          style={tw.style("ml-1")}
        />
      </View>
    </Surface>
  );
};

export default HomeScreenHeader;
