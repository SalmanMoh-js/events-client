import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { IconButton, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const ProfileScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full flex flex-row justify-between p-3 bg-white opacity-78 shadow-lg"
      )}
    >
      <Text className="text-3xl font-bold text-gray-800 my-auto">Profile</Text>
      <View className="flex flex-row">
        <IconButton
          icon={(props) => (
            <Feather name="edit-3" {...props} size={27} color="#29435eff" />
          )}
          onPress={() => navigation.navigate("Edit Profile")}
        />
      </View>
    </Surface>
  );
};

export default ProfileScreenHeader;
