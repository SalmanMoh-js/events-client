import { View, Text, SafeAreaView } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import { TextInput } from "@react-native-material/core";
import { Button, List } from "react-native-paper";
import ChangePasswordHeader from "../Components/changePasswordHeader";

const ChangePasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ChangePasswordHeader />
      <View className="w-full bg-transparent h-full flex items-center">
        <View className="w-full mt-3 px-4">
          <TextInput
            label="Current Password"
            secureTextEntry
            variant="outlined"
            style={tw.style("mt-3")}
          />
          <TextInput
            label="New Password"
            secureTextEntry
            variant="outlined"
            style={tw.style("mt-3")}
          />
          <TextInput
            label="Confirm Password"
            secureTextEntry
            variant="outlined"
            style={tw.style("mt-3")}
          />
          <Button
            mode="contained"
            style={tw.style("w-1/2 my-3 h-12 rounded-full mx-auto")}
            labelStyle={tw.style("text-base text-white font-bold")}
            contentStyle={tw.style("h-full")}
            color="#658fdd"
            uppercase={false}
          >
            Update Password
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
