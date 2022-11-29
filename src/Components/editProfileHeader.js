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
import { useDispatch } from "react-redux";
import { updateProfile } from "../Actions/userActions";
import { Button } from "react-native-paper";

const EditProfileHeader = ({ name, id, loading }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  function onProfileUpdate() {
    const updatedData = {
      name: name,
      id: id,
    };
    dispatch(updateProfile(updatedData));
  }
  return (
    <Surface
      style={tw.style(
        "w-full flex flex-row justify-between p-3 bg-white opacity-78 shadow-lg"
      )}
    >
      <View className="flex flex-row">
        <IconButton
          icon={(props) => (
            <Icon name="close" {...props} size={28} color="#29435eff" />
          )}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-2xl font-bold text-gray-800 my-auto mx-4">
          Edit Profile
        </Text>
      </View>
      {/* <TouchableOpacity
        style={tw.style(
          "px-4 py-1 mr-1 my-auto rounded-full border-2 border-blue-600"
        )}
        onPress={onProfileUpdate}
      >
        <Text style={tw.style(" text-base text-gray-600 m-auto")}>Save</Text>
      </TouchableOpacity> */}
      <Button
        mode="outlined"
        style={tw.style(
          "px-4 py-1 mr-1 my-auto rounded-full border-2 border-blue-600"
        )}
        color="#e09467"
        labelStyle={tw.style("text-base text-gray-600 m-auto")}
        onPress={onProfileUpdate}
        uppercase={false}
        loading={loading}
        disabled={!name.trim().length}
      >
        Save
      </Button>
    </Surface>
  );
};

export default EditProfileHeader;
