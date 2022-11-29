import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { IconButton, Pressable, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordHeader = () => {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full flex flex-row justify-start p-3 bg-white opacity-78 shadow-lg"
      )}
    >
      <IconButton
        icon={(props) => (
          <Icon name="arrow-left" {...props} size={28} color="#29435eff" />
        )}
        onPress={() => navigation.goBack()}
      />
      <Text className="text-2xl font-bold text-gray-800 my-auto mx-4">
        Change Password
      </Text>
    </Surface>
  );
};

export default ChangePasswordHeader;
