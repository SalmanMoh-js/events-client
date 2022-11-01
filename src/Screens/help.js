import { View, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import { Avatar, Chip, Surface } from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { List } from "react-native-paper";
import HelpScreenHeader from "../Components/helpScreenHeader";

const HelpScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <HelpScreenHeader />
      <View className="w-full bg-transparent h-full flex items-center">
        <View className="w-full mt-3 px-4">
          <List.Item
            title="Address"
            description="Addis Ababa, Ethiopia"
            left={(props) => (
              <List.Icon {...props} icon="location-outline" size={24} />
            )}
            style={tw.style("py-3 shadow-md")}
          />
          <List.Item
            title="Call"
            description="8888"
            left={(props) => (
              <List.Icon {...props} icon="call-outline" size={24} />
            )}
            style={tw.style("py-3")}
          />
          <List.Item
            title="Email"
            description="support@event.com"
            left={(props) => (
              <List.Icon {...props} icon="mail-outline" size={24} />
            )}
            style={tw.style("py-3")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HelpScreen;
