import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Badge, Pressable } from "@react-native-material/core";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

const BannerSlider = ({ data }) => {
  return (
    <View className="rounded-xl overflow-hidden bg-gray-700">
      <ImageBackground
        source={{ uri: data.banner }}
        imageStyle={tw.style("opacity-50")}
      >
        <Pressable style={tw.style("h-44 flex flex-col justify-end p-3")}>
          <View className="w-full flex flex-row justify-between">
            <Text className="text-2xl font-bold text-white">{data.name}</Text>
            <Badge
              label={data.type}
              color="#0e98e9"
              tintColor="white"
              style={tw.style("my-auto")}
            />
          </View>
          <View className="w-full flex flex-row justify-between mt-1">
            <View className="flex flex-row my-auto">
              <View className="flex flex-row my-auto">
                <Icon name="map-marker" size={20} color="#d7e3ee" />
                <Text className="text-sm text-white ml-2">{data.venue}</Text>
                <Text className="text-sm text-white ml-2">.</Text>
                <AntDesign
                  name="calendar"
                  size={18}
                  style={tw.style("ml-2")}
                  color="#d7e3ee"
                />
                <Text className="text-sm text-white ml-2">{data.date}</Text>
                <Text className="text-sm text-white ml-2">.</Text>
              </View>
              <Text className="text-lg font-bold text-white ml-2">
                {data.price} Birr
              </Text>
            </View>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default BannerSlider;
