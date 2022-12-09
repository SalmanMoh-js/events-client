import { View, SafeAreaView } from "react-native";
import React from "react";
import tw from "twrnc";
import { List } from "react-native-paper";
import HelpScreenHeader from "../Components/helpScreenHeader";

const HelpScreen = () => {
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
