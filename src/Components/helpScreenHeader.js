import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { IconButton, Surface } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const HelpScreenHeader = () => {
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
        Help & Support
      </Text>
    </Surface>
  );
};

export default HelpScreenHeader;
