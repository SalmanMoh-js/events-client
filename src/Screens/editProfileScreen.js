import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import { Avatar, Chip, Surface, TextInput } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { List } from "react-native-paper";
import EditProfileHeader from "../Components/editProfileHeader";

const EditProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <EditProfileHeader />
      <View className="w-full bg-transparent h-full flex items-center">
        <View className="w-full mt-3 px-4">
          <TextInput label="Name" variant="outlined" style={tw.style("mt-3")} />
          <TextInput
            label="Email (Non-changeable)"
            variant="outlined"
            value="salmanmoh.eth@gmail.com"
            editable={false}
            style={tw.style("mt-3")}
          />
          <TextInput
            label="Phone (Non-changeable)"
            variant="outlined"
            value="+251911915279"
            editable={false}
            style={tw.style("mt-3")}
          />
          <List.Item
            title="Change Password"
            description="Change your password at anytime"
            left={(props) => (
              <List.Icon {...props} icon="lock-closed-outline" size={24} />
            )}
            style={tw.style("py-3 mt-2")}
            onPress={() => navigation.navigate("Change Password")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
