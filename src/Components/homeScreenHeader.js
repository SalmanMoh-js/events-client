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

const HomeScreenHeader = () => {
  const [showPopover, setShowPopover] = useState(false);
  const navigation = useNavigation();
  return (
    <Surface
      style={tw.style(
        "w-full flex flex-row justify-between p-3 bg-white opacity-78 shadow-lg"
      )}
    >
      <Text className="text-3xl font-bold text-gray-800 my-auto">Events</Text>
      <View className="flex flex-row px-2">
        <IconButton
          icon={(props) => (
            <Ionicons name="search-outline" {...props} size={26} />
          )}
          onPress={() => navigation.navigate("Search")}
        />
        <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={
            <TouchableOpacity
              onPress={() => setShowPopover(true)}
              style={tw.style("ml-1")}
            >
              <IconButton
                icon={(props) => (
                  <Icon name="tune-variant" {...props} size={26} />
                )}
                disabled
              />
            </TouchableOpacity>
          }
          backgroundStyle={{ opacity: 0.1 }}
          popoverStyle={tw.style("bg-white shadow-lg p-3")}
        >
          <Button
            title="Exhibition"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "exhibition",
              })
            }
            style={tw.style("text-left")}
          />
          <Button
            title="Religious"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "religious",
              })
            }
            style={tw.style("text-left")}
          />
          <Button
            title="Sport"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "sport",
              })
            }
            style={tw.style("text-left")}
          />
          <Button
            title="Party"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "party",
              })
            }
            style={tw.style("text-left")}
          />
          <Button
            title="Concert"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "concert",
              })
            }
            style={tw.style("text-left")}
          />
          <Button
            title="Auction"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "auction",
              })
            }
            style={tw.style("text-left")}
          />
          <Button
            title="Cinema"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "cinema",
              })
            }
            style={tw.style("text-left")}
          />
          <Button
            title="Comedy"
            variant="text"
            color="#434040"
            onPress={() =>
              navigation.navigate("Catagory Event", {
                type: "comedy",
              })
            }
            style={tw.style("text-left")}
          />
        </Popover>
      </View>
    </Surface>
  );
};

export default HomeScreenHeader;
