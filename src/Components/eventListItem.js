import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image } from "react-native";
import tw from "twrnc";
import {
  Surface,
  Button,
  Badge,
  Pressable,
  Avatar,
  Divider,
} from "@react-native-material/core";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { FAB, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const EventListItem = ({ event }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Pressable
      style={tw.style(
        "w-full rounded-2xl flex flex-col justify-between my-1 mt-2 bg-white shadow-md overflow-hidden"
      )}
      onPress={() =>
        navigation.navigate("Event", {
          event: event,
        })
      }
    >
      <View className="flex flex-row justify-between w-full">
        <View>
          <Image
            source={{
              uri: event.banner
                ? event.banner
                : "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg",
            }}
            className="w-32 h-32"
          />
        </View>
        <View className="w-2/3 p-3">
          <View className="w-full flex flex-row justify-between">
            <Text className="text-2xl font-bold text-slate-600 mb-2">
              {event.name}
            </Text>
            <Badge
              label={event.type}
              labelStyle={tw.style("text-white")}
              tintColor="#33cccc"
              style={tw.style("my-auto")}
            />
          </View>
          <View className="w-full flex flex-row justify-between">
            <View>
              <View className="flex flex-row my-1">
                <Icon name="map-marker" size={20} color="#4577a9" />
                <Text className="text-sm opacity-70 ml-1">{event.venue}</Text>
              </View>
              <View className="flex flex-row my-1">
                <AntDesign name="calendar" size={20} color="#4577a9" />
                <Text className="text-sm opacity-70 ml-1">{event.date}</Text>
              </View>
            </View>
            <Text className="text-xl font-bold text-slate-600 my-auto">
              {event.price} Br.
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default EventListItem;
