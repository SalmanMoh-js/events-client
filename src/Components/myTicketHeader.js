import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { IconButton, Surface, Button } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Popover, { PopoverPlacement, Rect } from "react-native-popover-view";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const MyTicketHeader = () => {
  const [showPopover, setShowPopover] = useState(false);
  const navigation = useNavigation();
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
